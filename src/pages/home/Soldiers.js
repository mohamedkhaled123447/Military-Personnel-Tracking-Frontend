import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useRecords } from "../../context/RecordsContext";
function Soldiers() {
  const { setFilters, setSelectedValue } = useRecords();
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex justify-content-around d-flex align-items-center p-5">
      <div
        onClick={() => {
          setSelectedValue("جندي");
          setFilters((pre) => ({ ...pre, is_officer: 0, is_soldier: 1 }));
          navigate("/records/?target=جندي");
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
        onClick={() => navigate("/vacation/")}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/people.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold">الميدانيات</span>
      </div>
      <div
        onClick={() => {
          setSelectedValue("جندي");
          navigate("/add-record/?target=جندي");
        }}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/add-user.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold">اضافة بيانات جندي </span>
      </div>
    </div>
  );
}

export default Soldiers;
