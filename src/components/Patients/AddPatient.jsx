import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../Utility/axiosApiConfig";

function AddPatient() {
  const [patient_Name, setPatient_Name] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_No, setMobile_No] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [allergy, setAllergy] = useState([""]);
  const [surgeries, setSurgeries] = useState([""]);
  const [current_Medicine, setCurrent_Medicine] = useState([""]);
  const addAllergyHandler = () => {
    setAllergy([...allergy, [""]]);
  };
  const addSurgeriesHandler = () => {
    setSurgeries([...surgeries, [""]]);
  };
  const addCurrent_MedicineHandler = () => {
    setCurrent_Medicine([...current_Medicine, [""]]);
  };

  const removeAllergyHandler = (index) => {
    const newAllergy = [...allergy];
    newAllergy.splice(index, 1);
    setAllergy(newAllergy);
  };
  const removeSurgeriesHandler = (index) => {
    const newSurgery = [...surgeries];
    newSurgery.splice(index, 1);
    setSurgeries(newSurgery);
  };
  const removeCurrent_MedicineHandler = (index) => {
    const newCurrentMedicine = [...current_Medicine];
    newCurrentMedicine.splice(index, 1);
    setCurrent_Medicine(newCurrentMedicine);
  };

  const inputChangeHandler = (e, index) => {
    const { value } = e.target;
    const newAllergy = [...allergy];
    newAllergy[index] = value;
    setAllergy(newAllergy);
  };
  const inputChangeCurrent_MedicineHandler = (e, index) => {
    const { value } = e.target;
    const newSurgery = [...current_Medicine];
    newSurgery[index] = value;
    setCurrent_Medicine(newSurgery);
  };
  const inputChangeSurgeriesHandler = (e, index) => {
    const { value } = e.target;
    const newCurrentMedicine = [...surgeries];
    newCurrentMedicine[index] = value;
    setSurgeries(newCurrentMedicine);
  };
  const addPetientHandler = async () => {
    const petientData = {
      patient_Name,
      email,
      mobile_No,
      gender,
      address,
      age: Number(age),
      allergy,
      surgeries,
      current_Medicine,
      password,
    };
    console.log(petientData);
    // Axios request
    await axiosInstance
      .post("http://localhost:8081/api/patient/addPatient", petientData)
      .then((res) => {
        console.log(res.data);
        setPatient_Name("");
        setEmail("");
        setMobile_No("");
        setGender("");
        setAddress("");
        setPassword("");
        setAllergy([""]);
        setSurgeries([""]);
        setAge("");
        setCurrent_Medicine([""]);
        toast.success("Petient Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Petient Not Added");
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0">
      <h2 className="text-gray-800 mb-4 text-xl font-bold sm:text-2xl">
        Add New Patient
      </h2>
      <div className="flex flex-col justify-center bg-white shadow">
        <h3 className="border-b py-4 px-7 text-lg font-medium">
          Patient Information
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-5 p-7">
            <div>
              <label htmlFor="patient_Name" className="block mb-3 text-black">
                Patient Name
              </label>
              <input
                type="text"
                className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                placeholder="Patient Name"
                onChange={(e) => {
                  setPatient_Name(e.target.value);
                }}
                value={patient_Name}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="Email" className="block mb-3 text-black">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="mobile_No" className="block mb-3 text-black">
                  Mobile
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                  placeholder="Mobile No"
                  onChange={(e) => {
                    setMobile_No(e.target.value);
                  }}
                  value={mobile_No}
                />
              </div>

              <div>
                <label htmlFor="color" className="block mb-3 text-black">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                  placeholder="Age"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  value={age}
                />
              </div>

              <div>
                <label htmlFor="Address" className="block mb-3 text-black">
                  Address
                </label>
                <textarea
                  type="text"
                  className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Address"
                  rows={5}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                ></textarea>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label htmlFor="password" className="block mb-3 text-black">
                  Password
                </label>
                <input
                  type="text"
                  className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </div>
            </div>
            <div>
              <label htmlFor="Gender" className="block mb-3 text-black">
                Gender
              </label>
              <select
                className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                defaultValue={gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex justify-between items-center -mx-8">
              <h3 className="border-b py-4 px-7 text-lg font-medium">
                Patient Allergy
              </h3>
              <button
                onClick={(e) => addAllergyHandler(e)}
                className="px-3 py-2 mr-8 border-none outline-none text-white rounded bg-indigo-500"
              >
                Add Allergy
              </button>
            </div>

            {allergy.map((data, i) => (
              <div
                className="flex items-center justify-between gap-x-5 mt-4"
                key={i}
              >
                <div>
                  <label htmlFor="width" className="block mb-3 text-black">
                    Allergy
                  </label>
                  <input
                    type="text"
                    name="Allergy"
                    value={allergy[i]}
                    onChange={(e) => inputChangeHandler(e, i)}
                    className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                    placeholder="Allergy"
                  />
                </div>

                <button
                  onClick={() => removeAllergyHandler(i)}
                  className="self-end mb-2 px-3 py-2 border-none outline-none text-white rounded bg-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            {/* <div>
              <div className="flex justify-between items-center -mx-8">
                <h3 className="border-b py-4 px-7 text-lg font-medium">
                  Patient Current Medicines
                </h3>
                <button
                  onClick={(e) => addCurrent_MedicineHandler(e)}
                  className="px-3 py-2 mr-8 border-none outline-none text-white rounded bg-indigo-500"
                >
                  Add Current Medicines
                </button>
              </div>

              {current_Medicine.map((data, i) => (
                <div
                  className="flex items-center justify-between gap-x-5 mt-4"
                  key={i}
                >
                  <div>
                    <label htmlFor="width" className="block mb-3 text-black">
                      Current Medicines
                    </label>
                    <input
                      type="text"
                      name="Current Medicines"
                      value={current_Medicine[i]}
                      onChange={(e) => inputChangeCurrent_MedicineHandler(e, i)}
                      className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                      placeholder="Current Medicines"
                    />
                  </div>

                  <button
                    onClick={() => removeCurrent_MedicineHandler(i)}
                    className="self-end mb-2 px-3 py-2 border-none outline-none text-white rounded bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div> */}
            <div>
              <div className="flex justify-between items-center -mx-8">
                <h3 className="border-b py-4 px-7 text-lg font-medium">
                  Patient Current Medicines
                </h3>
                <button
                  onClick={(e) => addCurrent_MedicineHandler(e)}
                  className="px-3 py-2 mr-8 border-none outline-none text-white rounded bg-indigo-500"
                >
                  Add Current Medicines
                </button>
              </div>

              {current_Medicine.map((data, i) => (
                <div
                  className="flex items-center justify-between gap-x-5 mt-4"
                  key={i}
                >
                  <div>
                    <label htmlFor="width" className="block mb-3 text-black">
                      Current Medicines
                    </label>
                    <input
                      type="text"
                      name="Current Medicines"
                      value={current_Medicine[i]}
                      onChange={(e) => inputChangeCurrent_MedicineHandler(e, i)}
                      className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                      placeholder="Current Medicines"
                    />
                  </div>

                  <button
                    onClick={() => removeCurrent_MedicineHandler(i)}
                    className="self-end mb-2 px-3 py-2 border-none outline-none text-white rounded bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-center -mx-8">
                <h3 className="border-b py-4 px-7 text-lg font-medium">
                  Patient Surgeries
                </h3>
                <button
                  onClick={(e) => addSurgeriesHandler(e)}
                  className="px-3 py-2 mr-8 border-none outline-none text-white rounded bg-indigo-500"
                >
                  Add Surgeries
                </button>
              </div>

              {surgeries.map((data, i) => (
                <div
                  className="flex items-center justify-between gap-x-5 mt-4"
                  key={i}
                >
                  <div>
                    <label htmlFor="width" className="block mb-3 text-black">
                      Surgeries
                    </label>
                    <input
                      type="text"
                      name="Surgeries"
                      value={surgeries[i]}
                      onChange={(e) => inputChangeSurgeriesHandler(e, i)}
                      className="w-full px-5 py-3 outline-none border rounded hover:border-indigo-500 focus:border-indigo-500"
                      placeholder="Surgeries"
                    />
                  </div>

                  <button
                    onClick={() => removeSurgeriesHandler(i)}
                    className="self-end mb-2 px-3 py-2 border-none outline-none text-white rounded bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-5 mt-4">
              <button
                onClick={addPetientHandler}
                className=" px-5 py-3 border-none outline-none text-white rounded bg-indigo-500"
              >
                Add Patient
              </button>
              <button
                type="reset"
                className=" px-5 py-3 border-none outline-none text-white rounded bg-red-500"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatient;
