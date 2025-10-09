import { Navigate } from "react-router-dom"
function protectedroute({children}){
        let token=localStorage.getItem('token');
        if(!token){
           return <Navigate to="/" />; 
        }
        else{
            return children
        }
}
export default protectedroute;