import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {


  return (
    <>
    <Nav/>
    <main className="container">
    <Outlet/>
    </main>
    <ToastContainer />

    </>
  );
}

export default App
