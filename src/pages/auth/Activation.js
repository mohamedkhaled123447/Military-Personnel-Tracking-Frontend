import React, { useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { convertToArabicNumerals } from "../../utils/tools";
import { useSettings } from "../../context/SettingsContext";
function Activation() {
  const { settings } = useSettings();
  const { ip } = useUser();
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [activationData, setActivationData] = useState({
    username: "",
    password: "",
    adminUsername: "",
    adminPassword: "",
    access: "write",
    type: 2,
  });
  const handleActivationDataChange = (e) => {
    const { name, value } = e.target;
    setActivationData((prevActivationData) => ({
      ...prevActivationData,
      [name]: value,
    }));
  };
  const handleActivation = async () => {
    if (activationData.access === "read") activationData.type = 4;
    const response = await fetch(`${ip}/accounts/activate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activationData),
    });
    if (!response.ok) {
      // Handle HTTP errors
      setWarning("اسم المستخدم او كلمة المرور غير صحيحة");
      setTimeout(() => setWarning(""), 3000);
    } else {
      // Handle successful response
      setActivationData({
        username: "",
        password: "",
        adminUsername: "",
        adminPassword: "",
        access: "write",
        type: 2,
      });
      navigate("/login");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleActivation();
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
              <h1 className="mb-4 text-center fs-4 fw-bold">تفعيل الحساب</h1>
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  wrapperClass="mb-4"
                  className="fs-5"
                  label="اسم المستخدم"
                  type="text"
                  name="username"
                  onChange={handleActivationDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  wrapperClass="mb-4"
                  className="fs-5"
                  label="كلمة المرور"
                  type="password"
                  name="password"
                  onChange={handleActivationDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  wrapperClass="mb-4"
                  className="fs-5"
                  label="اسم المستخدم للادمن"
                  type="text"
                  name="adminUsername"
                  onChange={handleActivationDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-4">
                <TextField
                  fullWidth
                  size="small"
                  wrapperClass="mb-4"
                  className="fs-5"
                  label="كلمة مرور الادمن"
                  type="password"
                  name="adminPassword"
                  onChange={handleActivationDataChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-4">
                <Select
                  size="small"
                  fullWidth
                  className="fs-lg"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="access"
                  value={activationData.access}
                  onChange={handleActivationDataChange}
                >
                  <MenuItem value="read">read</MenuItem>
                  <MenuItem value="write">write</MenuItem>
                </Select>
              </div>
              <div className="mb-4">
                <Select
                  size="small"
                  fullWidth
                  className="fs-lg"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="type"
                  value={activationData.type}
                  onChange={handleActivationDataChange}
                >
                  <MenuItem value={1}>admin</MenuItem>
                  <MenuItem value={2}>تدريب</MenuItem>
                  <MenuItem value={3}>تنظيم وادارة</MenuItem>
                </Select>
              </div>

              <p className="text-center text-danger mt-2 fs-4">{warning}</p>
              <MDBBtn className="mb-4 w-100 fs-5" onClick={handleActivation}>
                تفعيل
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

export default Activation;
