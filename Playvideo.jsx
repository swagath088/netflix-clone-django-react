import { useLocation } from "react-router-dom";
import '../css/Playvideo.css';

function Playvideo() {
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  if (!location.state?.url) return <p>No video found</p>;

  return (
    <div className="video">
      <video
        src={location.state.url} // location.state.url already has HTTPS
        autoPlay
        controls
      ></video>


    </div>
  );
}

export default Playvideo;
