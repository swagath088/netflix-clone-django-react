import { useRef, useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';

function Signup() {
    const uname = useRef();
    const pwd = useRef();
    const mail = useRef();
    const [item, setItem] = useState('');
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";

    const register = () => {
        // Basic validation
        if (!uname.current.value || !pwd.current.value || !mail.current.value) {
            setItem("Please fill all fields!");
            return;
        }

        setLoading(true);
        setItem(''); // reset message

        const data = {
            username: uname.current.value,
            password: pwd.current.value,
            email: mail.current.value
        };

        const post_url = `${BASE_URL}/mainapp/register/`;

        axios.post(post_url, data)
            .then((resp) => {
                console.log(resp);
                setItem('Successfully registered! Login now.');

                // Clear inputs
                uname.current.value = '';
                pwd.current.value = '';
                mail.current.value = '';
            })
            .catch((err) => {
                console.log(err);
                setItem('Error! Please try again.');

                // Clear inputs
                uname.current.value = '';
                pwd.current.value = '';
                mail.current.value = '';
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className='login'>
            <div className='main'>
                <h1 className='netflix'>NETFLIX</h1>
                <h2 className='head'>REGISTER</h2><br /><br />
                <input type="text" className='one' placeholder='Username' ref={uname} />
                <input type="password" className='two' placeholder='Password' ref={pwd} />
                <input type="email" className='email' placeholder='email@gmail.com' ref={mail} />
                
                <button onClick={register} disabled={loading}>
                    {loading ? "Please wait... loading..." : "Register"}
                </button><br />

                <hr className='line' />
                <h3 className='or'>OR</h3>
                <label className='sign'>
                    <p className="no-acc-text"><h4>Already have an account?</h4></p>
                    <button className="login-btn" onClick={() => window.location.href = '/'}>Login</button>
                </label>

                <p className='p'>This page is protected by Google reCAPTCHA to ensure <br />you're not a bot.</p><br /><br />
                
                <p className='item' style={{color: item.includes('Error') || item.includes('fill') ? 'red' : 'green'}}>
                    {item}
                </p>
            </div>
        </div>
    );
}

export default Signup;
