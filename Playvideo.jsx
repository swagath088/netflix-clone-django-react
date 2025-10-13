import { useLocation } from "react-router-dom";
import '../css/Playvideo.css';

function Playvideo() {
    let location=useLocation();
    console.log(location.state.url)
    return(
        <div className="video">
             <video 
                src={`https://netflix-clone-backend-1-4ynr.onrender.com/mainapp/video/${location.state.url.split('/').pop()}`}
                autoPlay 
                controls
            ></video>
        </div>
    );
}

export default Playvideo;
