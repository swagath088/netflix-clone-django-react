import { useRef } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
    const navigate = useNavigate();
    const name = useRef();
    const pwd = useRef();
    const BASE_URL = "https://netflix-clone-backend-1-4ynr.onrender.com";

    const login = async () => {
        const username = name.current.value.trim();
        const password = pwd.current.value.trim();

        if (!username || !password) {
            alert("Please enter both username and password");
            return;
        }

        const data = { username, password };
        const post_url = `${BASE_URL}/mainapp/login/`;

        try {
            console.log("Sending login data:", data);
            const resp = await axios.post(post_url, data, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("Response:", resp.data);

            const userData = {
                username: resp.data.username,
                is_superuser: resp.data.is_superuser,
                token: resp.data.token
            };

            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isSuperuser", resp.data.is_superuser ? "true" : "false");

            setUser(userData);
            navigate('/app');
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err);
            alert("Login failed: " + (err.response?.data?.non_field_errors || err.message));
        }
    };

    return (
        <div className='mainone'>
            <div className="loginn">
                <h1>Netflix</h1>
                <h3>Login</h3>
                <input type="text" placeholder='Username' ref={name} /><br />
                <input type="password" placeholder='Password' ref={pwd} /><br />
                <button onClick={login}>Login</button><br />
                <a href="" className='forgot'>Forgot password</a>
                <hr />
                <p>OR</p>
                <h5>New to Netflix?</h5>
                <Link to='signup' className='link'>REGISTER</Link>
            </div>
        </div>
    );
}

export default Login;
