import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function AdminAvatarMenu({ params }) {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const navigate = useNavigate();
  const auth = params.role.toLowerCase();

  const name = params.user.split(" ");
  const Avatar = name[0].charAt(0) + name[1].charAt(0);

  const navigation = [
    { title: "Dashboard", path: `/${auth}/dashboard` },
    { title: "Profile", path: `/${auth}/profile` },
    { title: "Settings", path: `/${auth}/settings` },
  ];

  const logoutHandler = () => {
    localStorage.clear();
    params.setUser(null);
    params.setToken(null);
    navigate("/");
    toast.success("Logout Successful");
  };

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);
  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button
          ref={profileRef}
          className="hidden w-10 h-10 outline-none bg-red-600 text-white tracking-widest rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2 lg:block"
          onClick={() => setState(!state)}
        >
          {Avatar}
          {/* <img
            src="src\assets\frontend\assets\img\team\team-1.jpg"
            className="w-full h-full rounded-full"
          /> */}
        </button>
      </div>
      <ul
        className={`bg-white top-14 right-0 z-10 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <Link
              className="block text-gray-600 hover:text-gray-900 lg:hover:bg-gray-50 lg:p-3"
              to={item.path}
            >
              {item.title}
            </Link>
          </li>
        ))}
        <button
          onClick={logoutHandler}
          className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:bg-gray-50 lg:p-3"
        >
          Logout
        </button>
      </ul>
    </div>
  );
}

export default AdminAvatarMenu;
