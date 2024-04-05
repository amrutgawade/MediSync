import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../components/Utility/axiosApiConfig";
import UserContext from "../context/UserContext";

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

const doctor = [
  { qualification: "MD(Gen Medicines)" },
  { qualification: "BDS" },
  { qualification: "MDS" },
  { qualification: "BAMS" },
  { qualification: "MS Surgery" },
  { qualification: "MD(Chest Physician)" },
  { qualification: "DM(Neurology)" },
  { qualification: "M.B.B.S" },
  { qualification: "BUMS" },
  { qualification: "Ph.D." },
  { qualification: "DC" },
  { qualification: "DNP" },
  { qualification: "DMD" },
];

function Profile() {
  const { token } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [qualification, setQualification] = useState("");

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
    } else if (id === "qualification") {
      setQualification(value);
    }
  };

  const updateProfileHandler = async () => {
    const updateUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      qualification,
      hospitalName,
      mobile_no: Number(mobile),
    };
    console.log(updateUser);
    const response = await axiosInstance
      .put("http://localhost:8081/api/doctor/profile/update", updateUser)
      .then((res) => {
        toast.success("Profile Updated");
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Profile Update Failed");
      });
  };

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8081/api/doctor/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    setFirstName(response.data.first_name);
    setLastName(response.data.last_name);
    setGender(response.data.gender);
    setEmail(response.data.email);
    setMobile(response.data.mobile_no);
    setQualification(response.data.qualification);
    setHospitalName(response.data.hospitalName);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0">
      <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">Profile</h2>
      <div className="mt-6 grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col h-fit border border-indigo-100 bg-white shadow">
          <h3 className="border-b py-4 px-7 text-lg font-medium">
            Personal Information
          </h3>
          <div className="flex flex-col gap-5 p-7">
            <div className="flex flex-row gap-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-3 text-black dark:text-white"
                >
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
                <label
                  htmlFor="lastName"
                  className="block mb-3 text-black dark:text-white"
                >
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
            </div>
            <div>
              <label
                htmlFor="Gender"
                className="block mb-3 text-black dark:text-white"
              >
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
              <label
                htmlFor="Name"
                className="block mb-3 text-black dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
                placeholder="Email"
                readOnly
                onChange={(e) => inputChangeHandler("email", e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label
                htmlFor="Gender"
                className="block mb-3 text-black dark:text-white"
              >
                Qualification
              </label>
              <select
                onChange={(e) =>
                  inputChangeHandler("qualification", e.target.value)
                }
                value={qualification}
                className="w-full px-5 py-3 outline-none border bg-indigo-50 rounded"
              >
                <option value="">Select Qualification</option>
                {doctor.map((item, idx) => (
                  <option key={idx} value={item.qualification}>
                    {item.qualification}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="Gender"
                className="block mb-3 text-black dark:text-white"
              >
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
              <label
                htmlFor="Mobile"
                className="block mb-3 text-black dark:text-white"
              >
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
            <button
              onClick={updateProfileHandler}
              className="px-5 py-3 border-none outline-none text-white rounded bg-indigo-500"
            >
              Update Profile
            </button>
          </div>
        </div>
        <div className="flex flex-col h-fit border border-indigo-100 bg-white shadow">
          <h3 className="border-b py-4 px-7 text-lg font-medium">
            Change Password
          </h3>
          <div className="flex flex-col gap-5 p-7">
            <div>
              <label
                htmlFor="Name"
                className="block mb-3 text-black dark:text-white"
              >
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-5 py-3 outline-none border rounded"
                placeholder="Enter Current Password"
              />
            </div>
            <div>
              <label
                htmlFor="Name"
                className="block mb-3 text-black dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full px-5 py-3 outline-none border rounded"
                placeholder="Enter New Password"
              />
            </div>
            <div>
              <label
                htmlFor="Name"
                className="block mb-3 text-black dark:text-white"
              >
                Re-Enter New Password
              </label>
              <input
                type="password"
                className="w-full px-5 py-3 outline-none border rounded"
                placeholder="Enter Re-Enter New Password"
              />
            </div>
            <button className="px-5 py-3 border-none outline-none text-white rounded bg-indigo-500">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
