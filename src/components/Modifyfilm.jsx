import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Modifyfilm.css";

function Modifyfilm() {
  const [allMovies, setAllMovies] = useState([]);
  const [movie, setMovie] = useState({
    movie_no: "",
    movie_name: "",
    movie_desc: "",
    movie_rating: "",
    movie_image: "",
  });
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const BASE_URL = (() => {
    const host = window.location.hostname;
    if (["127.0.0.1", "localhost"].includes(host)) {
      return "http://127.0.0.1:8000/mainapp";
    } else {
      return "https://netflix-clone-backend-1-4ynr.onrender.com/mainapp";
    }
  })();

  // ✅ Fetch all movies initially
  useEffect(() => {
    axios
      .get(`${BASE_URL}/show/`)
      .then((resp) => setAllMovies(resp.data))
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setAllMovies([]);
      });
  }, [BASE_URL]);

  // ✅ Search locally by name or number
  const handleSearch = () => {
    const query = searchId.trim().toLowerCase();
    if (!query) return alert("Enter movie ID or Name");

    const found = allMovies.find(
      (m) =>
        m.movie_no.toString() === query ||
        m.movie_name.toLowerCase().includes(query)
    );

    if (found) {
      setMovie(found);
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

    setSearchId("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // ✅ Update movie
  const updateMovie = () => {
    const id = movie.movie_no;
    if (!id) return alert("No movie selected!");
    axios
      .put(`${BASE_URL}/put/${id}/`, movie, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => alert("Movie updated successfully!"))
      .catch((err) =>
        alert("Update failed: " + JSON.stringify(err.response?.data))
      );
  };

  // ✅ Delete movie
  const deleteMovie = () => {
    const id = movie.movie_no;
    if (!id) return alert("No movie selected!");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(`${BASE_URL}/delete/${id}/`)
        .then(() => {
          alert("Movie deleted successfully!");
          setMovie({
            movie_no: "",
            movie_name: "",
            movie_desc: "",
            movie_rating: "",
            movie_image: "",
          });
          navigate("/app/all");
        })
        .catch((err) =>
          alert("Delete failed: " + JSON.stringify(err.response?.data))
        );
    }
  };

  return (
    <div className="modify">
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

      {movie.movie_image && (
        <div className="movie-preview">
          <img src={movie.movie_image} alt={movie.movie_name} width="200" />
        </div>
      )}

      <input
        type="number"
        name="movie_no"
        value={movie.movie_no}
        onChange={handleChange}
        placeholder="Movie No"
        className="desc"
        disabled
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

      <button onClick={updateMovie} className="update">
        Update Movie
      </button>
      <button onClick={deleteMovie} className="delete">
        Delete Movie
      </button>
    </div>
  );
}

export default Modifyfilm;
