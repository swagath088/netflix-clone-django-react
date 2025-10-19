import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Header.css";

function Header({ allMovies }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (!query) return alert("Enter movie ID or Name");

    const filtered = allMovies.filter(
      (m) =>
        m.movie_name.toLowerCase().includes(query) ||
        m.movie_no.toString() === query
    );

    if (filtered.length === 0) return alert("No movies found");

    // Navigate to Moviedetails with filtered movies
    navigate("/app/moviedetails", { state: { filteredMovies: filtered } });
    setSearchText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="heading">
      <button className="image">
        <img src="/images/netflixlogo.jpg" alt="Netflix" />
      </button>

      <input
        type="text"
        placeholder="Search by movie ID or Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        className="header-search-input"
      />

      <button className="search" onClick={handleSearch}>
        <img src="/images/searchlogo.jpg" alt="Search" />
      </button>

      <button className="logo" onClick={() => navigate("/Logout")}>
        <img src="/images/you.jpg" alt="Logout" />
      </button>
    </header>
  );
}

export default Header;
