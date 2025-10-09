import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
function Love(){
               let [data, setData] = useState([]);
               let navigate = useNavigate();
            
               useEffect(() => {
                axios.get('http://127.0.0.1:8000/mainapp/show/')
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
               }, []);
            
               return (
                 <div className="imageone">
                     {data.length === 0 && <p>No Lovemovies found</p>}
                     {data.map(n => (
                     <div key={n.id}>
                       <img 
                         src={'http://127.0.0.1:8000'+n.movie_image} 
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