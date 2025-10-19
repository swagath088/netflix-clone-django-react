import { useLocation } from "react-router-dom";
import "../css/Playvideo.css";

function Playvideo() {
  const location = useLocation();

  // Normalize Cloudinary video URL
  const normalizeUrl = (url, type) => {
    if (!url) return "";
    if (url.startsWith(`${type}/upload/http`)) {
      return url.replace(`${type}/upload/`, "");
    }
    if (url.startsWith("http")) return url;
    return `https://res.cloudinary.com/dcguhkbhj/${url}`;
  };

  if (!location.state?.url) return <p>No video found</p>;

  return (
    <div className="video">
      <video
        src={normalizeUrl(location.state.url, "video")}
        autoPlay
        controls
      ></video>
    </div>
  );
}

export default Playvideo;
