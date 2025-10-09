import { useLocation } from "react-router-dom";
import '../css/Playvideo.css';

function Playvideo() {
    let location=useLocation();
    console.log(location.state.url)
    return(
        <div className="video">
             <video 
                src={`http://127.0.0.1:8000/mainapp/video/${location.state.url.split('/').pop()}`} 
                autoPlay 
                controls
            ></video>
        </div>
    );
}

export default Playvideo;
