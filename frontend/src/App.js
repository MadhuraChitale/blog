import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages for the different routes
import Landing from "./pages/landing";
import Login from "./pages/login";
import DisplayBlog from "./pages/displayblog";
import DisplayForm from "./pages/displayform";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/landing/:id" element={<DisplayBlog />} />
          <Route path="/upload" element={<DisplayForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
