import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useRecords } from "../../context/RecordsContext";
function Sergeants() {
  const { setFilters, setSelectedValue } = useRecords();
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex justify-content-around align-items-center  p-5 mt-5">
      <div
        onClick={() => {
          setSelectedValue("ضابط صف");
          setFilters((pre) => ({ ...pre, is_officer: 0, is_soldier: 0 }));
          navigate("/records/?target=ضابط صف");
        }}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/search.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold"> استعلام </span>
      </div>
      <div
        onClick={() => {
          setSelectedValue("ضابط صف");
          navigate("/add-record/?target=ضابط صف");
        }}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/add-user.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold">اضافة بيانات ضابط صف </span>
      </div>
    </div>
  );
}

export default Sergeants;
