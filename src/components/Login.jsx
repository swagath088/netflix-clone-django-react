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
        const data = {
            username: name.current.value,
            password: pwd.current.value
        };

        const post_url = `${BASE_URL}/mainapp/login/`;

        try {
            const resp = await axios.post(post_url, data, {
                headers: { "Content-Type": "application/json" }
            });

            console.log("✅ Login successful:", resp);

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
            console.error("❌ Login Error:", err);

            // 🔍 Extract readable message
            if (err.response) {
                // Error from backend
                console.error("Server Response:", err.response.data);
                alert(`Login failed: ${err.response.data.error || 'Bad Request (400)'}`);
            } else if (err.request) {
                // Request was made but no response
                console.error("No response from server:", err.request);
                alert("No response from backend. It might be down or blocked.");
            } else {
                // Something else went wrong
                console.error("Error setting up request:", err.message);
                alert(`Unexpected error: ${err.message}`);
            }
        }
    };

    return (
        <div className='mainone'>
            <div className="loginn">
                <h1>Netflix</h1><br /><br />
                <h3>Login</h3><br />
                <input type="text" placeholder='Username' ref={name} /><br /><br />
                <input type="password" placeholder='Password' ref={pwd} /><br />
                <button onClick={login}>Login</button><br />
                <a href="" className='forgot'>Forgot password?</a>
                <hr /><br />
                <p>OR</p>
                <h5>New to Netflix?</h5>
                <Link to='signup' className='link'>REGISTER</Link>
            </div>
        </div>
    );
}

export default Login;
