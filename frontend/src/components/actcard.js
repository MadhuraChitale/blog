import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ActionAreaCard({ image, title, description, id }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/landing/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 1000 }} onClick={handleCardClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={title} // You can use the title as alt text
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
