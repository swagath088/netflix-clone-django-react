import axios from 'axios';
import '../css/Addmovie.css';
import { useRef, useState } from 'react';
function Addmovies(){
   let no= useRef();
   let name =useRef();
   let desc =useRef();
   let rating =useRef();
   let image =useRef();
   let video =useRef();
   const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

   let [item,setitem]=useState('');
   let add = () => {
  let formData = new FormData();

  formData.append("movie_no", no.current.value);
  formData.append("movie_name", name.current.value);
  formData.append("movie_desc", desc.current.value);
  formData.append("movie_rating", rating.current.value);
  formData.append("movie_image", image.current.files[0]);
  formData.append("movie_video", video.current.files[0]);

let url = `${BASE_URL}/mainapp/Add/`;



  axios
    .post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((resp) => {
      console.log(resp);
      setitem("Successfully created ✅");

      no.current.value = "";
      name.current.value = "";
      desc.current.value = "";
      rating.current.value = "";
      image.current.value = "";
      video.current.value = "";
    })
    .catch((err) => {
      console.log(err);
      setitem("❌ Error! Please try again");
    });
   }
    return(
        <div className="movie">
            <label htmlFor="" className="no">
                movie_no
                <input type="text" name="" id="" ref={no} />
            </label><br />
             <label htmlFor="" className="name">
                movie_name
                <input type="text" name="" id="" ref={name} />
            </label><br />
             <label htmlFor="" className="desc">
                movie_desc
                <input type="text" name="" id="" ref={desc} />
            </label><br />
             <label htmlFor="" className="rating">
                movie_rating
                <input type="text" name="" id=""  ref={rating}/>
            </label><br />
             <label htmlFor="" className="image">
                movie_image
                <input type="file" name="" id="" accept='/image' ref={image} />
            </label><br />
             <label className="video">
                movie_video
                <input type="file"  ref={video} accept='/video'/>
                </label><br />
            <button onClick={add}>add movie</button>
            <p>{item}</p>
        </div>
    );
}
export default Addmovies;