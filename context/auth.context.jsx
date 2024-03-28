import {createContext,useEffect,useState} from "react";

export const AuthContext = createContext();

const AuthProvider =({ children }) => {
    const [isLoggedIn,setIsLoggedIn] =useState(localStorage.getItem('jwt')!=null);
    const [email,setEmail] =useState(localStorage.getItem("email"));
    const [userId,setUserId] = useState(localStorage.getItem("userId"));

    useEffect(() =>{
        localStorage.setItem("email",email)
    },[email]);

    useEffect(() =>{
        localStorage.setItem("userId",userId)
    },[userId]);
    
    return <AuthContext.Provider value ={{ userId,email,setEmail,setUserId,isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};



export default AuthProvider;