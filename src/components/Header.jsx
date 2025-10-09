import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { useState } from 'react';

function Header(){
    let navigate=useNavigate();
    let [searchid,setsearchid]=useState('');
    let value=()=>{
        navigate('/app/details/'+searchid)
    }
    let val=()=>{
        navigate('/Logout')
    }
    return(
        <header className="heading">
            <button className="image"><img src="/images/netflixlogo.jpg" alt="" /></button>
            <input type="text" name="" id="" placeholder='search movie' onChange={(e)=>setsearchid(e.target.value)} />
            <button className="search"><img src="/images/searchlogo.jpg" alt=""  onClick={value}/></button>
            <button className="logo"  onClick={val}><img src="/images/you.jpg" alt=""/></button>
        </header>
    );
}
export default Header;