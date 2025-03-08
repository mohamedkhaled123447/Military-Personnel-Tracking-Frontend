import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import FilterFields from "../../components/FilterFields";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import "../../style/Records.css";
const Records = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("access")) navigate("/login");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading && (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-grow" role="status"></div>
        </div>
      )}
      {!loading && (
        <MDBContainer className="py-5">
          <FilterFields />
          <Table />
        </MDBContainer>
      )}
    </>
  );
};

export default Records;
