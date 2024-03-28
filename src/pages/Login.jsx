import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { serverErrorCheck } from "../helpers/error.helper";
const Login =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed,setLoginFailed] =useState(false);
    const {setIsLoggedIn, setEmail:setEmailContext,setUserId} = useContext(AuthContext);
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
      });

    async function onSubmit() {
        setLoginFailed(false);
        const loginFormObj = { email, password }
        const response = await fetch(import.meta.env.VITE_API_URL + "/login",{
            method:"POST",
            body: JSON.stringify(loginFormObj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status==200){
            const json = await response.json();
            localStorage.setItem("jwt",json.data.token);
            setIsLoggedIn(true);
            setEmailContext(json.data.email)
            setUserId(json.data.userId)
            navigate("/");
            return
        }

        if (response.status==400)
        {
            const json = await response.json();
            const erorrs = {};
            if (json.errors?.email) {
                erorrs.email = json.errors.email[0];
            }
            if (json.errors?.password) {
                erorrs.password = json.errors.password[0];
            }
            setFormErrors(erorrs);

        }

        if (response.status==401){
            setLoginFailed(true);
            return;
        }

        await serverErrorCheck(response);
        
    }   

    return <div>
        <div className="row">
  <div className="col">
    <h1>Login</h1>
  </div>
</div>
<div className="row">
  <div className="col">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className={
              !formErrors.email ? "form-control" : "form-control is-invalid"
            } />
     {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
  </div>
</div>
<div className="row">
  <div className="col">
    <label htmlFor="inputPassword5" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="inputPassword5" className={
              !formErrors.password ? "form-control" : "form-control is-invalid"
            } />
            {formErrors.password && (
            <div className="invalid-feedback">{formErrors.password}</div>
          )}
  </div>
</div>
<div className="row mt-3 mb-3">
  <div className="col">
    <button onClick={onSubmit} className="btn btn-primary w-100">Login</button>
  </div>
</div>
{loginFailed &&(
    <div className="row">
    <div className="col">
      <div className="alert alert-danger" role="alert">
        Invalid login
      </div>
    </div>
  </div>
)}
    </div>;
};

export default Login;