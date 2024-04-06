import React, { useContext } from "react";
import "./App.css";
import UserContext from "./context/UserContext";
import MasterLayout from "./components/MasterLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile";
import Patients from "./components/Patients/Patients";
import Complaints from "./components/Complaints";
import AdminLayout from "./components/Doctor/AdminLayout";
import About from "./components/About";
import Services from "./components/Services";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Error404 from "./components/Error404";
import AddAssistant from "./components/Assistant/AddAssistant";
import AddPatient from "./components/Patients/AddPatient";

function App() {
  const { token, role } = useContext(UserContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route path="/" element={<Home />} />
          {token ? null : <Route path="/register" element={<Register />} />}

          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>
        <Route path={`/${role ? role.toLowerCase() : null}`} element={<AdminLayout />}>
          {token && (
            <>
              <Route path={`/${role.toLowerCase()}/dashboard`} element={<Dashboard />} />
              <Route path={`/${role.toLowerCase()}/profile`} element={<Profile />} />
              <Route path={`/${role.toLowerCase()}/addAssistant`} element={<AddAssistant />} />
              <Route path={`/${role.toLowerCase()}/addPatient`} element={<AddPatient />} />
              <Route path={`/${role.toLowerCase()}/complaints`} element={<Complaints />} />
              <Route path={`/${role.toLowerCase()}/patients`} element={<Patients />} />
            </>
          )}
        </Route>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
