// components/UploadVideoForm.js

import React, { useState } from "react";

const UploadVideoForm = () => {
  const [videoURL, setVideoURL] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [names, setNames] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, like sending data to backend
    // You can use axios or fetch API for HTTP requests
    console.log("Form submitted with data:", {
      videoURL,
      time,
      location,
      names,
      duration,
    });
    // Reset form fields
    setVideoURL("");
    setTime("");
    setLocation("");
    setNames("");
    setDuration("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col mb-4">
        <label htmlFor="videoURL" className="font-bold mb-2">
          Video/URL:
        </label>
        <input
          type="text"
          id="videoURL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          placeholder="Enter video URL"
          className="border rounded py-2 px-3 text-gray-700"
        />
      </div>
      {/* Other input fields for time, location, names, duration */}
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadVideoForm;
