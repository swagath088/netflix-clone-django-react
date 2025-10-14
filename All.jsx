import axios from "axios";
import { useEffect, useState } from "react";
import '../css/All.css';
import { useNavigate } from "react-router-dom";
import Playvideo from "./Playvideo";

function All(){
   let [data,setdata]=useState([]);
   let navigate=useNavigate();
   const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

   useEffect(()=>{
    let get_url = `${BASE_URL}/mainapp/show/`;
    axios.get(get_url)
    .then((resp)=>{
        console.log(resp)
        setdata(resp.data)
    })
    .catch((err)=>{
        console.log(err)
        setdata(err)
    })
   },[BASE_URL]);
    return(
        <div className="imageone">
            {
                data.map((n)=>{
                    return(
                    <div>
                        <img 
                                src={`${BASE_URL}${n.movie_image}`} 
                                alt={n.movie_name} 
                                onClick={() => navigate('/app/Playvideo', { state: { url: n.movie_video } })} 
                                />
                        <p>{n.movie_name}</p>
                    </div>
                    )
                })
            }
        </div>
    );
}
export default All;