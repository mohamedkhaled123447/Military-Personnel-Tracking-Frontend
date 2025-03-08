import React from "react";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {
  ExitToApp,
  Home,
  ArrowBack,
  CloseFullscreen,
} from "@mui/icons-material";
import "../style/Navbar.css";
export default function Navbar() {
  const { handleLogout } = useUser();
  const navigate = useNavigate();
  return (
    <MDBContainer fluid className="d-flex justify-content-between border-bottom px-5 py-1 flex-column flex-sm-row">
      <MDBBtn
        className="mx-2 fs-5"
        color="tertiary"
        rippleColor="light"
        onClick={() => {
          if (window.history.state.idx === 0) window.close();
          else window.history.back();
        }}
      >
        رجوع
        <ArrowBack fontSize="large" />
      </MDBBtn>
      <MDBBtn
        className="mx-2 fs-5"
        color="tertiary"
        rippleColor="light"
        onClick={() => navigate("/")}
      >
        الصفحة الرئيسية
        <Home fontSize="large" />
      </MDBBtn>

      <MDBBtn
        className="ms-2 fs-5"
        color="tertiary"
        rippleColor="light"
        onClick={handleLogout}
      >
        خروج
        <ExitToApp fontSize="large" />
      </MDBBtn>
    </MDBContainer>
  );
}
