import axios from 'axios';
import '../css/Addmovie.css';
import { useRef, useState } from 'react';

function Addmovies() {
  const no = useRef();
  const name = useRef();
  const desc = useRef();
  const rating = useRef();
  const image = useRef();
  const video = useRef();
  const [item, setItem] = useState('');

  const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

  const add = async () => {
    if (!no.current.value || !name.current.value) {
      setItem("❌ Please fill required fields");
      return;
    }

    const formData = new FormData();
    formData.append("movie_no", no.current.value);
    formData.append("movie_name", name.current.value);
    formData.append("movie_desc", desc.current.value);
    formData.append("movie_rating", rating.current.value);
    if (image.current.files[0]) formData.append("movie_image", image.current.files[0]);
    if (video.current.files[0]) formData.append("movie_video", video.current.files[0]);

    try {
      const resp = await axios.post(`${BASE_URL}/mainapp/Add/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(resp);
      setItem("Successfully created ✅");

      // Reset inputs
      no.current.value = "";
      name.current.value = "";
      desc.current.value = "";
      rating.current.value = "";
      image.current.value = "";
      video.current.value = "";
    } catch (err) {
      console.error(err);
      setItem("❌ Error! Please try again");
    }
  };

  return (
    <div className="movie">
      <label className="no">Movie No
        <input type="text" ref={no} />
      </label><br />

      <label className="name">Movie Name
        <input type="text" ref={name} />
      </label><br />

      <label className="desc">Movie Desc
        <input type="text" ref={desc} />
      </label><br />

      <label className="rating">Movie Rating
        <input type="text" ref={rating} />
      </label><br />

      <label className="image">Movie Image
        <input type="file" ref={image} accept="image/*" />
      </label><br />

      <label className="video">Movie Video
        <input type="file" ref={video} accept="video/*" />
      </label><br />

      <button onClick={add}>Add Movie</button>
      <p>{item}</p>
    </div>
  );
}

export default Addmovies;
