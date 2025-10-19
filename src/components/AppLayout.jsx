import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../css/Mainpage.css";

function AppLayout() {
  return (
    <div className="container">
      <div className="heading">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainpage">
        <Outlet /> {/* all nested pages render here */}
      </div>
      <div className="foot">
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
