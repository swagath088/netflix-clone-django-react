import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Details.css';
function Details(){
    let navigate=useNavigate();
    let { movieid } = useParams();
    let [data,setdata]=useState([]);
    const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";
    useEffect(()=>{
        let url = `${BASE_URL}/mainapp/get/${movieid}`;
        axios.get(url)
        .then((resp)=>{
            console.log(resp)
            setdata(resp.data)
        })
        .catch((err)=>{
            console.log(err)
            setdata([])
        })
    },[BASE_URL,movieid])
   return (
        <div className="details">
            {data.length === 0 ? (
                <p>No movies found or loading...</p>
            ) : (
                data.map(n => (
                    <div key={n.movie_no}>
                        <p>movie_no: {n.movie_no}</p>
                        <p>movie_name: {n.movie_name}</p>
                        <p>movie_desc: {n.movie_desc}</p>
                        <p>movie_rating: {n.movie_rating}</p>
                        {n.movie_image && (
                            <img 
                            src={`${BASE_URL}${n.movie_image}`} 
                            alt={n.movie_name} 
                            onClick={() => navigate('/app/Playvideo', { state: { url: n.movie_video } })} 
                            />

                        )}
                        
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Details;
