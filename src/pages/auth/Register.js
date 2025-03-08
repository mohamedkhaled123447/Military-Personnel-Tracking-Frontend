import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { convertToArabicNumerals } from "../../utils/tools";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useUser } from "../../context/UserContext";
import { useSettings } from "../../context/SettingsContext";
function Register() {
  const { settings } = useSettings();
  const { ip } = useUser();
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    repeatedPassword: "",
  });
  const handleRegisterDataChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };
  const handleRegister = async () => {
    if (registerData.password !== registerData.repeatedPassword) {
      setWarning("كلمة المرور الاولي لا تساوي كلمة المرور الثانية");
      setTimeout(() => setWarning(""), 3000);
      return;
    }
    const response = await fetch(`${ip}/accounts/create-user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerData.username,
        password: registerData.password,
      }),
    });
    if (!response.ok) {
      // Handle HTTP errors
      setWarning("اسم المستخدم او كلمة المرور غير صحيحة");
      setTimeout(() => setWarning(""), 3000);
      // const errors = await response.json();
      // console.log(errors)
    } else {
      // Handle successful response
      setRegisterData({
        username: "",
        password: "",
        repeatedPassword: "",
      });
      navigate("/login");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegister();
    }
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard shadow="none">
        <MDBRow>
          <h1 className="text-center mt-4 fw-bolder">
            {convertToArabicNumerals(
              settings.length
                ? settings.find((setting) => setting.key === "اسم المنظومة")
                    .value
                : ""
            )}
          </h1>
        </MDBRow>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol col="6" md="5">
            <MDBCardImage
              src={`${ip}/media/images/EW.png`}
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0 m-3"
              fluid
            />
          </MDBCol>

          <MDBCol col="6" md="6">
            <MDBCardBody className="ms-3" dir="rtl">
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  className="fs-5"
                  label="الاسم"
                  type="text"
                  name="username"
                  onChange={handleRegisterDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  className="fs-5"
                  label="كلمة المرور"
                  type="password"
                  name="password"
                  onChange={handleRegisterDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  className="fs-5"
                  label="كلمة المرور"
                  type="password"
                  name="repeatedPassword"
                  onChange={handleRegisterDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <p className="text-center text-danger mt-2 fs-4">{warning}</p>
              <MDBBtn className="mb-4 w-100 fs-5" onClick={handleRegister}>
                انشاء حساب{" "}
              </MDBBtn>
              <p className="text-center fs-5">
                {" "}
                لديك حساب <a href="/login">تسجيل الدخول</a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
