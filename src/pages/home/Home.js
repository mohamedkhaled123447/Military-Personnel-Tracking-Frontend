import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "../../style/Home.css";
function Home() {
  const navigate = useNavigate();
  const { handleLogout } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (!localStorage.getItem("access")) handleLogout();
  }, []);
  return (
    <>
      {loading && (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-grow" role="status"></div>
        </div>
      )}
      {!loading && (
        <div
          dir="rtl"
          className="vh-100 d-flex justify-content-around d-flex align-items-center p-5"
        >
          <div
            onClick={() => navigate("soldiers/")}
            className="w-auto d-flex flex-column align-items-center hover-scale"
          >
            <img
              src="/icons/soldier.png"
              alt="Add User"
              className="mb-2"
              style={{ width: "150px", height: "150px" }}
            />
            <span className="text-dark fw-bold">جنود</span>
          </div>
          <div
            onClick={() => navigate("sergeants/")}
            className="w-auto d-flex flex-column align-items-center hover-scale"
          >
            <img
              src="/icons/sergeant.png"
              alt="Add User"
              className="mb-2"
              style={{ width: "150px", height: "150px" }}
            />
            <span className="text-dark fw-bold">ضباط صف</span>
          </div>
          <div
            onClick={() => navigate("officers/")}
            className="w-auto d-flex flex-column align-items-center hover-scale"
          >
            <img
              src="/icons/officer.png"
              alt="Add User"
              className="mb-2"
              style={{ width: "150px", height: "150px" }}
            />
            <span className="text-dark fw-bold">ضباط</span>
          </div>
          <div
            onClick={() => navigate("/exam/")}
            className="w-auto d-flex flex-column align-items-center hover-scale"
          >
            <img
              src="/icons/exam.png"
              alt="Add User"
              className="mb-2"
              style={{ width: "150px", height: "150px" }}
            />
            <span className="text-dark fw-bold"> الاختبارات </span>
          </div>
          <div
            onClick={() => navigate("etc/")}
            className="w-auto d-flex flex-column align-items-center hover-scale"
          >
            <img
              src="/icons/ellipsis.png"
              alt="Add User"
              className="mb-2"
              style={{ width: "130px", height: "130px" }}
            />
            <span className="text-dark fw-bold">اخري</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
