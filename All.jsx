import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function All() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // Fetch all movies
  const fetchMovies = () => {
    axios
      .get(`${BASE_URL}/mainapp/show/`)
      .then((resp) => setMovies(resp.data))
      .catch((err) => {
        console.error(err);
        setMovies([]);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Delete movie
  const deleteMovie = (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    axios
      .delete(`${BASE_URL}/mainapp/delete/${id}/`)
      .then(() => {
        alert("Movie deleted successfully!");
        setMovies((prev) => prev.filter((m) => m.movie_no !== id)); // remove from list
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        alert("Delete failed!");
      });
  };

  return (
    <div className="imageone">
      {movies.length === 0 && <p>No movies found</p>}
      {movies.map((n) => (
        <div key={n.movie_no}>
          <img
            src={
              n.movie_image?.startsWith("http")
                ? n.movie_image
                : `${BASE_URL}${n.movie_image}`
            }
            alt={n.movie_name}
            width="200"
            onClick={() =>
              navigate("/app/playvideo", { state: { url: n.movie_video } })
            }
          />
          <p>{n.movie_name}</p>
          <button onClick={() => deleteMovie(n.movie_no)}>Delete</button>
          <button onClick={() => navigate(`/modify/${n.movie_no}`)}>
            Modify
          </button>
        </div>
      ))}
    </div>
  );
}

export default All;
