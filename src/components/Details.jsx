import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Details.css';

function Details() {
  const navigate = useNavigate();
  const { movieid } = useParams();
  const [data, setData] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/mainapp/get/${movieid}`);
        setData(resp.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setData([]);
      }
    };

    fetchData();
  }, [BASE_URL, movieid]);

  if (!data || data.length === 0) {
    return <p className="loading">No movies found or loading...</p>;
  }

  return (
    <div className="details">
      {data.map((movie) => (
        <div key={movie.movie_no} className="movie-item">
          <p><strong>Movie No:</strong> {movie.movie_no}</p>
          <p><strong>Movie Name:</strong> {movie.movie_name}</p>
          <p><strong>Description:</strong> {movie.movie_desc}</p>
          <p><strong>Rating:</strong> {movie.movie_rating}</p>
          {movie.movie_image && (
                 <img
              src={n.movie_image}
              alt={n.movie_name}
              width="200"
              className="movie-image"
              onClick={() => navigate('/app/Playvideo', { state: { url: movie.movie_video } })}
            />
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Details;
