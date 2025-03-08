import React, { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useAlertSnackbar } from "../../context/AlertSnackbarContext";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
function Backup() {
  const { ip } = useUser();
  const { showAlertSnackbar } = useAlertSnackbar();
  const [file, setFile] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleBackup = async () => {
    const response = await fetch(`${ip}/settings/backup-sqlite/`, {
      method: "POST",
    });
    if (response.ok) {
      showAlertSnackbar("تم حفظ نسخة احتاطية بنجاح", "success");
      window.open(`${ip}/media/db.sqlite3`, "_blank");
    }
  };
  const handleRestore = async () => {
    if (!file) {
      showAlertSnackbar("اختار النسخة الاحتياطية", "error");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${ip}/settings/restore-sqlite/`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      showAlertSnackbar("تم استرجاع النسخة الاحتاطية بنجاح", "success");
      toggleModal()
    }else{
      showAlertSnackbar("حدث خطا ما", "error");
    }
  };
  return (
    <>
      <div
        dir="rtl"
        className="vh-100 d-flex justify-content-around d-flex align-items-center p-5"
      >
        <div
          onClick={handleBackup}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/take-backup.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold">حفظ نسخة احتياطية</span>
        </div>
        <div
          onClick={toggleModal}
          className="w-auto d-flex flex-column align-items-center hover-scale"
        >
          <img
            src="/icons/restore.png"
            alt="Add User"
            className="mb-2"
            style={{ width: "150px", height: "150px" }}
          />
          <span className="text-dark fw-bold">استرجاع النسخة الاحتياطية </span>
        </div>
      </div>
      <MDBModal open={modalOpen} tabIndex="-1">
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>استرجاع النسخة الاحتياطية</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form>
                <div className="mb-3" dir="rtl">
                  <label htmlFor="file" className="form-label">
                    النسخة الاحتياطية
                  </label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                className="rounded-pill"
                onClick={toggleModal}
              >
                إلغاء
              </MDBBtn>

              <MDBBtn
                color="primary"
                className="rounded-pill"
                onClick={handleRestore}
              >
                استرجاع
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Backup;
