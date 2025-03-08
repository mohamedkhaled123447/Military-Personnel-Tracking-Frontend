import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center min-vh-100">
      <MDBRow>
        <MDBCol>
          <MDBCard className="text-center">
            <MDBCardBody>
              <MDBTypography tag="h1" className="display-1">
                404
              </MDBTypography>
              <MDBTypography tag="h5" className="mb-4">
                Page Not Found
              </MDBTypography>
              <p className="mb-4">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link to="/">
                <MDBBtn color="primary">Go to Home</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NotFoundPage;
