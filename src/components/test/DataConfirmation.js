import React, { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

function DataConfirmation({
  test,
  setSelectedTest,
  setSection,
  selectedTest,
  userData,
}) {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { ip } = useUser();

  const fetchData = async () => {
    const response = await fetch(`${ip}/test/test-code/?code=${test}`);
    if (!response.ok) {
      showAlertSnackbar("كود الاختبار خطا", "error");
      setSection(1);
    } else {
      const data = await response.json();
      setSelectedTest(data);
      console.log(userData, data);
      if (
        (!userData.is_officer && data.target === "ضابط") ||
        (userData.is_officer && data.target !== "ضابط")
      ) {
        showAlertSnackbar("خطا في اختيار كود الاختبار", "error");
        setSection(1);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!selectedTest || !userData) return null;

  return (
    <div className="d-flex flex-column align-items-center p-4 mt-4">
      <MDBCard
        className="text-center shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <MDBCardBody>
          <MDBCardImage
            src={
              userData.image
                ? `${ip}/${userData.image}`
                : "/icons/user.png"
            }
            alt="User"
            className="mb-4 rounded-circle"
            style={{ width: "200px", height: "200px" }}
          />
          <MDBTypography tag="h5" dir="rtl" className="fw-bold mb-3">
            {userData.is_officer ? userData.rank : userData.dgree}:{" "}
            {userData.name}
          </MDBTypography>
          <MDBTypography tag="p" dir="rtl" className="text-muted">
            <strong>اسم الاختبار:</strong> {selectedTest.name}
          </MDBTypography>
          <MDBTypography tag="p" dir="rtl" className="text-muted">
            <strong>وقت الاختبار:</strong> {selectedTest.time}
          </MDBTypography>
          <MDBTypography tag="p" dir="rtl" className="text-muted">
            <strong>عدد الأسئلة:</strong> {selectedTest.questions.length}
          </MDBTypography>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default DataConfirmation;
