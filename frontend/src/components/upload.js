// contains upload form component
// import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import "./upload.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { Button as BaseButton } from "@mui/base/Button";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

export default function UploadForm() {
  // post to /api/uploadblog on submit
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside handle submit");

    const userObject = JSON.parse(sessionStorage.getItem("user"));

    // Generate a unique ID
    const uniqueID = uuidv4();

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("id", uniqueID);
    formData.append("title", title);
    formData.append("keywords", keywords);
    formData.append("image", image);
    formData.append("content", content);
    formData.append("userObject", JSON.stringify(userObject));

    // Send the data to the backend
    try {
      const response = await axios.post(
        "http://localhost:5000/api/uploadblog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", //'multipart/form-data'
          },
        }
      );

      // Handle the response, e.g., show a success message
      console.log("Blog uploaded successfully:", response.data);

      navigate(`/landing`);
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error("Error uploading blog:", error);
    }
  };
  const [imageUploaded, setImageUploaded] = useState(false);
  const handleFileChange = (e) => {
    // Handle file input change and store the selected file
    setImage(e.target.files[0]);

    const selectedFile = e.target.files[0];
    setImageUploaded(true);
  };

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
    1000: "#000000",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 50px;
    height: 10px
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 1px 1px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${grey[1000]};
    }

    &:focus {
      box-shadow: 0 0 0 1px ${
        theme.palette.mode === "dark" ? blue[600] : blue[600]
      };
    }

    `
  );

  const textareaStyle = {
    width: "48vw", // Adjust the width as needed
    height: "55vh",
  };

  const Button = styled(BaseButton)(
    ({ theme }) => `
    // font-family: IBM Plex Sans, sans-serif;
    // font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 1px ${
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.5)"
        : "rgba(45, 45, 60, 0.2)"
    }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &:active {
      background-color: ${blue[700]};
      box-shadow: none;
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
    display: flex;
    justify-content: center;
    align-items: center;

    `
  );

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const inputStyle = {
    display: "none",
  };

  const labelStyle = {
    // display: "flex",
    // alignItems: "center",
    cursor: "pointer",
  };
  const iconStyle = {
    marginRight: "8px", // Adjust spacing as needed
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          {/* <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Keywords:</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Upload Blog</button> */}
          <div className="centered-container">
            {/* <h3>Create Blog</h3> */}
            <div className="small-div">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "60ch" },
                  mt: 1, // Add margin-top
                  mb: 2, // Add margin-bottom
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  margin="dense"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: "29vw" }}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "60ch" },
                  mt: 2, // Add margin-top
                  mb: 2, // Add margin-bottom
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Keywords"
                  variant="outlined"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  style={{ width: "29vw" }}
                />
              </Box>
              <input
                accept="image/*"
                style={inputStyle}
                id="image-input"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="image-input" style={labelStyle}>
                <Button variant="contained" color="primary" component="span">
                  <span style={iconStyle}>+</span> Upload Image
                </Button>
              </label>
              {imageUploaded && <p>Image has been uploaded</p>}
            </div>
            <div className="small-div">
              <Textarea
                aria-label="minimum height"
                // minRows={19}
                placeholder="Content"
                style={textareaStyle}
                className="custom-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button className="btn" type="submit" onSubmit={handleSubmit}>
                Add blog
              </Button>
            </div>

            {/* <h1>Display upload form, add onclick--form submit</h1>
      <p>Title, abstact, image, content</p> */}
          </div>
        </div>
      </div>
    </form>
  );
}
