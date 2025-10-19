import React, { useState } from "react";
import axios from "axios";
import "../css/Addfilm.css";
export default function Addfilm() {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const BASE_HOST = (() => {
    const host = window.location.hostname;

    if (["127.0.0.1", "localhost"].includes(host)) {
      return "http://127.0.0.1:8000/mainapp";
    } else if (host === "netflix-clone-django-react-swagaths-projects.vercel.app") {
      return "https://netflix-clone-backend-1-4ynr.onrender.com/mainapp";
    } else {
      return "https://netflix-clone-backend-1-4ynr.onrender.com/mainapp";
    }
  })();

  // 1️⃣ Upload media files
  const handleUploadFiles = async () => {
    if (!imageFile || !videoFile) {
      alert("Select both image and video first");
      return;
    }

    const formData = new FormData();
    formData.append("movie_image", imageFile);
    formData.append("movie_video", videoFile);

    try {
      const res = await axios.post(`${BASE_HOST}/UploadMedia/`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setImageUrl(res.data.image_url);
      setVideoUrl(res.data.video_url);
      alert("Files uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed! Check console for details.");
    }
  };

  const handleSubmitMovie = async () => {
    if (!movieName || !movieDesc || !movieRating || !imageUrl || !videoUrl) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post(`${BASE_HOST}/add/`, {
        movie_name: movieName,
        movie_desc: movieDesc,
        movie_rating: movieRating,
        movie_image: imageUrl,
        movie_video: videoUrl
      });

      alert("Movie added successfully!");

      setMovieName("");
      setMovieDesc("");
      setMovieRating("");
      setImageUrl("");
      setVideoUrl("");
      setImageFile(null);
      setVideoFile(null);

      // Reset file input elements
      document.getElementById("imageInput").value = "";
      document.getElementById("videoInput").value = "";
    } catch (err) {
      console.error(err);
      alert("Adding movie failed! Check console.");
    }
  };

  return (
    <div className="addfilm-container">
      <h2 className="section-title">Step 1: Upload Media Files</h2>
      <input
        id="imageInput"
        type="file"
        className="file-input"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <input
        id="videoInput"
        type="file"
        className="file-input"
        onChange={(e) => setVideoFile(e.target.files[0])}
      />
      <button className="upload-btn" onClick={handleUploadFiles}>
        Upload Files
      </button>

      <h2 className="section-title">Step 2: Movie Details</h2>
      <input
        type="text"
        className="text-input"
        placeholder="Movie Name"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
      />
      <input
        type="text"
        className="text-input"
        placeholder="Movie Description"
        value={movieDesc}
        onChange={(e) => setMovieDesc(e.target.value)}
      />
      <input
        type="number"
        className="text-input"
        placeholder="Movie Rating"
        value={movieRating}
        onChange={(e) => setMovieRating(e.target.value)}
      />
      <input
        type="text"
        className="text-input readonly-input"
        placeholder="Movie Image URL"
        value={imageUrl}
        readOnly
      />
      <input
        type="text"
        className="text-input readonly-input"
        placeholder="Movie Video URL"
        value={videoUrl}
        readOnly
      />

      <button className="submit-btn" onClick={handleSubmitMovie}>
        Submit Movie
      </button>
    </div>
  );
}
