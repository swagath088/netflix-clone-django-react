import { useLocation } from "react-router-dom";
import '../css/Playvideo.css';

function Playvideo() {
    let location=useLocation();
    const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

    console.log(location.state.url)
    return(
        <div className="video">
             <video 
                src={`${BASE_URL}/mainapp/video/${location.state.url.split('/').pop()}`}
                autoPlay 
                controls
            ></video>
        </div>
    );
}

export default Playvideo;
