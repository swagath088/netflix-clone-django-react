import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Action() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const BASE_HOST = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  useEffect(() => {
    axios.get(`${BASE_HOST}/mainapp/show/`)
      .then(resp => {
        const filtered = resp.data.filter(n => n.movie_name.toLowerCase().includes('action'));
        setData(filtered);
      })
      .catch(err => {
        console.log(err);
        setData([]);
      });
  }, [BASE_HOST]);

  return (
    <div className="imageone">
      {data.length === 0 && <p>No action movies found</p>}
      {data.map(n => (
        <div key={n.id} className="movie-card">
          <img
            src={n.movie_image.startsWith('http') ? n.movie_image : `${BASE_HOST}${n.movie_image}`}
            alt={n.movie_name}
            width="200"
            onClick={() => navigate('/app/playvideo', { state: { url: n.movie_video.startsWith('http') ? n.movie_video : `${BASE_HOST}${n.movie_video}` } })}
          />
          <p className="movie-name">{n.movie_name}</p>
        </div>
      ))}
    </div>
  );
}

export default Action;
