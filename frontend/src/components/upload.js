// contains upload form component

import React, { useState } from "react";
import "./upload.css";
export default function UploadForm() {
  // post to /api/uploadblog on submit
  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    image: null,
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (
      !formData.title ||
      !formData.keywords ||
      !formData.image ||
      !formData.content
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Here, you can submit the form data to your API endpoint (e.g., /api/uploadblog)
    // You can use FormData for file uploads if needed.

    // Reset the form
    setFormData({
      title: "",
      keywords: "",
      image: null,
      content: "",
    });

    // Optionally, you can show a success message or redirect to another page.
  };

  return (
    // <div className="outer-div">
    //   <h1>Upload your blog</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form">
    //       <label>Title:</label>
    //       <input
    //         type="text"
    //         name="title"
    //         value={formData.title}
    //         onChange={handleInputChange}
    //         required
    //       />
    //       <label>Keywords:</label>
    //       <input
    //         type="text"
    //         name="keywords"
    //         value={formData.keywords}
    //         onChange={handleInputChange}
    //         required
    //       />
    //       <label>Image:</label>
    //       <input
    //         type="file"
    //         name="image"
    //         onChange={handleInputChange}
    //         accept="image/*"
    //         required
    //       />
    //       <label>Content:</label>
    //       <textarea
    //         name="content"
    //         value={formData.content}
    //         onChange={handleInputChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
    <div className="centered-container">
      <div className="small-div">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title:</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered "
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Keywords:</span>
          </label>
          <input
            type="text"
            placeholder="Keywords"
            className="input input-bordered "
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image:</span>
          </label>
          <input type="file" className="file-input file-input-bordered " />
        </div>
      </div>
      <div className="small-div">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content:</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-100"
            placeholder="Write here..."
          ></textarea>
        </div>
        <div style={{ margin: "20px 0" }}></div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-blue px-10 center"
        />
      </div>
    </div>
  );
}
