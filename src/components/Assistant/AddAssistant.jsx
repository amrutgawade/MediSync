import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { axiosInstance } from "../Utility/axiosApiConfig";
const hospitals = [
  { name: "Gharda Hospitals" },
  { name: "D.Y.Patil Hospitals" },
  { name: "Apple Hospitals" },
  { name: "Swastik Hospital" },
  { name: "Morya Hospital" },
  { name: "Ganga Hospital" },
  { name: "Siddhivinayak Hospital" },
  { name: "Pushpa Surgical Hospital" },
  { name: "Gandhi Care Hospital" },
  { name: "Life Line Hospital" },
  { name: "Sai Hospital" },
  { name: "JaiHind Hospital" },
  { name: "JijaMata Hospital" },
  { name: "Vivekanand Hospital" },
  { name: "Asha Hospital" },
];
function AddAssistant() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const inputChangeHandler = (id, value) => {
    if (id === "firstName") {
      setFirstName(value);
    } else if (id === "lastName") {
      setLastName(value);
    } else if (id === "gender") {
      setGender(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "mobile") {
      setMobile(value);
    } else if (id === "hospitalName") {
      setHospitalName(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const validationHandler = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      toast.error("Password didn't matched");
      return false;
    }
  };

  const addAssistantHandler = async () => {
    if (validationHandler()) {
      const addAssistant = {
        first_name: firstName,
        last_name: lastName,
        email,
        mobile_No: Number(mobile),
        gender,
        hospital: hospitalName,
        password,
      };
      console.log(addAssistant);
      const response = await axiosInstance
        .post("http://localhost:8081/api/doctor/addassistant", addAssistant)
        .then((res) => {
          toast.success("Assistant Added");
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobile("");
          setGender("");
          setHospitalName("");
          setPassword("");
          setConfirmPassword("");
          setPasswordVisible("");
          setConfirmPasswordVisible("");
        })
        .catch((err) => {
          // console.log(err);
          try {
            // console.log(err.response.data.message);
            if (
              err.response.data.message ==
              "Email already exist for another user"
            ) {
              toast.error("User Already Exists");
            }
          } catch (error) {
            toast.error("Server Error");
          }
        //   toast.error("Couldn't Add Assistant");
        });
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0">
      <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">
        Add Assistant
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-9">
        <div className="flex flex-col h-fit border border-indigo-100 bg-white shadow">
          <h3 className="border-b py-4 px-7 text-lg font-medium">
            Assistant Information
          </h3>
          <div className="flex flex-col gap-5 p-7">
            <div className="grid grid-flow-col grid-col-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block mb-3 text-black">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                  placeholder="First Name"
                  onChange={(e) =>
                    inputChangeHandler("firstName", e.target.value)
                  }
                  value={firstName}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-3 text-black">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                  placeholder="Last Name"
                  onChange={(e) =>
                    inputChangeHandler("lastName", e.target.value)
                  }
                  value={lastName}
                />
              </div>
              <div>
                <label htmlFor="Email" className="block mb-3 text-black">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                  placeholder="Email"
                  onChange={(e) => inputChangeHandler("email", e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div>
              <label htmlFor="Gender" className="block mb-3 text-black">
                Gender
              </label>
              <select
                onChange={(e) => inputChangeHandler("gender", e.target.value)}
                value={gender}
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="Gender" className="block mb-3 text-black">
                Hospital Name
              </label>
              <select
                onChange={(e) =>
                  inputChangeHandler("hospitalName", e.target.value)
                }
                value={hospitalName}
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
              >
                <option value="">Select Hospital</option>
                {hospitals.map((item, idx) => (
                  <option key={idx} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="Mobile" className="block mb-3 text-black">
                Mobile
              </label>
              <input
                type="text"
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                placeholder="Mobile number"
                onChange={(e) => inputChangeHandler("mobile", e.target.value)}
                value={mobile}
              />
            </div>

            <div className="relative">
              <label htmlFor="Name" className="block mb-3 text-black">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                placeholder="Enter Password"
                onChange={(e) => inputChangeHandler("password", e.target.value)}
                value={password}
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
            <div className="relative">
              <label htmlFor="Name" className="block mb-3 text-black">
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                placeholder="Confirm Password"
                onChange={(e) =>
                  inputChangeHandler("confirmPassword", e.target.value)
                }
                value={confirmPassword}
              />
              {confirmPasswordVisible ? (
                <FaEyeSlash
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="text-xl cursor-pointer absolute top-11 right-3"
                />
              ) : (
                <FaEye
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="text-xl cursor-pointer absolute top-11 right-3"
                />
              )}
            </div>
            <button
              onClick={addAssistantHandler}
              className="px-5 py-3 border-none outline-none text-white rounded bg-indigo-500"
            >
              Add Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAssistant;
