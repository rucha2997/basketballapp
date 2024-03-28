import React from "react";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Unknown Error!";
  if(error.message){
    message=error.message
  }
  else if(error.status === 404){
    message="Page not found";
  }
  return (
    <>
      <Nav />
      <main className="container">
        <div className="row">
          <div className="col">
            <h1>Error: {message}</h1>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default ErrorPage;