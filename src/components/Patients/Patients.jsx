import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationButtons from "../Utility/PaginationButtons";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import { axiosInstance } from "../Utility/axiosApiConfig";

function Patients() {
  const { token, role } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [patient, setPatient] = useState({});
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [tableItems, setTableItems] = useState([]);

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
  const fetchData = async () => {
    await axios
      .get("http://localhost:8081/api/patient/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setTableItems(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPatient = async (email) => {
    // console.log(email);
    await axiosInstance
      .post("http://localhost:8081/api/patient/getPatient", { email })
      .then((res) => {
        setPatient(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getProducts = function (page, limit) {
      let array = [];
      let j = 0;
      for (let i = (page - 1) * limit; i < page * limit && tableItems[i]; i++) {
        array.push(tableItems[i]);
        array[j].idx = i + 1;
        j++;
      }
      return array;
    };

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    let result = getProducts(currentPage + 1, limit);

    setTotalPages(Math.ceil(tableItems.length / limit));
    setProducts(result);
  }, [limit, currentPage, tableItems]);

  // console.log(products);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All Patients
          </h3>
        </div>
        {/* <div className="mt-3 md:mt-0">
          <Link
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            to={"/admin/products/add"}
          >
            Add product
          </Link>
        </div> */}
      </div>
      <div className="mt-8 flex justify-end gap-x-4">
        <input
          placeholder="Search..."
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="w-fit px-5 py-3 outline-none border border-indigo-200 bg-indigo-50 rounded"
        />
        <select
          name="records"
          id="records"
          className="px-3 py-3 outline-none border border-indigo-200 bg-indigo-50 rounded"
          onClick={(e) => setLimit(e.target.value)}
          defaultValue={limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[55vh]">
          <div className="animate-spin h-16 w-16 rounded-full border-4 border-r-transparent border-indigo-500"></div>
        </div>
      ) : (
        <div className="mt-8 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-1 text-center">No.</th>
                <th className="py-3 px-6">Patients</th>
                <th className="py-3 px-6 text-center">Gender</th>
                <th className="py-3 px-6 text-center">Mobile</th>
                <th className="py-3 px-6 text-center">Address</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {products
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.patient_Name.toLowerCase().includes(search);
                })
                .map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-1 py-4 whitespace-nowrap text-center">
                      {item.idx}
                    </td>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                      {/* <img
                        src={"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1712354001~exp=1712354601~hmac=e34ca6448ff9b9dc85632d6ef225ea5cc16f8a2c2f6b2444ca5a121752edc3a5"}
                        className="w-16 h-16 rounded-full"
                      /> */}
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {item.patient_Name}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {item.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.mobile_No}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.address}
                    </td>
                    <td className="text-center px-6 whitespace-nowrap space-x-2 gap-1">
                      {role == "Assistant" && (
                        <Link
                          className="py-2 px-3 font-medium text-indigo-600 border hover:border-indigo-500 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                          to={`/admin/products/update/${item.id}`}
                        >
                          Edit
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setOpenModal(true);
                          getPatient(item.email);
                        }}
                        className="py-2 leading-none px-3 font-medium border hover:border-green-500 text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center font-medium text-3xl">
            Patient Information
          </h1>
          <div className="my-4">
            <p className="font-medium">
              Patient Name:{" "}
              <span className="font-normal">{patient?.patient_Name}</span>
            </p>
            <p className="font-medium">
              Email: <span className="font-normal">{patient?.email}</span>
            </p>
            <p className="font-medium">
              Mobile: <span className="font-normal">{patient?.mobile_No}</span>
            </p>
            <p className="font-medium">
              Gender: <span className="font-normal">{patient?.gender}</span>
            </p>
            <p className="font-medium">
              Address: <span className="font-normal">{patient?.address}</span>
            </p>
            <p className="font-medium">Allergies:</p>
            <ul>
              {patient?.allergy?.map((item, idx) => (
                <li className="list-disc ml-8" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-medium">Surgeries:</p>
            <ul>
              {patient?.surgeries?.map((item, idx) => (
                <li className="list-disc ml-8" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150"
          >
            Close
          </button>
        </Box>
      </Modal>

      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Patients;
