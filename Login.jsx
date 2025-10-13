import { useRef } from 'react';
import '../css/Login.css'
import {  Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import App from '../App';
function Login({setUser}){
    let navigate=useNavigate();
    let name=useRef();
    let pwd=useRef();
    let login=()=>{
        let data={
            'username':name.current.value,
            'password':pwd.current.value
        }
        let post_url='https://netflix-clone-backend-1-4ynr.onrender.com/mainapp/login/'
        axios.post(post_url,data, {
    headers: {
        "Content-Type": "application/json"
    }
})
        .then((resp)=>{
            console.log(resp)
            const userData = {
            username: resp.data.username,        
            is_superuser: resp.data.is_superuser, 
            token: resp.data.token            
            };

            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", JSON.stringify(userData)); 
            localStorage.setItem("isSuperuser", resp.data.is_superuser ? "true" : "false");
            navigate('/app')
            setUser(userData);
        })
        .catch((err)=>{
            console.log(err)
        }
        )
    }
    return (
        <div className='mainone'>
            <div className="loginn">
                <h1>Netflix</h1><br /><br />
                <h3>Login</h3><br />
                <input type="text" name="" id="" placeholder='Username' ref={name}/><br /><br />
                <input type="password" name="" id="" placeholder='password' ref={pwd}/><br />
                <button onClick={login}>Login</button><br />
                <a href="" className='forgot'>forgot password</a>
                <hr /><br />
                <p>OR</p>
                <h5>New to netflix?</h5>
           <Link to='signup' className='link'>REGISTER</Link>
            </div>


        </div>
        
    );
}
export default Login;