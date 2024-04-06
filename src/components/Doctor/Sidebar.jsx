import React, { useContext, useState } from "react";
import { FaSquarePollVertical } from "react-icons/fa6";
import { FaChevronCircleRight } from "react-icons/fa";

import {
  HiOutlineAnnotation,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineQuestionMarkCircle,
  HiOutlineUserAdd,
  HiOutlineUserCircle,
  HiOutlineUsers,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Sidebar() {
  const { setUser, setToken, role } = useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = role.toLowerCase();

  const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "5%" },
  };

  const DASHBOARD_SIDEBAR_LINKS = [
    {
      key: "dashboard",
      label: "Dashboard",
      path: `/${auth}/dashboard`,
      icon: <HiOutlineViewGrid />,
    },
    {
      key: "profile",
      label: "Profile",
      path: `/${auth}/profile`,
      icon: <HiOutlineUserCircle />,
    },
    // {
    //   key: "addAssistant",
    //   label: "Add Assistant",
    //   path: `/${auth}/addAssistant`,
    //   icon: <HiOutlineUserAdd />,
    // },
    {
      key: "patients",
      label: "Patients",
      path: `/${auth}/patients`,
      icon: <HiOutlineUsers />,
    },
    {
      key: "complaints",
      label: "Complaints",
      path: `/${auth}/complaints`,
      icon: <HiOutlineAnnotation />,
    },
  ];
  const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
      key: "settings",
      label: "Settings",
      path: "/admin/settings",
      icon: <HiOutlineCog />,
    },
    {
      key: "support",
      label: "Help & Support",
      path: "/admin/support",
      icon: <HiOutlineQuestionMarkCircle />,
    },
  ];

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    navigate("/");
    toast.success("Logout Successful");
  };
  return (
    <motion.aside
      animate={isExpanded ? "expanded" : "nonExpanded"}
      variants={variants}
      className="hidden md:flex flex-col p-2 h-screen w-[20%] bg-slate-900 text-white leading-5 relative"
    >
      <FaChevronCircleRight
        onClick={() => setIsExpanded(!isExpanded)}
        className={
          "w-7 h-7 rounded-full bg-slate-700 absolute border-4 border-slate-900 top-7 -right-[0.6rem] z-20 ease-linear duration-500" +
          (isExpanded ? " rotate-180" : " rotate-0")
        }
      />
      <Link
        to={"/admin"}
        className={
          "flex items-center gap-x-3 py-3" +
          (isExpanded ? " px-6" : " justify-center px-0")
        }
      >
        <FaSquarePollVertical fontSize={35} className="text-green-500" />
        {isExpanded && (
          <span className="text-xl text-green-500 font-bold">
            Medi<span className="text-white">Sync</span>
          </span>
        )}
      </Link>
      <div className="flex-1 inline-flex flex-col gap-1.5 mt-6">
        <h3
          className={
            "mb-2 text-sm font-semibold text-slate-500" +
            (isExpanded ? " ml-6" : " mx-auto")
          }
        >
          MENU
        </h3>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <Link
            to={item.path}
            key={item.key}
            className={
              `${
                pathname === item.path ? "bg-slate-800" : "text-slate-400"
              } flex items-center gap-6 py-2 rounded hover:bg-slate-800 hover:text-white active:bg-slate-700 text-base` +
              (isExpanded ? " px-6" : " justify-center px-0")
            }
          >
            <span className="text-2xl">{item.icon}</span>
            {isExpanded && <span>{item.label}</span>}
          </Link>
        ))}
        {role == "Doctor" && (
          <Link
            to={`/${auth}/addAssistant`}
            className={
              `${
                pathname === `/${auth}/addAssistant`
                  ? "bg-slate-800"
                  : "text-slate-400"
              } flex items-center gap-6 py-2 rounded hover:bg-slate-800 hover:text-white active:bg-slate-700 text-base` +
              (isExpanded ? " px-6" : " justify-center px-0")
            }
          >
            <span className="text-2xl">
              <HiOutlineUserAdd />
            </span>
            {isExpanded && <span>Add Assistant</span>}
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-600">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <Link
            to={item.path}
            key={item.key}
            className={
              `${
                pathname === item.path ? "bg-slate-800" : "text-slate-400"
              } flex items-center gap-6 py-2 rounded hover:bg-slate-800 hover:text-white active:bg-slate-700 text-base` +
              (isExpanded ? " px-6" : " justify-center px-0")
            }
          >
            <span className="text-2xl">{item.icon}</span>
            {isExpanded && <span>{item.label}</span>}
          </Link>
        ))}
        <button
          onClick={logoutHandler}
          className={
            "flex items-center gap-6 py-2 text-red-500 rounded border-none hover:bg-slate-800 active:bg-slate-700 text-base" +
            (isExpanded ? " px-6" : " justify-center px-0")
          }
        >
          <span className="text-2xl">
            <HiOutlineLogout />
          </span>

          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
