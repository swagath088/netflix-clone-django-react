import { Route, Routes } from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Protectedroute from "./components/Protectedroute";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Mainpage from "./components/Mainpage";
import Sidebar from "./components/Sidebar";
import All from "./components/All";
import Love from "./components/Love";
import Logout from "./components/Logout";
import { useState, useEffect } from "react";

import './App.css';
function App(){
  let [user,setUser]=useState(null);
  useEffect(() => {
  try {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // now this works
    }
  } catch (error) {
    console.log("Failed to parse user from localStorage:", error);
    setUser(null);
  }
}, []);
  return(
    <div>
     <Routes>
       <Route path='signup' element={<Signup/>} />
        <Route path="/" element={<Login setUser={setUser} />} />

        <Route path='/Logout' element={<Logout />} />

        <Route path="app/*" element={
          <Protectedroute>
          <div className="container">
            <div className="heading">
              <Header />
            </div>
            <div className="sidebar">
             <Sidebar user={user} />
            </div>
            <div className="mainpage">
              <Mainpage />
            </div>
            <div className="foot">
              <Footer />
            </div>
          </div>
          </Protectedroute> } />
      </Routes>
    </div>
  );
}
export default App;