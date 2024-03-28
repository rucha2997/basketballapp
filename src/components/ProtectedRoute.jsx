import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    
    const {isLoggedIn} =useContext(AuthContext);

    if(!isLoggedIn){
        return <Navigate replace to="/login" />;
    }
    // if(isLoggedIn){
    //     return <Navigate replace to="/admin/addgame" />;
    // }

    return children;
}

export default ProtectedRoute;