import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Fetch movie by ID or name
  const getMovie = useCallback(
    (idOrName) => {
      axios
        .get(`${BASE_URL}/mainapp/get/${idOrName}/`)
        .then((resp) => {
          const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
          if (data) {
            setMovie(data);
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
        .catch(() => alert("No movie found with that ID or name!"));
    },
    [BASE_URL]
  );

  useEffect(() => {
    if (movieid) getMovie(movieid);
  }, [movieid, getMovie]);

  // Handle input changes
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // Update movie
  const updateMovie = () => {
    const id = movieid || movie.movie_no;
    if (!id) return alert("No movie selected!");

    axios
      .put(`${BASE_URL}/mainapp/put/${id}/`, movie, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => alert("Movie updated successfully!"))
      .catch((err) =>
        alert("Update failed: " + JSON.stringify(err.response?.data))
      );
  };

  // Delete movie
  const deleteMovie = () => {
    const id = movieid || movie.movie_no;
    if (!id) return alert("No movie selected!");

    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`${BASE_URL}/mainapp/delete/${id}/`) // DELETE request
        .then(() => {
          alert("Movie deleted successfully!");
          // Clear form
          setMovie({
            movie_no: "",
            movie_name: "",
            movie_desc: "",
            movie_rating: "",
            movie_image: "",
          });
          // Navigate back to All Movies page
          navigate("/all"); 
        })
        .catch((err) =>
          alert("Delete failed: " + JSON.stringify(err.response?.data))
        );
    }
  };

  // Search movie
  const handleSearch = () => {
    if (searchId.trim()) {
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
          Search
        </button>
      </div>

      {/* Preview image */}
      {movie.movie_image && (
        <div className="movie-preview">
          <img
              src={n.movie_image}
              alt={n.movie_name}
              width="200"
          />
        </div>
      )}

      {/* Form fields */}
      <input
        type="number"
        name="movie_no"
        value={movie.movie_no}
        onChange={handleChange}
        placeholder="Movie No"
        className="desc"
      />
      <input
        type="text"
        name="movie_name"
        value={movie.movie_name}
        onChange={handleChange}
        placeholder="Movie Name"
        className="desc"
      />
      <input
        type="text"
        name="movie_desc"
        value={movie.movie_desc}
        onChange={handleChange}
        placeholder="Movie Description"
        className="desc"
      />
      <input
        type="number"
        name="movie_rating"
        value={movie.movie_rating}
        onChange={handleChange}
        placeholder="Movie Rating"
        className="desc"
      />

      {/* Buttons */}
      <button onClick={updateMovie} className="update">
        Update Movie
      </button>
      <button onClick={deleteMovie} className="delete">
        Delete Movie
      </button>
    </div>
  );
}

export default Modifymovie;
