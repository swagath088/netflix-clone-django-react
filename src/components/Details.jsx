import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../css/Details.css';
function Details(){
    let navigate=useNavigate();
    let { movieid } = useParams();
    let [data,setdata]=useState([]);
    useEffect(()=>{
        let url='http://127.0.0.1:8000/mainapp/get/'+movieid;
        axios.get(url)
        .then((resp)=>{
            console.log(resp)
            setdata(resp.data)
        })
        .catch((err)=>{
            console.log(err)
            setdata([])
        })
    },[movieid])
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
                            <img src={'http://127.0.0.1:8000' + n.movie_image} alt={n.movie_name} onClick={()=>navigate('/app/Playvideo' , { state:{url:n.movie_video}}) } />
                        )}
                        
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default Details;