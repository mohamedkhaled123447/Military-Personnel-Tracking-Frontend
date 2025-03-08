import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import {
  profileGiftTableHeaders,
  profileGiftRecordFields,
} from "../../utils/MostUsed";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Warning } from "@mui/icons-material";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
import { useUser } from "../../context/UserContext";
import AddModal from "../Modals/AddModal";
import UpdateModal from "../Modals/UpdateModal";

function ProfileGift({ id, giftData, setProfileDate }) {
  const { user, ip } = useUser();
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();

  // States
  const cur_year = new Date().getFullYear();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [newRow, setNewRow] = useState({
    commander: "",
    reason: "",
    type: "",
    date: "",
    number_of_days: 0,
  });

  // Handlers
  const handleNewRowDataChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewRow = async () => {
    try {
      const response = await fetch(`${ip}/userData/gift-records/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ ...newRow, user: id }),
      });

      if (!response.ok) throw new Error();

      const newRecord = await response.json();
      setProfileDate((prev) => ({
        ...prev,
        gift_records: [...prev.gift_records, newRecord],
      }));
      showAlertSnackbar("تم الاضافة بنجاح", "success");
    } catch {
      showAlertSnackbar("حدث خطأ ما", "error");
    }
  };

  const handleUpdateRow = async () => {
    try {
      const response = await fetch(
        `${ip}/userData/gift-records/${newRow.id}/`,
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
        gift_records: prev.gift_records.map((item) =>
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
            `${ip}/userData/gift-records/${recordId}/`,
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
            gift_records: prev.gift_records.filter(
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

  // Render
  if (!giftData) {
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
          <span>: المنح والمكافئات</span>
        </h2>
      </div>

      <MDBTable className="my-table">
        <MDBTableHead>
          <tr className="table-row">
            <th>الحذف والتعديل</th>
            {profileGiftTableHeaders.map(([key, label], index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {giftData.map((record, index) => (
            <tr key={index} className="table-row">
              <td>
                {user.type === 1 || user.type === 3 ? (
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
              {profileGiftTableHeaders.map(([key, label], index) => (
                <td key={index}>{record[key]}</td>
              ))}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {(user.type === 1 || user.type === 3) && (
        <div className="d-flex justify-content-around">
          <MDBBtn onClick={() => setOpenAddModal(true)}>اضافة</MDBBtn>
        </div>
      )}

      <AddModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title="اضافة منحة"
        fields={profileGiftRecordFields}
        newRow={newRow}
        handleNewRowDataChange={handleNewRowDataChange}
        handleAddNewRow={handleAddNewRow}
      />

      <UpdateModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        title="تعديل  منحة"
        fields={profileGiftRecordFields}
        newRow={newRow}
        handleNewRowDataChange={handleNewRowDataChange}
        handleUpdateRow={handleUpdateRow}
      />
    </>
  );
}

export default ProfileGift;
