import { useLocation } from "react-router-dom";
import '../css/Playvideo.css';

function Playvideo() {
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  if (!location.state?.url) return <p>No video found</p>;

  return (
    <div className="video">
      <video
        src={location.state.url.startsWith('http') ? location.state.url : `${BASE_URL}${location.state.url}`}
        autoPlay
        controls
      ></video>
    </div>
  );
}

export default Playvideo;
