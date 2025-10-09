import axios from "axios";
import { useEffect, useState } from "react";
import '../css/All.css';
import { useNavigate } from "react-router-dom";
import Playvideo from "./Playvideo";

function All(){
   let [data,setdata]=useState([]);
   let navigate=useNavigate();
   useEffect(()=>{
    let get_url='http://127.0.0.1:8000/mainapp/show/';
    axios.get(get_url)
    .then((resp)=>{
        console.log(resp)
        setdata(resp.data)
    })
    .catch((err)=>{
        console.log(err)
        setdata(err)
    })
   },[]);
    return(
        <div className="imageone">
            {
                data.map((n)=>{
                    return(
                    <div>
                        <img src={'http://127.0.0.1:8000'+n.movie_image} alt="" onClick={()=>navigate('/app/Playvideo' , { state:{url:n.movie_video}}) } />
                        <p>{n.movie_name}</p>
                    </div>
                    )
                })
            }
        </div>
    );
}
export default All;