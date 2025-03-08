import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { monthsMap, numberToMonth } from "../../utils/tools";
import { VacationNotesRecordFields } from "../../utils/MostUsed";
import VacationPDF from "../../components/vacation/VacationPDF";
import VacationHeader from "../../components/vacation/VacationHeader";
import VacationRecords from "../../components/vacation/VacationRecords";
import VacationEducation from "../../components/vacation/VacationEducation";
import VacationShooting from "../../components/vacation/VacationShooting";
import VacationNotes from "../../components/vacation/VacationNotes";
import AddModal from "../../components/Modals/AddModal";
import UpdateModal from "../../components/Modals/UpdateModal";
import Navbar from "../../components/Navbar";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import { useConfirmSnackbar } from "../../context/ConfirmSnackbarContext";
import "../../style/Vacation.css";

function Vacation() {
  const { showAlertSnackbar } = useAlertSnackbar();
  const { ip, handleLogout, user } = useUser();
  const [vacation, setVcation] = useState("الاولي");
  const [test, setTest] = useState("اللياقة");
  const [month, setMonth] = useState(numberToMonth[new Date().getMonth() + 1]);
  const [rate1, setRate1] = useState(50);
  const [vacationData, setVacationData] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [vacationNote, setVacationNote] = useState({
    sub_unit: "تصنت",
    duration: 7,
    fieldwork_location: vacation,
    notes: "لايكن",
    departure_date: new Date().toISOString().slice(0, 10),
    grants_discounts: "لايكن",
    grade: "جندي",
    return_date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    name: "",
    governorate: "لايكن",
  });
  const handleVacationNoteChange = (e) => {
    const { name, value } = e.target;
    setVacationNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fetchData = async () => {
    const response = await fetch(
      `${ip}/userData/vacation/?vacation=${vacation}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (!response.ok) handleLogout();
    const data = await response.json();
    setVacationData(data);
  };

  const handleAddVacationNote = async () => {
    if (user.type !== 1) {
      showAlertSnackbar("لا يسمح بالاضافة الا بواسطة قائد الفوج", "error");
      return;
    }
    const response = await fetch(`${ip}/userData/vacation-notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(vacationNote),
    });

    if (!response.ok) {
      const errors = await response.json();
      showAlertSnackbar("حدث خطأ ما", "error");
    } else {
      const data = await response.json();
      showAlertSnackbar("تم الاضافة بنجاح", "success");
    }
  };
  const handleUpdateVacationNote = async () => {
    try {
      const response = await fetch(
        `${ip}/userData/vacation-notes/${vacationNote.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(vacationNote),
        }
      );

      if (!response.ok) throw new Error();
      showAlertSnackbar("تم التعديل بنجاح", "success");
    } catch {
      showAlertSnackbar("حدث خطأ ما", "error");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("access")) handleLogout();
    fetchData();
  }, [vacation]);
  if (!vacationData)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  return (
    <div className="py-2">
      <VacationHeader
        vacation={vacation}
        setVcation={setVcation}
        test={test}
        setTest={setTest}
        rate1={rate1}
        setRate1={setRate1}
        month={month}
        setMonth={setMonth}
      />
      <div className="d-flex justify-content-center">
        <div id="vacation-table" className="vacation-page">
          <div className="text-center my-4">
            {test === "ملاحظات" ? (
              <h2>
                {test} الميدانية {vacation} عن شهر {month}
              </h2>
            ) : (
              <h2>
                اختبار {test} للميدانية {vacation} عن شهر {month}
              </h2>
            )}
          </div>
          {test === "اللياقة" ? (
            <VacationRecords
              SportRecords={vacationData.vacation_records}
              rate1={rate1}
              setOpenAddModal={setOpenAddModal}
              setVacationNote={setVacationNote}
            />
          ) : (
            <VacationNotes
              setOpenAddModal={setOpenAddModal}
              setVacationNote={setVacationNote}
              setOpenUpdateModal={setOpenUpdateModal}
            />
          )}
        </div>
      </div>
      <AddModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        title="اضافة ملاحظات الميدانية"
        fields={VacationNotesRecordFields}
        newRow={vacationNote}
        handleNewRowDataChange={handleVacationNoteChange}
        handleAddNewRow={handleAddVacationNote}
      />

      <UpdateModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        title="تعديل ملاحظات الميدانية"
        fields={VacationNotesRecordFields}
        newRow={vacationNote}
        handleNewRowDataChange={handleVacationNoteChange}
        handleUpdateRow={handleUpdateVacationNote}
      />
      {user.type < 4 && (
        <VacationPDF vacation={vacation} month={month} test={test} />
      )}
    </div>
  );
}

export default Vacation;
