import { useNavigate } from 'react-router-dom';
import '../css/Logout.css';
import { useEffect, useState } from 'react';

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
        navigate('/'); // navigate to login or homepage
    }

    const goBackToAll = () => {
        navigate('/app/all'); // navigate to All movies page
    }

    return (
        <div className='log'>
            <h2>Hello! {username}</h2>
            <button onClick={logout}>Logout</button>
            <button onClick={goBackToAll}>Back</button>
        </div>
    );
}

export default Logout;
