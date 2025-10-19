import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Logout.css';

function Logout() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      setUsername(userObj.username);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const goBack = () => {
    navigate('/app/all'); // 👈 change this to your desired route if needed
  };

  return (
    <div className="logout-container">
      <h2>Hello, {username || 'User'} 👋</h2>
      <div className="logout-buttons">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
        <button className="back-btn" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Logout;
