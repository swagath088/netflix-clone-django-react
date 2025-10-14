import All from "./All";
import { Routes,Route,Navigate} from "react-router-dom";
import '../css/Mainpage.css';
import Addmovies from "./Addmovies";
import Love from "./Love";
import Details from "./Details";
import Playvideo from "./Playvideo";
import Modifymovie from "./Modifymovie";
import Action from "./Action";
import Logout from "./Logout";
import Webseries from "./Webseries";
function Mainpage(){
    let isSuperuser = localStorage.getItem("isSuperuser") === 'true';
    return(
        <main className="mainpage">
            <div className="page">
        <Routes>
          < Route index element={<All/>} /> 
          <Route path="all" element={<All/>} />
          <Route path="love" element={<Love/>}/>
          <Route path="playvideo" element={<Playvideo/>}/>
          <Route path="action" element={<Action/>}/>
          <Route path="webseries" element={<Webseries/>}/>
          <Route
            path="add"
            element={isSuperuser ? <Addmovies /> : <Navigate to="/app" />}
          />
          <Route
            path="details/:movieid"
            element={<Details />} 
          />
          <Route
            path="modify/:movieid"
            element={isSuperuser ? <Modifymovie /> : <Navigate to="/app" />}
          />
        </Routes>
            </div>
       </main>
    );
}
export default Mainpage;
