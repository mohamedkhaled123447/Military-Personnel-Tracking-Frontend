import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
function Exam() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="vh-100 d-flex justify-content-around d-flex align-items-center p-5">
      {user.type >= 3 && <h3>هذا الحساب ليس له الصلاحية</h3>}
      {(user.type === 1 || user.type === 2) && (
        <div
          onClick={() => navigate("/test-result/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/test-result.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold">نتائج الاختبارات </span>
        </div>
      )}
      {(user.type === 1 || user.type === 2) && (
        <div
          onClick={() => navigate("/build-test/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/add-exam.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold">إضافة اختبار</span>
        </div>
      )}

      {(user.type === 1 || user.type === 2) && (
        <div
          onClick={() => navigate("/add-question/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/add-question.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold"> إضافة سؤال </span>
        </div>
      )}
      {(user.type === 1 || user.type === 2) && (
        <div
          onClick={() => navigate("/topics/")}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/topics.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold"> إضافة مادة </span>
        </div>
      )}
    </div>
  );
}

export default Exam;
