import React, { useEffect, useState } from "react";
import ActionAreaCard from "../components/actcard";
import Navbar from "../components/navbar";
import Blog from "../components/blog";
import { useHistory } from "react-router-dom";

function DisplayBlog() {
  const [cardsData, setCardsData] = useState([]);

  // useEffect(() => {
  //   // Fetch the data from the local JSON file or your backend API
  //   fetch("http://localhost:5000/api/blogs")
  //     .then((response) => response.json())
  //     .then((data) => setCardsData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <div>
      {/* Include your Navbar component */}
      <Navbar />

      <div>
        <Blog />
      </div>
    </div>
  );
}

export default DisplayBlog;
