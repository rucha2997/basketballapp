import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export const Nav = () => {

    const [showMenu, setShowMenu] = useState(false);
    const { isLoggedIn }  = useContext(AuthContext);

    function toggleMenu(){

        setShowMenu((prev)=>{
            return !prev;
        });

    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">Basketball App</NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={showMenu?"navbar-collapse": "collapse navbar-collapse"} id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">About</NavLink>  
          </li>
          {!isLoggedIn && (<>
            <li className="nav-item">
            <NavLink to="/register" className="nav-link">Register</NavLink>  
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">Login</NavLink>  
          </li>
          </>)}
          {isLoggedIn && (<>
            <li className="nav-item">
                <NavLink to="/admin" className="nav-link">Admin</NavLink>  
            </li>
            <li className="nav-item">
                <NavLink to="/admin/addgame" className="nav-link">New Game</NavLink>  
            </li>
            <li className="nav-item">
                <NavLink to="/logout" className="nav-link">Logout</NavLink>  
          </li>
          </>)}    
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Nav;
