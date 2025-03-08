import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const FileManager = () => {
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex justify-content-around d-flex align-items-center p-5">
      <div
        onClick={() => navigate("/file-browser/?category=others")}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/ellipsis.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold"> اخري </span>
      </div>

      <div
        onClick={() => navigate("/file-browser/?category=files")}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/research.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold"> الابحاث </span>
      </div>
      <div
        onClick={() => navigate("/file-browser/?category=documents")}
        className="w-auto d-flex flex-column align-items-center hover-scale"
      >
        <img
          src="/icons/file.png"
          alt="Add User"
          className="mb-2"
          style={{ width: "150px", height: "150px" }}
        />
        <span className="text-dark fw-bold"> الالتزامات التدريبية </span>
      </div>
    </div>
  );
};

export default FileManager;
