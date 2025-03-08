import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import {
  profileSportTableHeaders,
  profileSportRecordFields,
} from "../../utils/MostUsed";
import { calc_sport, calculateBMI, lowerBound } from "../../utils/tools";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Warning } from "@mui/icons-material";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
import { useUser } from "../../context/UserContext";
import LineChart from "../charts/LineChart";
import AddModal from "../Modals/AddModal";
import UpdateModal from "../Modals/UpdateModal";
const color = {
  0: "#d9b40f",
  1: "#42f554",
  2: "#d9990f",
  3: "#d9200f",
};
function ProfileSport({ id, birthOfDate, sportData, setProfileDate }) {
  const { user, ip } = useUser();
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  // States
  const cur_year = new Date().getFullYear();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [newRow, setNewRow] = useState({
    running_rate: 0,
    push_up: 0,
    pull_up: 0,
    crunch: 0,
    running: 0,
    percentage: 0,
    weight: 50,
    height: 150,
    notes: "لايكن",
    year: cur_year,
    month: "يونيو",
  });

  // Handlers
  const handleNewRowDataChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => calc_sport(prev, name, value, birthOfDate));
  };

  const handleAddNewRow = async () => {
    try {
      const response = await fetch(
        `${ip}/userData/fitness-records/`,
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
        fitness_records: [...prev.fitness_records, newRecord],
      }));
      showAlertSnackbar("تم الاضافة بنجاح", "success");
    } catch {
      showAlertSnackbar("حدث خطأ ما", "error");
    }
  };

  const handleUpdateRow = async () => {
    try {
      const response = await fetch(
        `${ip}/userData/fitness-records/${newRow.id}/`,
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
        fitness_records: prev.fitness_records.map((item) =>
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
            `${ip}/userData/fitness-records/${recordId}/`,
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
            fitness_records: prev.fitness_records.filter(
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
    if (!sportData.length) return [];
    const tempData = sportData
      .map(({ percentage, date }) => [percentage, date])
      .sort((a, b) => (a[1] > b[1] ? 1 : -1));
    const X = tempData.map(([, date]) => date);
    const Y = tempData.map(([percentage]) => percentage);
    return [X, Y];
  };

  // Render
  if (!sportData) {
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
          <span>: مستوي اللياقة</span>
        </h2>
      </div>

      <MDBTable className="my-table">
        <MDBTableHead>
          <tr className="table-row">
            <th>الحذف والتعديل</th>
            {profileSportTableHeaders.map(([key, label], index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {sportData.map((record, index) => (
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
              {profileSportTableHeaders.map(([key, label], index) =>
                key === "bmi" ? (
                  <td
                    key={index}
                    style={{
                      fontWeight: "bold",
                      color: `${
                        color[
                          lowerBound(
                            [18.4, 24.9, 30, 40],
                            calculateBMI(record["weight"], record["height"])
                          )
                        ]
                      }`,
                    }}
                  >
                    {calculateBMI(record["weight"], record["height"])}
                  </td>
                ) : (
                  <td key={index}>{record[key]}</td>
                )
              )}
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
        title="اضافة اختبار لياقة"
        fields={profileSportRecordFields}
        newRow={newRow}
        handleNewRowDataChange={handleNewRowDataChange}
        handleAddNewRow={handleAddNewRow}
      />

      <UpdateModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        title="تعديل اختبار لياقة"
        fields={profileSportRecordFields}
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

export default ProfileSport;
