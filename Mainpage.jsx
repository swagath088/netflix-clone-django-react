import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import '../css/Mainpage.css';
import Header from "./Header";
import All from "./All";
import Love from "./Love";
import Action from "./Action";
import Webseries from "./Webseries";
import Moviedetails from "./Moviedetails";
import Playvideo from "./Playvideo";
import Addfilm from "./Addfilm";
import Modifyfilm from "./Modifyfilm";
import axios from "axios";

function Mainpage() {
  const isSuperuser = localStorage.getItem("isSuperuser") === 'true';
  const [allMovies, setAllMovies] = useState([]); // full dataset
  const [movies, setMovies] = useState([]);       // display dataset
  const BASE_HOST = window.location.hostname.includes("127.0.0.1") || window.location.hostname.includes("localhost") 
    ? "http://127.0.0.1:8000/mainapp" 
    : "https://netflix-clone-backend-1-4ynr.onrender.com/mainapp";

  useEffect(() => {
    axios.get(`${BASE_HOST}/show/`)
      .then(resp => {
        setAllMovies(resp.data);
        setMovies(resp.data);
      })
      .catch(() => {
        setAllMovies([]);
        setMovies([]);
      });
  }, [BASE_HOST]);

  return (
    <main className="mainpage">
      {/* Pass allMovies & setMovies to Header */}
      <Header allMovies={allMovies} setMovies={setMovies} />

      <div className="page">
        <Routes>
          <Route index element={<All movies={movies} />} />
          <Route path="all" element={<All movies={movies} />} />
          <Route path="love" element={<Love movies={movies} />} />
          <Route path="action" element={<Action movies={movies} />} />
          <Route path="webseries" element={<Webseries movies={movies} />} />
          <Route path="moviedetails" element={<Moviedetails movies={movies} allMovies={allMovies} setMovies={setMovies} />} />
          <Route path="playvideo" element={<Playvideo />} />

          <Route
            path="add"
            element={isSuperuser ? <Addfilm /> : <Navigate to="/app" />}
          />
          <Route
            path="modify"
            element={isSuperuser ? <Modifyfilm /> : <Navigate to="/app" />}
          />
          <Route
            path="modify/:movieid"
            element={isSuperuser ? <Modifyfilm /> : <Navigate to="/app" />}
          />
        </Routes>
      </div>
    </main>
  );
}

export default Mainpage;
