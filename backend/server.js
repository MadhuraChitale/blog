// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Create an instance of Express
const app = express();
// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// Sample GET route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/blogs/:id", (req, res) => {
  const id = parseInt(req.params.id); // Parse the 'id' parameter as an integer

  // Read the 'blogs.json' file
  const filePath = path.join(__dirname, "blog.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Unable to read data" });
    }

    try {
      const blogs = JSON.parse(data); // Parse the JSON data

      // Find the blog with the matching ID
      const blog = blogs.find((blog) => blog.id === id);

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

app.get("/api/blogs", (req, res) => {
  const filePath = path.join(__dirname, "blog.json"); // Assuming "blogs.json" is in the same directory as this script
  res.sendFile(filePath);
});

app.post("/api/uploadblog", (req, res) => {
  // add data submitted from the blog form to the database
});

// Set the port for the server to listen on
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
