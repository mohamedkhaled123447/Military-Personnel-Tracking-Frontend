import React from "react";
import { TextField } from "@mui/material";
import { convertToArabicNumerals } from "../../utils/tools";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "../../style/Login.css";
import { useUser } from "../../context/UserContext";
import { useSettings } from "../../context/SettingsContext";
function ResetPassword() {
  const navigate = useNavigate();
  const { ip } = useUser();
  const { settings } = useSettings();
  const {
    warning,
    handleResetPasswordDataChange,
    handleResetPassword,
  } = useUser();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
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
              src={`${ip}/media/images/1958.jpg`}
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
                  label="الاسم"
                  type="text"
                  name="username"
                  onChange={handleResetPasswordDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mt-4">
                <TextField
                  fullWidth
                  size="small"
                  label="كلمة المرور القديمة"
                  type="password"
                  name="oldPassword"
                  onChange={handleResetPasswordDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mt-4">
                <TextField
                  fullWidth
                  size="small"
                  label="كلمة المرور الجديدة"
                  type="password"
                  name="newPassword"
                  onChange={handleResetPasswordDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <p className="text-center text-danger fs-4 mt-2">{warning}</p>
              <MDBBtn className="mb-4 w-100 fs-5" onClick={handleResetPassword}>
                حفظ
              </MDBBtn>

              <p className="text-center fs-5">
                <a href="/login">تسجيل الدخول</a>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ResetPassword;
