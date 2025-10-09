import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Modifymovie.css";

function Modifymovie() {
  const [movie, setMovie] = useState({
    movie_no: "",
    movie_name: "",
    movie_desc: "",
    movie_rating: "",
    movie_image: "",
  });
  const [searchId, setSearchId] = useState(""); // For search input
  const { movieid } = useParams();

  // Common function to fetch movie data
  const getMovie = (idOrName) => {
    let url = `http://127.0.0.1:8000/mainapp/get/${idOrName}`;
    axios
      .get(url)
      .then((resp) => {
        let current = Array.isArray(resp.data) ? resp.data[0] : resp.data;
        if (current) {
          setMovie({
            movie_no: current.movie_no || "",
            movie_name: current.movie_name || "",
            movie_desc: current.movie_desc || "",
            movie_rating: current.movie_rating || "",
            movie_image: current.movie_image || "",
          });
        } else {
          alert("Movie not found!");
        }
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        alert("No movie found with that ID or name!");
      });
  };

  // Fetch movie details when route param exists
  useEffect(() => {
    if (movieid) {
      getMovie(movieid);
    }
  }, [movieid]);

  // Update input values
  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  // Update movie details
  const update = () => {
    let url = `http://127.0.0.1:8000/mainapp/put/${movieid}`;
    let payload = {
      movie_no: movie.movie_no ? parseInt(movie.movie_no) : 0,
      movie_name: movie.movie_name,
      movie_desc: movie.movie_desc,
      movie_rating: movie.movie_rating ? parseFloat(movie.movie_rating) : 0,
      movie_image: movie.movie_image,
    };
    axios
      .put(url, payload)
      .then((resp) => {
        alert("Movie updated successfully!");
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // Delete movie
  const deleteMovie = () => {
    let url = `http://127.0.0.1:8000/mainapp/delete/${movieid}`;
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios
        .delete(url)
        .then(() => {
          alert("Movie deleted successfully");
          setMovie({
            movie_no: "",
            movie_name: "",
            movie_desc: "",
            movie_rating: "",
            movie_image: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchId.trim() !== "") {
      getMovie(searchId);
    } else {
      alert("Please enter a movie ID or name to search.");
    }
  };

  // Trigger search when pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="modify">
      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search by movie ID or name"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        onKeyDown={handleKeyPress} // Enter triggers search
        className="movie"
      />
      <button className="searchmovie" onClick={handleSearch}>
        <img src="/images/searchlogo.jpg" alt="Search" />
      </button>

      {/* 📝 Movie Details */}
      <input
        type="number"
        name="movie_no"
        value={movie.movie_no}
        onChange={handleChange}
        placeholder="movie_no"
        className="desc"
      />
      <br />
      <input
        type="text"
        name="movie_name"
        value={movie.movie_name}
        onChange={handleChange}
        placeholder="movie_name"
        className="desc"
      />
      <br />
      <input
        type="text"
        name="movie_desc"
        value={movie.movie_desc}
        onChange={handleChange}
        placeholder="movie_desc"
        className="desc"
      />
      <br />
      <input
        type="number"
        name="movie_rating"
        value={movie.movie_rating}
        onChange={handleChange}
        placeholder="movie_rating"
        className="desc"
      />
      <br />

      {/* 🎬 Movie Image */}
      {movie.movie_image && (
        <img
          src={`http://127.0.0.1:8000${movie.movie_image}`}
          alt={movie.movie_name}
          style={{ width: "150px", height: "auto" }}
          className="movieimg"
        />
      )}

      {/* ⚙️ Action Buttons */}
      <button onClick={update} className="update">
        Update Movie
      </button>
      <br />
      <br />
      <button onClick={deleteMovie} className="delete">
        Delete
      </button>
    </div>
  );
}

export default Modifymovie;
