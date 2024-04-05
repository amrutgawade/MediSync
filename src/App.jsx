import React, { useContext } from "react";
import "./App.css";
import UserContext from "./context/UserContext";
import MasterLayout from "./components/MasterLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Services from "./components/Services";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Error404 from "./components/Error404";

function App() {
  const { token, role } = useContext(UserContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route path="/" element={<Home />} />
          {token ? null : <Route path="/register" element={<Register />} />}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
