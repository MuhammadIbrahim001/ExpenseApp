
import React from "react";
import ls from "local-storage"
import { useNavigate } from 'react-router-dom';


export default  function LogOut () {
    const navigate = useNavigate();
    ls.set("token", "")
    
    
    // window.location.reload();
    React.useEffect(() => {
        
        navigate('/login', { replace: true })
        console.log("hello")
      }, []);
  
    return null;

   
   
}