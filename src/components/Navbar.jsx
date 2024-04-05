import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const navLinks = [
    { link: "/", title: "Home" },
    { link: "/about", title: "About US" },
    { link: "/services", title: "Services" },
  ];
  return (
    <header className="h-16 shadow-md bg-white flex items-center justify-between px-16">
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
        <button className="block text-center lg:w-auto w-full px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white">
          Login
        </button>
      </div>
    </header>
  );
}

export default Navbar;
