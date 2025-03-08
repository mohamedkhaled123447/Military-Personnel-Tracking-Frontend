import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useUser } from "../../context/UserContext";
import Navbar from "../../components/Navbar";
import { TextField } from "@mui/material";
import TestResultsModal from "../../components/Modals/TestResultsModal";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
const keyMap = {
  officer: "ضابط",
  sergeant: "ضابط صف",
};
const TestResults = () => {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const { user, ip, handleLogout } = useUser();
  const [results, setResults] = useState([]);
  const [result, setResult] = useState();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    code: "",
    date: "",
    name: "",
  });
  const [target, setTarget] = useState({
    officer: 0,
    sergeant: 0,
  });

  const downloadReport = async () => {
    const response = await fetch(`${ip}/test/results-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ ...filters }),
    });

    if (response.ok) {
      const data = await response.json();
      window.open(data.link, "_blank");
    }
  };
  useEffect(() => {
    fetch(`${ip}/test/results/?id=-1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => {
        if (!response.ok) handleLogout();
        return response.json();
      })
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.error("Error fetching results:", error));
  }, []);
  const handleDelete = (id) => {
    fetch(`${ip}/test/results/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete result");
        setResults(results.filter((result) => result.id !== id));
        showAlertSnackbar("تم الحذف بنجاح", "success");
      })
      .catch((error) => console.error("Error deleting result:", error));
  };
  if (results.length === 0)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h3>لا توجد نتائج</h3>
      </div>
    );
  const filteredData = () => {
    let dataCopy = [...results];
    dataCopy = dataCopy.filter((result) =>
      String(result.test).includes(filters.code)
    );

    dataCopy = dataCopy.filter((result) =>
      result.date_taken.includes(filters.date)
    );

    dataCopy = dataCopy.filter((result) =>
      result.user_name.includes(filters.name)
    );
    if (!target.officer) {
      dataCopy = dataCopy.filter((result) => result.is_officer === false);
    }
    if (!target.sergeant) {
      dataCopy = dataCopy.filter((result) => result.is_officer === true);
    }
    return dataCopy;
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">نتائج الاختبارات</h2>

      <div className="row">
        <div className="col-4">
          <TextField
            label="كود الاختبار"
            value={filters.code}
            onChange={(e) =>
              setFilters((pre) => ({
                ...pre,
                code: e.target.value,
              }))
            }
            size="small"
            fullWidth
          />
        </div>
        <div className="col-4">
          <TextField
            label="التاريخ"
            value={filters.date}
            onChange={(e) =>
              setFilters((pre) => ({
                ...pre,
                date: e.target.value,
              }))
            }
            type="date"
            size="small"
            fullWidth
          />
        </div>
        <div className="col-4">
          <TextField
            label="الاسم"
            value={filters.name}
            onChange={(e) =>
              setFilters((pre) => ({
                ...pre,
                name: e.target.value,
              }))
            }
            size="small"
            fullWidth
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <img
          src="/icons/excel.png"
          alt="Add User"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={downloadReport}
        />
      </div>
      <div className="d-flex flex-row-reverse justify-content-center mt-4">
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setTarget((pre) => ({
              ...pre,
              officer: !pre.officer,
            }))
          }
          pill
          light
          color={target.officer ? "success" : "danger"}
          className="mx-1"
        >
          ضابط
        </MDBBadge>
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setTarget((pre) => ({
              ...pre,
              sergeant: !pre.sergeant,
            }))
          }
          pill
          light
          color={target.sergeant ? "success" : "danger"}
          className="mx-1"
        >
          ضابط صف
        </MDBBadge>
      </div>
      <MDBTable dir="rtl" className="mb-5">
        <MDBTableHead>
          <tr>
            <th>رقم</th>
            <th>اسم المختبر</th>
            <th>كود الاختبار</th>
            <th>اسم الاختبار</th>
            <th>النتيجة</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredData().map((result, index) => (
            <tr key={result.id}>
              <td>{index + 1}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setResult(result.id);
                  setOpen(true);
                }}
              >
                {result.user_name}
              </td>
              <td>{result.test_code}</td>
              <td>{result.test_name}</td>
              <td>
                {result.score}%{" "}
                {result.score >= 50 ? (
                  <span className="text-success">(ناجح)</span>
                ) : (
                  <span className="text-danger">(راسب)</span>
                )}
              </td>
              <td>{new Date(result.date_taken).toLocaleDateString("ar-EG")}</td>
              <td>
                <MDBBtn
                  color="danger"
                  size="sm"
                  onClick={() =>
                    showConfirmSnackbar(
                      "تأكيد الحذف",
                      () => {
                        handleDelete(result.id);
                      },
                      () => {
                        console.log("Cancelled!");
                      },
                      "bottom",
                      "center"
                    )
                  }
                  className="rounded-pill"
                >
                  حذف
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <TestResultsModal
        open={open}
        setOpen={setOpen}
        result={results.find((item) => item.id === result)}
      />
    </div>
  );
};

export default TestResults;
