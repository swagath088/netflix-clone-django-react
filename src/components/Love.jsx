import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
function Love(){
               let [data, setData] = useState([]);
               let navigate = useNavigate();
              const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

               useEffect(() => {
                axios.get(`${BASE_URL}/mainapp/show/`)
                  .then(resp => {
                    console.log("All movies:", resp.data); // check what your API returns
                    let Love = resp.data.filter(n => n.movie_name.toLowerCase().includes('love'));
                    console.log("Filtered Love:", Love); // check filtered data
                    setData(Love);
                  })
                  .catch(err => {
                    console.log(err);
                    setData([]);
                  });
               }, [BASE_URL]);
            
               return (
                 <div className="imageone">
                     {data.length === 0 && <p>No Lovemovies found</p>}
                     {data.map(n => (
                     <div key={n.id}>
                       <img 
                          src={`${BASE_URL}${n.movie_image}`}
                         alt={n.movie_name} 
                         width="200"
                         onClick={() => navigate('/app/playvideo', { state:{ url: n.movie_video } })} 
                       />
                       <p>{n.movie_name}</p>
                     </div>
                   ))}
                 </div>
               );
}
export default Love;
