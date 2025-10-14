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
  });
  const [searchId, setSearchId] = useState("");
  const { movieid } = useParams();
  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  // ✅ Wrap getMovie in useCallback to satisfy useEffect dependencies
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
          });
        } else {
          alert("Movie not found!");
        }
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        alert("No movie found with that ID or name!");
      });
  }, [BASE_URL]);

  // ✅ useEffect now safe
  useEffect(() => {
    if (movieid) getMovie(movieid);
  }, [movieid, getMovie]);

  // Handle input changes
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // Update movie
  const update = () => {
    const url = `${BASE_URL}/mainapp/put/${movieid}`;
    const payload = {};
    if (movie.movie_no) payload.movie_no = parseInt(movie.movie_no);
    if (movie.movie_name) payload.movie_name = movie.movie_name;
    if (movie.movie_desc) payload.movie_desc = movie.movie_desc;
    if (movie.movie_rating) payload.movie_rating = parseFloat(movie.movie_rating);

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
    const url = `${BASE_URL}/mainapp/delete/${movieid}`;
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios.delete(url)
        .then(() => {
          alert("Movie deleted successfully");
          setMovie({ movie_no: "", movie_name: "", movie_desc: "", movie_rating: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  // Search movie
  const handleSearch = () => {
    if (searchId.trim() !== "") getMovie(searchId);
    else alert("Please enter a movie ID or name to search.");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="modify">
      {/* Search bar */}
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

      {/* Movie details */}
      <input
        type="number"
        name="movie_no"
        value={movie.movie_no}
        onChange={handleChange}
        placeholder="movie_no"
        className="desc"
      />
      <br />
      <input
        type="text"
        name="movie_name"
        value={movie.movie_name}
        onChange={handleChange}
        placeholder="movie_name"
        className="desc"
      />
      <br />
      <input
        type="text"
        name="movie_desc"
        value={movie.movie_desc}
        onChange={handleChange}
        placeholder="movie_desc"
        className="desc"
      />
      <br />
      <input
        type="number"
        name="movie_rating"
        value={movie.movie_rating}
        onChange={handleChange}
        placeholder="movie_rating"
        className="desc"
      />
      <br />

      {/* Action buttons */}
      <button onClick={update} className="update">Update Movie</button>
      <br /><br />
      <button onClick={deleteMovie} className="delete">Delete</button>
    </div>
  );
}

export default Modifymovie;
