import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";



const Logout =()=>{
    const {setIsLoggedIn, setEmail, setUserId} = useContext(AuthContext);

    useEffect(() =>{
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setEmail("")
        setUserId("")
    }, []);

    return <Navigate to="/login" />;
};

export default Logout;