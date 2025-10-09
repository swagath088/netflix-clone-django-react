import { useNavigate } from 'react-router-dom';
import '../css/Logout.css';
import { useEffect, useState } from 'react';

function Logout(){
    let navigate=useNavigate();
    let [username, setUsername] = useState('');

    useEffect(() => {
  let user = localStorage.getItem('user'); 
  if (user) {
    let userObj = JSON.parse(user); 
    setUsername(userObj.username);  
  }
}, []);
    let logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }
    return(
        <div className='log'>
            <h2>hello!{'    '}{username}</h2>
            <button onClick={logout}>logout</button>
        </div>
    );
}
export default Logout;