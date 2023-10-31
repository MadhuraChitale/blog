// Import required modules
const express = require("express");
const crypto = require("crypto");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { Pool } = require("pg");
const { SlowBuffer } = require("buffer");
const dotenv = require("dotenv");
dotenv.config();

let globalUserObject;

const storage = new Storage({
  projectId: process.env.PROJECT_ID, //remove
  keyFilename: process.env.KEY_FILE_NAME, //remove
});

const bucket_name = process.env.BUCKET_NAME;
const bucket = storage.bucket("blog-posts-images");
const upload = multer({
  storage: multer.memoryStorage(),
});

const pool = new Pool({
  user: process.env.USER, //remove
  host: process.env.HOST, //remove
  database: process.env.DATABASE, // Your database name
  password: process.env.PASSWORD,
  port: process.env.PORT, // Your database port
});

// Create an instance of Express
const app = express();
// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const secret_key = crypto.randomBytes(64).toString("hex");
app.use(
  session({
    secret: secret_key,
    resave: false,
    saveUninitialized: true,
  })
);

// Sample GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/logout", (req, res) => {
  // Respond with a success message or any other response
  delete req.session.userObject;
  globalUserObject = null;
  res.status(200).send("Logged out successfully");
});

const filePath = path.join(__dirname, "blog.json");

app.post("/api/userdata", async (req, res) => {
  const userObject = req.body.userObject;
  console.log(userObject.email);
  // store user data
  req.session.userObject = userObject;
  globalUserObject = userObject;
  console.log(req.session.userObject);

  console.log("UserObject saved in session:", req.session.userObject);
  // add user data to the database
  try {
    const existingUser = await pool.query(
      "SELECT email FROM blog_data WHERE email = $1",
      [userObject.email]
    );

    console.log(existingUser);

    if (existingUser.rows.length === 0) {
      await pool.query("INSERT INTO blog_data (email) VALUES ($1)", [
        userObject.email,
      ]);
      res.status(200).send("UserObject received and added to the database");
    } else {
      // fetch and add to json file
      res
        .status(200)
        .send("UserObject received. Email already exists in the database.");
    }
  } catch (error) {
    console.error("Error handling user data:", error);
    res.status(500).send("Internal server error");
  }

  //  fetch and add to json
  try {
    console.log("adding new user data to blogs.json");
    pool
      .query("SELECT blogs FROM blog_data WHERE email = $1", [userObject.email])
      .then((result) => {
        const blogs = result.rows[0].blogs;
        console.log(blogs);

        // Replace the content of the JSON file with the fetched blogs
        fs.writeFile("blog.json", JSON.stringify(blogs, null, 2), (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log("Blogs replaced in blog.json");
        });
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  } catch (error) {
    console.error("Error:", error);
  }
});

app.post("/api/uploadblog", upload.single("image"), async (req, res) => {
  const userObject = JSON.parse(req.body.userObject);
  const id = req.body.id;
  const title = req.body.title;
  const keywords = req.body.keywords;
  const content = req.body.content;
  const imageBuffer = req.file.buffer; // Uploaded image file
  const contentType = req.file.mimetype;

  if (!imageBuffer) {
    return res.status(400).send("Image file is missing or invalid.");
  }

  // Use the unique ID from the client as the object name in Google Cloud Storage
  const objectName = id; // You can adjust this as needed

  // Upload the image to Cloud bucket
  try {
    await bucket.file(objectName).save(imageBuffer, {
      contentType,
    });

    console.log("Image uploaded to Google Cloud Storage:", res.name);
  } catch (error) {
    console.error("Error uploading image to Google Cloud Storage:", error);
    return res.status(500).send("Failed to upload image.");
  }

  // Handle the blog data and image as needed
  // You can save the image reference (e.g., the URL) in your database along with other data.

  const imageUrl = `https://storage.cloud.google.com/blog-posts-images/${id}`;

  const blogData = {
    id,
    title,
    keywords,
    content,
    imageUrl,
  };

  // add to database
  try {
    const updateQuery = {
      text: `UPDATE blog_data SET blogs = array_append(blogs, $1::jsonb) WHERE email = $2`,
      values: [blogData, userObject.email],
    };

    try {
      const result = await pool.query(updateQuery);
      console.log(result.rowCount);
    } catch (error) {
      console.error("Error updating database:", error);
    }
  } catch (error) {
    console.error("Error appending blog:", error);
    res.status(500).send("Failed to append blog");
  }

  // append to blog.json
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read data" });
    }

    try {
      const blogs = JSON.parse(data); // Parse the JSON data

      // Append the new blogData to the array
      blogs.push(blogData);

      // Write the updated JSON array back to the file
      fs.writeFile(filePath, JSON.stringify(blogs, null, 2), "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Unable to write data" });
        }

        // Respond with a success message or any other response
        res.status(200).send("Blog appended successfully");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error parsing JSON data" });
    }
  });
});

app.get("/api/blogs", (req, res) => {
  const filePath = path.join(__dirname, "blog.json"); // Assuming "blogs.json" is in the same directory as this script
  res.sendFile(filePath);
});

app.get("/api/blogs/:id", (req, res) => {
  // const id = parseInt(req.params.id); // Parse the 'id' parameter as an integer
  const id = req.params.id;

  // Read the 'blogs.json' file

  fs.readFile(filePath, "utf8", (err, data) => {
    console.log("reading file");
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read data" });
    }

    try {
      const blogs = JSON.parse(data); // Parse the JSON data

      // Find the blog with the matching ID
      const blog = blogs.find((blog) => blog.id === id);
      // update the content for that blog
      // ....here   OR, just append new content to the object, without changing the json file.

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Send the found blog as a JSON response
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error parsing JSON data" });
    }
  });
});

// Set the port for the server to listen on
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
