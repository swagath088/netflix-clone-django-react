import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Moviedetails.css";

function Moviedetails() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  // Fetch all movies only if no filteredMovies passed from Header
  useEffect(() => {
    if (location.state?.filteredMovies) {
      setMovies(location.state.filteredMovies);
    } else {
      axios
        .get(`${BASE_URL}/mainapp/show/`)
        .then((resp) => setMovies(resp.data))
        .catch(() => setMovies([]));
    }
  }, [location.state]);

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (!query) return alert("Enter movie ID or Name");

    const filtered = movies.filter(
      (m) =>
        m.movie_name.toLowerCase().includes(query) ||
        m.movie_no.toString() === query
    );

    if (filtered.length === 0) return alert("No movies found");
    setMovies(filtered);
    setSearchText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="moviedetails-container">
      <div className="moviedetails-searchbar">
        <input
          type="text"
          placeholder="Search by movie ID or Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="moviedetails-input"
        />
        <button onClick={handleSearch} className="moviedetails-button">
          Search
        </button>
      </div>

      <div className="moviedetails-results">
        {movies.length === 0 ? (
          <p className="moviedetails-none">No movies available</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.movie_no} className="moviedetails-item">
              <p><strong>Movie No:</strong> {movie.movie_no}</p>
              <p><strong>Name:</strong> {movie.movie_name}</p>
              <p><strong>Rating:</strong> {movie.movie_rating}</p>
              {movie.movie_image && (
                <img
                  src={movie.movie_image_url || movie.movie_image}
                  alt={movie.movie_name}
                  width="200"
                  className="moviedetails-image"
                  onClick={() =>
                    navigate("/app/playvideo", {
                      state: { url: movie.movie_video_url || movie.movie_video },
                    })
                  }
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Moviedetails;
