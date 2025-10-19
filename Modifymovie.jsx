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
  const [searchInput, setSearchInput] = useState("");
  const { movieid } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Fetch movie by ID
  const getMovieById = useCallback(
    (id) => {
      axios
        .get(`${BASE_URL}/mainapp/get/${id}/`)
        .then((resp) => {
          const data = Array.isArray(resp.data) ? resp.data[0] : resp.data;
          if (data) setMovie(data);
          else alert("Movie not found!");
        })
        .catch(() => alert("No movie found with that ID!"));
    },
    [BASE_URL]
  );

  // Fetch movie by Name
  const getMovieByName = useCallback(
    (name) => {
      axios
        .get(`${BASE_URL}/mainapp/search/?name=${name}`)
        .then((resp) => {
          if (Array.isArray(resp.data) && resp.data.length) setMovie(resp.data[0]);
          else alert("Movie not found!");
        })
        .catch(() => alert("No movie found with that name!"));
    },
    [BASE_URL]
  );

  // Search (by ID or name)
  const handleSearch = () => {
    const term = searchInput.trim();
    if (!term) return alert("Enter movie ID or name");

    if (/^\d+$/.test(term)) getMovieById(term);
    else getMovieByName(term);

    setSearchInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Handle input changes (only editable fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  // Update movie details
  const updateMovie = () => {
    const id = movie.movie_no;
    if (!id) return alert("No movie selected!");

    const updatedFields = {
      movie_name: movie.movie_name,
      movie_desc: movie.movie_desc,
      movie_rating: movie.movie_rating,
    };

    axios
      .put(`${BASE_URL}/mainapp/put/${id}/`, updatedFields, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => alert("Movie updated successfully!"))
      .catch((err) =>
        alert("Update failed: " + JSON.stringify(err.response?.data))
      );
  };

  // Delete movie
  const deleteMovie = () => {
    const id = movie.movie_no;
    if (!id) return alert("No movie selected!");

    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`${BASE_URL}/mainapp/delete/${id}/`)
        .then(() => {
          alert("Movie deleted successfully!");
          setMovie({
            movie_no: "",
            movie_name: "",
            movie_desc: "",
            movie_rating: "",
            movie_image: "",
          });
          navigate("/all");
        })
        .catch((err) =>
          alert("Delete failed: " + JSON.stringify(err.response?.data))
        );
    }
  };

  // Load only if a valid movieid exists in URL
  useEffect(() => {
    if (movieid && /^\d+$/.test(movieid)) {
      getMovieById(movieid);
    }
  }, [movieid, getMovieById]);

  return (
    <div className="modify">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by movie ID or name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="movie"
        />
        <button className="searchmovie" onClick={handleSearch}>
          <img src="/images/searchlogo.jpg" alt="Search" />
        </button>
      </div>

      {/* Image Preview */}
      {movie.movie_image && (
        <div className="movie-preview">
          <img
            src={movie.movie_image}
            alt={movie.movie_name}
            width="200"
            style={{ borderRadius: "8px" }}
          />
        </div>
      )}

      {/* Editable Fields */}
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
