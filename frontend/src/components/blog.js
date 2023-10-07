// displays blog data title, abstract, content and TRANSLATE

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, dividerClasses } from "@mui/material";
import Stack from "@mui/material/Stack"; // Import Stack from Material-UI
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import createTheme and ThemeProvider

export default function Blog() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    // Fetch data from the backend using the 'id' parameter

    console.log(id);
    axios
      .get(`http://localhost:5000/api/blogs/${id}`) // Adjust the URL as needed
      .then((response) => {
        console.log(
          "Logging response:",
          JSON.stringify(response.data, null, 2)
        );

        // Handle the response from the backend
        setBlogData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, [id]);

  //   now display the fetched data here.

  return (
    <div>
      {/* Display the fetched data */}
      <h1>{blogData.image}</h1>
      <h1>{blogData.title}</h1>
      <h1>{blogData.description}</h1>
      <p>{blogData.content}</p>
      <h2>fix frontend display</h2>
      <h2>
        add a button onclick--translate and implement google translate api
      </h2>
    </div>
  );
}
