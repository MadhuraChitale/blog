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
import TranslationComponent from "../pages/translationcomponent";
import { Select, MenuItem, Button } from "@mui/material";

function BlogComponent() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [blogData, setBlogData] = useState({});

  const [translate, setTranslate] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("es"); // Set the default target language code

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

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

  // return (
  // <div>
  //   {/* Display the fetched data */}
  //   <h1>{blogData.image}</h1>
  //   <h1>
  //     <TranslationComponent text={blogData.title} />
  //   </h1>
  //   <h1>
  //     <TranslationComponent text={blogData.description} />
  //   </h1>
  //   <p>
  //     <TranslationComponent text={blogData.content} />
  //   </p>
  //   <h2>fix frontend display</h2>
  //   {/* <h2>
  //     <Button>Translate</Button>
  //   </h2> */}
  //   <TranslationComponent />
  // </div>

  return (
    <div>
      <div>
        {translate ? (
          <div>
            <TranslationComponent
              text={blogData.image}
              targetLanguage={targetLanguage}
            />
            <TranslationComponent
              text={blogData.title}
              targetLanguage={targetLanguage}
            />
            <TranslationComponent
              text={blogData.description}
              targetLanguage={targetLanguage}
            />
            <TranslationComponent
              text={blogData.content}
              targetLanguage={targetLanguage}
            />
          </div>
        ) : (
          <div>
            <h1>{blogData.image}</h1>
            <h1>{blogData.title}</h1>
            <h1>{blogData.description}</h1>
            <p>{blogData.content}</p>
          </div>
        )}
      </div>
      <Select value={targetLanguage} onChange={handleLanguageChange}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Spanish</MenuItem>
        <MenuItem value="fr">French</MenuItem>
        <MenuItem value="de">German</MenuItem>
        <MenuItem value="it">Italian</MenuItem>
        <MenuItem value="pt">Portuguese</MenuItem>
        <MenuItem value="ru">Russian</MenuItem>
        <MenuItem value="ja">Japanese</MenuItem>
        <MenuItem value="zh">Chinese</MenuItem>
        <MenuItem value="ar">Arabic</MenuItem>
        <MenuItem value="hi">Hindi</MenuItem>
        <MenuItem value="bn">Bengali</MenuItem>
        <MenuItem value="ta">Tamil</MenuItem>
        <MenuItem value="te">Telugu</MenuItem>
        <MenuItem value="mr">Marathi</MenuItem>
        <MenuItem value="gu">Gujarati</MenuItem>
        {/* Add more languages as needed */}
      </Select>
      <Button onClick={() => setTranslate(!translate)}>
        {translate ? "Show Original" : "Translate"}
      </Button>
    </div>
  );
}

export default BlogComponent;