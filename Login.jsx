// src/components/Login.jsx
import { useRef } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
    const navigate = useNavigate();
    const name = useRef();
    const pwd = useRef();
    const BASE_URL = import.meta.env.VITE_API_URL;

    const login = () => {
        const data = {
            username: name.current.value,
            password: pwd.current.value
        };

        axios.post(`${BASE_URL}/mainapp/login/`, data, {
            headers: { "Content-Type": "application/json" }
        })
        .then(resp => {
            const userData = {
                username: resp.data.username,
                is_superuser: resp.data.is_superuser,
                token: resp.data.token
            };
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isSuperuser", resp.data.is_superuser ? "true" : "false");
            navigate('/app');
            setUser(userData);
        })
        .catch(err => console.log(err));
        console.log("BASE_URL:", BASE_URL); // <--- Add this line temporarily
    };

    return (
        <div className='mainone'>
            <div className="loginn">
                <h1>Netflix</h1>
                <h3>Login</h3>
                <input type="text" placeholder='Username' ref={name} /><br />
                <input type="password" placeholder='Password' ref={pwd} /><br />
                <button onClick={login}>Login</button><br />
                <Link to='signup'>Register</Link>
            </div>
        </div>
    );
}

export default Login;
