import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../css/Modifymovie.css";

function Modifymovie() {
  const [movie, setMovie] = useState({
    movie_no: "",
    movie_name: "",
    movie_desc: "",
    movie_rating: "",
    movie_image: "",
  });
  const [searchId, setSearchId] = useState("");
  const { movieid } = useParams();
  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  // Fetch movie by ID or name
  const getMovie = useCallback((idOrName) => {
    const url = `${BASE_URL}/mainapp/get/${idOrName}`;
    axios.get(url)
      .then((resp) => {
        const current = Array.isArray(resp.data) ? resp.data[0] : resp.data;
        if (current) {
          setMovie({
            movie_no: current.movie_no || "",
            movie_name: current.movie_name || "",
            movie_desc: current.movie_desc || "",
            movie_rating: current.movie_rating || "",
            movie_image: current.movie_image || "",
          });
        } else {
          alert("Movie not found!");
          setMovie({
            movie_no: "",
            movie_name: "",
            movie_desc: "",
            movie_rating: "",
            movie_image: "",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        alert("No movie found with that ID or name!");
      });
  }, [BASE_URL]);

  // Fetch on page load if movieid exists in URL
  useEffect(() => {
    if (movieid) getMovie(movieid);
  }, [movieid, getMovie]);

  // Handle input changes
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // Update movie
  const updateMovie = () => {
    const idToUse = movieid || movie.movie_no;
    if (!idToUse) {
      alert("No movie selected to update!");
      return;
    }

    const url = `${BASE_URL}/mainapp/put/${idToUse}`;
    const payload = {
      movie_no: parseInt(movie.movie_no) || undefined,
      movie_name: movie.movie_name || undefined,
      movie_desc: movie.movie_desc || undefined,
      movie_rating: parseFloat(movie.movie_rating) || undefined,
    };

    axios.put(url, payload, { headers: { "Content-Type": "application/json" } })
      .then((resp) => {
        alert("Movie updated successfully!");
        console.log(resp.data);
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert("Update failed: " + JSON.stringify(err.response?.data));
      });
  };

  // Delete movie
  const deleteMovie = () => {
    const idToUse = movieid || movie.movie_no;
    if (!idToUse) {
      alert("No movie selected to delete!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this movie?")) {
      const url = `${BASE_URL}/mainapp/delete/${idToUse}`;
      axios.delete(url)
        .then(() => {
          alert("Movie deleted successfully");
          setMovie({ movie_no: "", movie_name: "", movie_desc: "", movie_rating: "", movie_image: "" });
        })
        .catch((err) => {
          console.error(err.response?.data);
          alert("Delete failed: " + JSON.stringify(err.response?.data));
        });
    }
  };

  // Search movie
  const handleSearch = () => {
    if (searchId.trim() !== "") {
      getMovie(searchId);
      setSearchId("");
    } else {
      alert("Please enter a movie ID or name to search.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="modify">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by movie ID or name"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={handleKeyPress}
          className="movie"
        />
        <button className="searchmovie" onClick={handleSearch}>
          <img src={`${BASE_URL}/images/searchlogo.jpg`} alt="Search" />
        </button>
      </div>

      {/* Movie image preview */}
      {movie.movie_image && (
        <div className="movie-preview">
          <img src={`${BASE_URL}${movie.movie_image}`} alt={movie.movie_name} width={200} />
        </div>
      )}

      {/* Movie details */}
      <input type="number" name="movie_no" value={movie.movie_no} onChange={handleChange} placeholder="movie_no" className="desc" /><br />
      <input type="text" name="movie_name" value={movie.movie_name} onChange={handleChange} placeholder="movie_name" className="desc" /><br />
      <input type="text" name="movie_desc" value={movie.movie_desc} onChange={handleChange} placeholder="movie_desc" className="desc" /><br />
      <input type="number" name="movie_rating" value={movie.movie_rating} onChange={handleChange} placeholder="movie_rating" className="desc" /><br />

      {/* Action buttons */}
      <button onClick={updateMovie} className="update">Update Movie</button><br /><br />
      <button onClick={deleteMovie} className="delete">Delete Movie</button>
    </div>
  );
}

export default Modifymovie;
