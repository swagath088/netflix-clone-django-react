import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/All.css";

function All() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      console.log("Fetching movies from API..."); // ✅ debug
      const resp = await axios.get(`${BASE_URL}/mainapp/show/`);
      console.log("API Response:", resp.data); // ✅ debug actual data
      setMovies(resp.data);
    } catch (err) {
      console.error("API Error:", err); // ✅ debug error
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="imageone">
      {movies.length === 0 && <p>No movies found</p>}
      {movies.map((movie) => (
        <div key={movie.movie_no} className="movie-card">
          <img
            src={movie.movie_image}
            alt={movie.movie_name}
            width="200"
            onClick={() =>
              navigate("/app/playvideo", {
                state: { url: movie.movie_video },
              })
            }
            className="movie-image"
          />
          <p>{movie.movie_name}</p>
          <p>Video URL: {movie.movie_video}</p> {/* show URL for debugging */}
        </div>
      ))}
    </div>
  );
}

export default All;
