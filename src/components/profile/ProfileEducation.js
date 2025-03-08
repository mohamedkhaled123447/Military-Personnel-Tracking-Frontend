import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import {
  profileEducationTableHeaders,
  profileEducationRecordFields,
} from "../../utils/MostUsed";
import { calc_education, monthsMap } from "../../utils/tools";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Warning } from "@mui/icons-material";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
import { useUser } from "../../context/UserContext";
import LineChart from "../charts/LineChart";
import AddModal from "../Modals/AddModal";
import UpdateModal from "../Modals/UpdateModal";

function ProfileEducation({ id, educationData, setProfileDate }) {
  const { user, ip } = useUser();
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();

  // States
  const cur_year = new Date().getFullYear();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [newRow, setNewRow] = useState({
    electronic_war: 0,
    weapons: 0,
    military_security: 0,
    topography: 0,
    chemical_war: 0,
    presentation_of_self_mission: 0,
    percentage: 0,
    notes: "لايكن",
    month: "أكتوبر",
    year: cur_year,
  });

  // Handlers
  const handleNewRowDataChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => calc_education(prev, name, value));
  };

  const handleAddNewRow = async () => {
    try {
      const response = await fetch(
        `${ip}/userData/education-records/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({ ...newRow, user: id }),
        }
      );

      if (!response.ok) throw new Error();

      const newRecord = await response.json();
      setProfileDate((prev) => ({
        ...prev,
        education_records: [...prev.education_records, newRecord],
      }));
      showAlertSnackbar("تم الاضافة بنجاح", "success");
    } catch {
      showAlertSnackbar("حدث خطأ ما", "error");
    }
  };

  const handleUpdateRow = async () => {
    try {
      const response = await fetch(
        `${ip}/userData/education-records/${newRow.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(newRow),
        }
      );

      if (!response.ok) throw new Error();
      setProfileDate((prev) => ({
        ...prev,
        education_records: prev.education_records.map((item) =>
          item.id === newRow.id ? newRow : item
        ),
      }));
      showAlertSnackbar("تم التعديل بنجاح", "success");
    } catch {
      showAlertSnackbar("حدث خطأ ما", "error");
    }
  };

  const handleDeleteRow = (recordId) => {
    showConfirmSnackbar(
      "تأكيد الحذف",
      async () => {
        try {
          const response = await fetch(
            `${ip}/userData/education-records/${recordId}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );

          if (!response.ok) throw new Error();
          setProfileDate((prev) => ({
            ...prev,
            education_records: prev.education_records.filter(
              (item) => item.id !== recordId
            ),
          }));
          showAlertSnackbar("تم الحذف بنجاح", "success");
        } catch {
          showAlertSnackbar("حدث خطأ ما", "error");
        }
      },
      null
    );
  };

  // Utility: Prepare chart data
  const prepareChartData = () => {
    if (!educationData.length) return [];
    const tempData = educationData
      .map(({ percentage, date }) => [percentage, date])
      .sort((a, b) => (a[1] > b[1] ? 1 : -1));

    const X = tempData.map(([, date]) => date);
    const Y = tempData.map(([percentage]) => percentage);
    return [X, Y];
  };

  // Render
  if (!educationData) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-end">
        <h2>
          <span>: الموقف التعليمي</span>
        </h2>
      </div>

      <MDBTable className="my-table">
        <MDBTableHead>
          <tr className="table-row">
            <th>الحذف والتعديل</th>
            {profileEducationTableHeaders.map(([key, label], index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {educationData.map((record, index) => (
            <tr key={index} className="table-row">
              <td>
                {user.type === 1 || user.type === 2 ? (
                  <div className="d-flex justify-content-center">
                    <EditIcon
                      className="me-3"
                      fontSize="small"
                      onClick={() => {
                        setNewRow({ ...record });
                        setOpenUpdateModal(true);
                      }}
                    />
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => handleDeleteRow(record.id)}
                    />
                  </div>
                ) : (
                  <Warning />
                )}
              </td>
              {profileEducationTableHeaders.map(([key, label], index) => (
                <td key={index}>{record[key]}</td>
              ))}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {(user.type === 1 || user.type === 2) && (
        <div className="d-flex justify-content-around">
          <MDBBtn onClick={() => setOpenAddModal(true)}>اضافة</MDBBtn>
        </div>
      )}

      <AddModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title="اضافة اختبار تعليم"
        fields={profileEducationRecordFields}
        newRow={newRow}
        handleNewRowDataChange={handleNewRowDataChange}
        handleAddNewRow={handleAddNewRow}
      />

      <UpdateModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        title="تعديل اختبار تعليم"
        fields={profileEducationRecordFields}
        newRow={newRow}
        handleNewRowDataChange={handleNewRowDataChange}
        handleUpdateRow={handleUpdateRow}
      />

      <LineChart
        title=""
        x={prepareChartData()[0]}
        min={10}
        max={100}
        series={[
          {
            name: "النسبة",
            data: prepareChartData()[1],
          },
        ]}
      />
    </>
  );
}

export default ProfileEducation;
