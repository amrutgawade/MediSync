import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserContext from "../context/UserContext";
import AvatarMenu from "./AvatarMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function Navbar() {
  const {
    openModal,
    setOpenModal,
    setUser,
    setToken,
    setRole,
    token,
    user,
    role,
  } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputChangeHandler = (id, value) => {
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const loginHandler = async () => {
    await axios
      .post("http://localhost:8081/auth/signin", {
        email,
        password,
      })
      .then(async (res) => {
        const { jwt } = res.data;
        console.log(jwt);
        // Decode JWT token to extract email & authorities
        try {
          const [, payloadBase64] = jwt.split(".");
          const payloadJson = atob(payloadBase64);
          const payload = JSON.parse(payloadJson);
          // console.log("Email:", payload.email);
          console.log("Authorities:", payload.authorities);
          localStorage.setItem("auth", payload.authorities);
          setRole(payload.authorities);
          if (res.data.message == "SignIn Successfull" && res.status == 201) {
            const result = await axios
              .get("http://localhost:8081/api/doctor/profile", {
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                localStorage.setItem(
                  "user",
                  res.data.first_name + " " + res.data.last_name
                );
                setUser(
                  res.data.first_name + " " + res.data.last_name ||
                    localStorage.getItem("user")
                );
                localStorage.setItem("token", jwt);
                setToken(jwt || localStorage.getItem("token"));
                toast.success("Login Success");
                setEmail("");
                setPassword("");
                setOpenModal(false);
                navigate(`/${payload.authorities.toLowerCase()}/dashboard`);
              })
              .catch((err) => {
                console.log(err);
              });
            // console.log(result);
          } else {
            toast.error("Unauthorized Access");
          }
        } catch (error) {
          console.error("Error decoding JWT:", error);
          toast.error("Invalid Username or Password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <header>
      <nav className="h-8 bg-green-300 flex flex-row items-center justify-start space-x-4 px-16">
        <div className="font-semibold flex flex-row justify-center items-center space-x-2">
          <FaEnvelope />
          <p>help@medisync.com</p>
        </div>
        <div className="font-semibold flex flex-row justify-center items-center space-x-2">
          <FaPhone />
          <p>+91 987654321</p>
        </div>
      </nav>
      <div className="h-16 shadow-2xl bg-white flex items-center justify-between px-16">
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
          {token ? (
            <AvatarMenu params={{ user, role, setUser, setToken }} />
          ) : (
            <button
              onClick={handleOpen}
              className="block text-center lg:w-auto w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
            >
              Login
            </button>
          )}
        </div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="text-center font-medium text-3xl">Login</h1>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) => inputChangeHandler("email", e.target.value)}
                  value={email}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="relative">
                <label className="font-medium">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  required
                  onChange={(e) =>
                    inputChangeHandler("password", e.target.value)
                  }
                  value={password}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                />
                {passwordVisible ? (
                  <FaEyeSlash
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="text-xl cursor-pointer absolute top-11 right-3"
                  />
                ) : (
                  <FaEye
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="text-xl cursor-pointer absolute top-11 right-3"
                  />
                )}
              </div>

              <button
                onClick={loginHandler}
                className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150"
              >
                Login
              </button>
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
