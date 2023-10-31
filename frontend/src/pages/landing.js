import React, { useEffect, useState } from "react";
import ActionAreaCard from "../components/actcard";
import Navbar from "../components/navbar";
import { useHistory } from "react-router-dom";

function Landing() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    // Fetch the data from the local JSON file or your backend API
    fetch("http://localhost:5000/api/blogs")
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {/* Include your Navbar component */}
      <Navbar />

      <div
        style={{ marginTop: "50px", marginLeft: "50px ", marginRight: "50px" }}
      >
        {/* Display ActionAreaCard components dynamically */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "14px",
          }}
        >
          {cardsData.map((card, index) => (
            <ActionAreaCard
              key={index}
              id={card.id}
              imageUrl={card.imageUrl}
              title={card.title}
              keywords={card.keywords}
              style={{ width: "0 0 calc(33.333% - 8px)", margin: "4px" }} // Adjust the width as needed
            />
          ))}
        </div>
      </div>

      {/* Add the rest of your page content here */}
    </div>
  );
}

export default Landing;
