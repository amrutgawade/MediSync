import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserContext from "../context/UserContext";
import AvatarMenu from "./AvatarMenu";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function Navbar() {
  const { pathname } = useLocation();
  const { openModal, setOpenModal } = useContext(UserContext);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 0,
    p: 4,
  };

  const navLinks = [
    { link: "/", title: "Home" },
    { link: "/about", title: "About US" },
    { link: "/services", title: "Services" },
  ];
  return (
    <header>
      <nav className="h-8 bg-green-300 flex flex-row items-center justify-start space-x-4 px-16">
        <div className="font-semibold flex flex-row justify-center items-center space-x-2"><FaEnvelope /><p>help@medisync.com</p></div>
        <div className="font-semibold flex flex-row justify-center items-center space-x-2"><FaPhone /><p>+91 987654321</p></div>
      </nav>
    <div className="h-16 shadow-md bg-white flex items-center justify-between px-16">
      <Link to={"/"} className="font-extrabold text-2xl">
        <span className="text-green-500">Medi</span>Sync
      </Link>
      <div className="flex flex-row space-x-8 justify-center items-center">
        {navLinks.map((item, idx) => (
          <Link
          className={`${
            pathname == item.link ? "border-b-2 border-b-green-500" : ""
          } px-1 py-2 hover:border-b-2 hover:border-b-green-500`}
          key={idx}
          to={item.link}
          >
            {item.title}
          </Link>
        ))}
        <button
          onClick={handleOpen}
          className="block text-center lg:w-auto w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
          >
          Login
        </button>
        {/* <AvatarMenu /> */}
      </div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <h1 className="text-center font-medium text-3xl">Login</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col justify-center mt-4 items-center space-y-8">
              <input
                className="py-3 px-4 outline-none border hover:border-green-500 active:border-green-500 rounded"
                type="text"
                placeholder="username"
                />
              <input
                className="py-3 px-4 outline-none border hover:border-green-500 active:border-green-500 rounded"
                type="password"
                placeholder="password"
                />
              <input
                className="block text-center lg:w-auto w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
                type="submit"
                value="Login"
                />
            </div>
          </form>
          <p className="text-center mt-4">
            Don't have an Account?
            <Link
              onClick={() => setOpenModal(false)}
              className="text-green-500"
              to={"/register"}
              >
              {" "}
              Register
            </Link>
          </p>
        </Box>
      </Modal>
    </div>
              </header>
  );
}

export default Navbar;
