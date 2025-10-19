import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/All.css";

function Webseries() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const fetchMovies = () => {
    axios
      .get(`${BASE_URL}/mainapp/show/`)
      .then((resp) => {
        // filter webseries by name or desc
        const filtered = resp.data.filter(
          (m) =>
            (m.movie_name && m.movie_name.toLowerCase().includes("web")) ||
            (m.movie_desc && m.movie_desc.toLowerCase().includes("web"))
        );
        setMovies(filtered);
      })
      .catch((err) => {
        console.error(err);
        setMovies([]);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="imageone">
      {movies.length === 0 && <p>No web series found</p>}
      {movies.map((movie) => (
        <div key={movie.movie_no || movie.id} className="movie-card">
          <img
            src={movie.movie_image_url || movie.movie_image}
            alt={movie.movie_name || "Webseries"}
            width="200"
            className="movie-image"
            onClick={() =>
              navigate("/app/playvideo", {
                state: { url: movie.movie_video_url || movie.movie_video },
              })
            }
          />
          <p>{movie.movie_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Webseries;
