import React, { useState, useEffect } from "react";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useUser } from "../../context/UserContext";
import { VacationNotesTableHeaders } from "../../utils/MostUsed";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useSettings } from "../../context/SettingsContext";
const VacationNotes = ({
  setOpenAddModal,
  setOpenUpdateModal,
  setVacationNote,
}) => {
  const { settings } = useSettings();
  const { ip, user } = useUser();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const { showAlertSnackbar } = useAlertSnackbar();
  const { showConfirmSnackbar } = useConfirmSnackbar();
  const fetchData = async () => {
    const response = await fetch(`${ip}/userData/vacation-notes/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    const data = await response.json();
    setData(data);
  };
  const handleDeleteVacationNote = (id, idx) => {
    showConfirmSnackbar(
      "تأكيد الحذف",
      async () => {
        try {
          const response = await fetch(
            `${ip}/userData/vacation-notes/${id}/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          );

          if (!response.ok) throw new Error();
          setData((pre) => pre.filter((_, index) => index !== idx));
          showAlertSnackbar("تم الحذف بنجاح", "success");
        } catch {
          showAlertSnackbar("حدث خطأ ما", "error");
        }
      },
      null
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!data)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  if (user.type > 3)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h3>هذا الحساب ليس له الصلاحية</h3>
      </div>
    );
  return (
    <div>
      <MDBTable>
        <MDBTableHead>
          <tr className="text-center">
            {!show && <th className="fw-bold">الحذف والتعديل</th>}
            {VacationNotesTableHeaders.map(([name, lable], index) => (
              <th className="fw-bold" key={index}>
                {lable}
              </th>
            ))}
            <th className="fw-bold">م</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data.map((item, index) => (
            <tr className="text-center" key={index}>
              {!show && (
                <td>
                  <div className="d-flex justify-content-center">
                    <EditIcon
                      className="me-3"
                      fontSize="small"
                      onClick={() => {
                        setVacationNote(item);
                        setOpenUpdateModal(true);
                      }}
                    />
                    <DeleteIcon
                      fontSize="small"
                      onClick={() => handleDeleteVacationNote(item.id, index)}
                    />
                  </div>
                </td>
              )}
              {VacationNotesTableHeaders.map(([name, lable], index) => (
                <td key={index}>{item[name]}</td>
              ))}
              <td>{index + 1}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      {show && (
        <div className="row mt-3">
          <div className="row">
            <div className="col-1">
              <h4 className="fw-bold">{"("}</h4>
            </div>
            <div className="col-1">
              <img
                height="50px"
                src={
                  settings.find((setting) => setting.key === "التوقيع").image
                }
              />
            </div>
            <div className="col-10">
              <h4 className="fw-bold">)التوقيـــــــــــــع</h4>
            </div>
          </div>
          <h4 className="fw-bold">
            {settings.find((setting) => setting.key === "قائد الوحدة").value}
          </h4>
          <h4 className="fw-bold">
            {settings.find((setting) => setting.key === "الوحدة").value}
          </h4>
        </div>
      )}
      {!show && (
        <div className="row d-flex justify-content-center mt-4">
          <MDBBtn className="w-auto me-4" onClick={(e) => setShow(true)}>
            يعتمد
          </MDBBtn>
          <MDBBtn className="w-auto" onClick={() => setOpenAddModal(true)}>
            اضافة
          </MDBBtn>
        </div>
      )}
    </div>
  );
};

export default VacationNotes;
