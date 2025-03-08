import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBInput,
} from "mdb-react-ui-kit";
import { Autocomplete, TextField } from "@mui/material";
import { useUser } from "../../context/UserContext";

function TestForm({ setUserData, test, setTest }) {
  const { ip } = useUser();
  const [value, setValue] = useState({ label: "", id: -1, image: null });
  const [inputValue, setInputValue] = useState("");
  const [names, setNames] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`${ip}/userData/users-name/`);
    const data = await response.json();
    setNames(data.map((item) => ({ label: item.name, ...item })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <MDBCard
        className="shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <MDBCardBody className="text-center">
          <MDBCardImage
            src={
              value.image
                ? `${ip}/${value.image}`
                : "/icons/user.png"
            }
            alt="User"
            className="rounded-circle mb-3"
            style={{ width: "200px", height: "200px" }}
          />
          <MDBTypography tag="h6" dir="rtl" className="mb-4">
            {`الاسم: ${inputValue}`}
          </MDBTypography>
          <div className="mb-4">
            <Autocomplete
              fullWidth
              size="small"
              disablePortal
              options={names}
              renderInput={(params) => (
                <TextField {...params} label="الاسم" variant="outlined" />
              )}
              value={value}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValue(newValue);
                  setUserData(newValue);
                } else {
                  setValue({ label: "", id: -1, image: null });
                }
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              size="small"
              label="كود الاختبار"
              id="testCode"
              value={test}
              onChange={(e) => setTest(e.target.value)}
              className="mb-3"
              dir="rtl"
            />
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default TestForm;
