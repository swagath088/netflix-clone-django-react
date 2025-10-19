import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Moviedetails.css';

function Moviedetails({ movies, allMovies, setMovies }) {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (!query) return alert("Enter movie ID or Name");

    const filtered = allMovies.filter(
      m => 
        m.movie_name.toLowerCase().includes(query) || 
        m.movie_no.toString() === query
    );

    if (filtered.length === 0) alert("No movies found");
    setMovies(filtered);
    setSearchText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="moviedetails-container">
      <div className="moviedetails-searchbar">
        <input
          type="text"
          placeholder="Search by movie ID or Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="moviedetails-input"
        />
        <button onClick={handleSearch} className="moviedetails-button">
          Search
        </button>
      </div>

      <div className="moviedetails-results">
        {movies.length === 0 ? (
          <p className="moviedetails-none">No movies available</p>
        ) : (
          movies.map(movie => (
            <div key={movie.movie_no} className="moviedetails-item">
              <p><strong>Movie No:</strong> {movie.movie_no}</p>
              <p><strong>Name:</strong> {movie.movie_name}</p>
              <p><strong>Description:</strong> {movie.movie_desc}</p>
              <p><strong>Rating:</strong> {movie.movie_rating}</p>
              {movie.movie_image && (
                <img
                  src={movie.movie_image}
                  alt={movie.movie_name}
                  width="200"
                  className="moviedetails-image"
                  onClick={() => navigate('/app/playvideo', { state: { url: movie.movie_video } })}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Moviedetails;
