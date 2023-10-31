// displays blog data title, abstract, content and TRANSLATE

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Select, MenuItem, Button } from "@mui/material";

// import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { translateText } from "./translationService";

export default function Blog() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [blogData, setBlogData] = useState({});

  // State to store translated content
  const [isTranslated, setIsTranslated] = useState(false); // State to track whether content is translated
  const [targetLanguage, setTargetLanguage] = useState("es");

  const [translatedTitle, setTranslatedTitle] = useState("");
  const [translatedKeywords, setTranslatedKeywords] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
  }, [id]);

  // Function to translate content
  const translateBlog = async () => {
    try {
      const titleTranslation = await translateText(
        blogData.title,
        targetLanguage
      );
      setTranslatedTitle(titleTranslation);

      const keywordsTranslation = await translateText(
        blogData.keywords,
        targetLanguage
      );
      setTranslatedKeywords(keywordsTranslation);

      const contentTranslation = await translateText(
        blogData.content,
        targetLanguage
      );
      setTranslatedContent(contentTranslation);

      setIsTranslated(true);
    } catch (error) {
      console.error("Translation error:", error);
      setIsTranslated(false);
    }
  };

  const toggleTranslation = () => {
    // Toggle between the original and translated content
    setIsTranslated(!isTranslated);
  };

  //   now display the fetched data here.
  const paperStyle = {
    padding: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    marginTop: "10px",
  };

  const titleStyle = {
    fontSize: "2rem", // Change the font size for the title
    fontFamily: "Poppins, sans-serif",
  };

  const keywordsStyle = {
    fontStyle: "italic",
    color: "#666",
    marginTop: "10px",
    fontSize: "1.2rem", // Increase the font size for keywords
  };

  const contentStyle = {
    marginTop: "10px",
    textAlign: "justify", // Justify the content
    paddingLeft: "10%", // Add space to the left side
    paddingRight: "10%", // Add space to the right side
  };

  return (
    <div>
      {/* Display the fetched data */}
      {/* <h2>{blogData.title}</h2>
      <h1>{blogData.imageUrl}</h1>
      <h1>{blogData.keywords}</h1>
      <p>{blogData.content}</p> */}
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" style={titleStyle}>
          {isTranslated ? translatedTitle : blogData.title}
        </Typography>
        <img src={blogData.imageUrl} alt="Blog" style={imageStyle} />
        <Typography variant="body2" style={keywordsStyle}>
          {isTranslated ? translatedKeywords : blogData.keywords}
        </Typography>
        <Typography variant="body2">
          ~ by {JSON.parse(sessionStorage.getItem("user")).name}
        </Typography>
        <Typography variant="body1" style={contentStyle}>
          {isTranslated ? translatedContent : blogData.content}
        </Typography>
        {isTranslated && (
          <Button
            variant="contained"
            color="primary"
            onClick={toggleTranslation}
          >
            Show Original
          </Button>
        )}
        {!isTranslated && (
          <>
            <Select
              labelId="target-language-label"
              id="target-language"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
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
              <MenuItem value="ko">Korean</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={translateBlog}>
              Translate
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
}
