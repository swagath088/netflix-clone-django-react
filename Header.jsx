import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Header.css';

function Header({ allMovies, setMovies }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (!query) return alert("Enter movie ID or Name");

    // Filter movies from full dataset
    const filtered = allMovies.filter(
      m => 
        m.movie_name.toLowerCase().includes(query) || 
        m.movie_no.toString() === query
    );

    if (filtered.length === 0) alert("No movies found");
    setMovies(filtered);

    // Navigate to Moviedetails if not already there
    if (location.pathname !== '/app/moviedetails') {
      navigate('/app/moviedetails');
    }

    setSearchText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleLogout = () => {
    navigate('/Logout');
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

      <button className="logo" onClick={handleLogout}>
        <img src="/images/you.jpg" alt="Logout" />
      </button>
    </header>
  );
}

export default Header;
