import { useState } from "react";
import { NavLink } from "react-router-dom";
import { serverErrorCheck } from "../helpers/error.helper";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit() {
    const registerFormObj = { email, password };
    const response = await fetch(import.meta.env.VITE_API_URL + "/users", {
      method: "POST",
      body: JSON.stringify(registerFormObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 201) {
      setRegisterSuccess(true);
    }

    if (response.status == 400) {
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
    await serverErrorCheck(response);
  }

  if (registerSuccess) {
    return (
      <>
        <div className="row">
          <div className="col">
            <h1>Register</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="alert alert-success" role="alert">
              Successfully Register!!! Please{" "}
              <NavLink to="/login">login</NavLink>.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            id="email"
            className={
              !formErrors.email ? "form-control" : "form-control is-invalid"
            }
          />
          {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            id="inputPassword5"
            className={
              !formErrors.password ? "form-control" : "form-control is-invalid"
            }
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && (
            <div className="invalid-feedback">{formErrors.password}</div>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button onClick={onSubmit} className="btn btn-primary w-100">
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;