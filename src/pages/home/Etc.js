import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
function Etc() {
  const navigate = useNavigate();
  return (
      <div className="vh-100 d-flex justify-content-around d-flex align-items-center p-5">
        <div
          onClick={() => navigate("/dachboard/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/statistics.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold"> احصائيات </span>
        </div>
        <div
          onClick={() => navigate("/files/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/folder.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold"> الملفات </span>
        </div>

        {/* <div
          onClick={() => navigate("/backup/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/backup.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold"> النسخ الاحتياطية </span>
        </div> */}
        <div
          onClick={() => navigate("/settings/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/settings.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold"> الاعدادات </span>
        </div>
      </div>
  );
}

export default Etc;
