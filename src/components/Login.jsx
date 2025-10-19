import { useRef, useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
    const navigate = useNavigate();
    const name = useRef();
    const pwd = useRef();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

    const login = () => {
        setLoading(true);
        setErrorMsg(''); // reset error
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
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                setErrorMsg("Invalid credentials");
            } else {
                setErrorMsg("Something went wrong. Try again.");
            }
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className='mainone'>
            <div className="loginn">
                <h1>Netflix</h1>
                <h3>Login</h3>
                <input type="text" placeholder='Username' ref={name} /><br />
                <input type="password" placeholder='Password' ref={pwd} /><br />

                <button className="login-btn" onClick={login} disabled={loading}>
                    {loading ? "Please wait... loading..." : "Login"}
                </button><br />

                {errorMsg && <p style={{color:"red", marginTop:"10px"}}>{errorMsg}</p>}

                <p className="no-acc-text"><h4>Dont have an acc? </h4></p>
                <Link className="register-btn" to='signup'>Register</Link>
            </div>
        </div>
    );
}

export default Login;
