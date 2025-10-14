
import Login from './Login';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';

function Signup(){
    let uname=useRef();
    let pwd=useRef();
    let mail=useRef();
    const BASE_URL = import.meta.env.VITE_API_URL || "https://netflix-clone-backend-1-4ynr.onrender.com";
    let [item,setItem]=useState('');
    let register=()=>{
        let data={
            'username':uname.current.value,
            'password':pwd.current.value,
            'email':mail.current.value
        }
        let post_url = `${BASE_URL}/mainapp/register/`;
        axios.post(post_url,data)
        .then((resp)=>{
            console.log(resp)
            setItem('successfully registered login now !')

        uname.current.value = '';
        pwd.current.value = '';
        mail.current.value = '';
        })
        .catch((err)=>{
            console.log(err)
            setItem('error please try again!')

        uname.current.value = '';
        pwd.current.value = '';
        mail.current.value = '';
        })
    }
    return(
         <div className='login'>
            <div className='main'>
                <h1 className='netflix'>NETFLIX</h1>
                <h2 className='head'>REGISTER</h2><br /><br />
                <input type="text" name="" id="" className='one'  placeholder='Username' ref={uname}/><br />
                <input type="password" name="" id="" className='two' placeholder='password' ref={pwd} /><br /><br />
                <input type="email" name="" id=""  className='email ' placeholder='email@gmail.com' ref={mail}/>
                <button onClick={register}>Register</button><br /><br />
                <hr  className='line'/><br /><br />
                <h3 className='or'>OR</h3 ><br /><br />
                <label htmlFor="" className='sign'>
                    <h4>Already have a account?</h4>
                    <Link to='/'>Login</Link>
                </label>
                <p className='p'>This page is protected by Google reCAPTCHA to ensure <br />you're not a bot.</p><br /><br />
                <p className='item'>{item}</p>
            </div>
        </div>
    );
}

export default Signup;
