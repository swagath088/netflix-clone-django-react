import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/Modifyfilm.css'; // external CSS

function Modifyfilm() {
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

  // Dynamic BASE_URL for local and production
  const BASE_URL = (() => {
    const host = window.location.hostname;
    if (["127.0.0.1", "localhost"].includes(host)) {
      return "http://127.0.0.1:8000/mainapp";
    } else if (
      host === "netflix-clone-django-react-swagaths-projects.vercel.app"
    ) {
      return "https://netflix-clone-backend-1-4ynr.onrender.com/mainapp";
    } else {
      return "https://netflix-clone-backend-1-4ynr.onrender.com/mainapp";
    }
  })();

  // Fetch movie by ID or Name
  const fetchMovie = useCallback(
    (query) => {
      if (!query) return;
      axios
        .get(`${BASE_URL}/get/${query}/`)
        .then((resp) => {
          if (resp.data.length) {
            setMovie(resp.data[0]);
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
        .catch(() => {
          alert("Movie not found!");
          setMovie({
            movie_no: "",
            movie_name: "",
            movie_desc: "",
            movie_rating: "",
            movie_image: "",
          });
        });
    },
    [BASE_URL]
  );

  useEffect(() => {
    if (movieid) fetchMovie(movieid);
  }, [movieid, fetchMovie]);

  const handleSearch = () => {
    const trimmed = searchId.trim();
    if (!trimmed) return alert("Enter movie ID or Name");
    fetchMovie(trimmed);
    setSearchId("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

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
          navigate("/app/all"); // ✅ fixed navigation after delete
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
