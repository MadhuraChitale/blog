import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack"; // Import Stack from Material-UI
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Import createTheme and ThemeProvider

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#02075d", // Replace with your desired dark blue color
    },
    // Add other color overrides if needed
  },
  // Add other theme configurations
});

export default function Navbar() {
  return (
    // <ThemeProvider theme={customTheme}>
    //   <AppBar position="static" color="primary">
    //     <Toolbar>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         Blog wesite name
    //       </Typography>
    //       <Tabs
    //         value={false} // Set value to false to prevent the tab selection effect
    //         aria-label="Navigation tabs"
    //       >
    //         <Tab
    //           label="Home"
    //           component={Link}
    //           href="/landing"
    //           style={{ color: "white" }}
    //         />
    //         <Tab
    //           label="Upload"
    //           component={Link}
    //           href="/upload"
    //           style={{ color: "white" }}
    //         />
    //       </Tabs>
    //     </Toolbar>
    //   </AppBar>
    // </ThemeProvider>
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Blog Site</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/landing">Home</a>
          </li>
          <li>
            <a href="/upload">Upload</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
