import React, { createContext, useState, useContext } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const ConfirmSnackbarContext = createContext();

export const useConfirmSnackbar = () => useContext(ConfirmSnackbarContext);

export const ConfirmSnackbarProvider = ({ children }) => {
  const [confirmSnackbarState, setConfirmSnackbarState] = useState({
    open: false,
    message: "",
    onConfirm: () => {}, // Default no-op
    onCancel: () => {}, // Default no-op
  });

  const showConfirmSnackbar = (message, onConfirm, onCancel) => {
    setConfirmSnackbarState({
      open: true,
      message,
      onConfirm,
      onCancel,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return; // Ignore clickaway events

    setConfirmSnackbarState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleConfirm = () => {
    confirmSnackbarState.onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    confirmSnackbarState.onCancel();
    handleClose();
  };

  return (
    <ConfirmSnackbarContext.Provider value={{ showConfirmSnackbar }}>
      {children}
      <MDBModal open={confirmSnackbarState.open} tabIndex={-1}>
        <MDBModalDialog centered size="sm">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="fs-4 fw-bold text-center d-flex justify-content-center">
              <span> تأكيد الحذف</span>
              <ReportProblemIcon fontSize="large" />
            </MDBModalBody>

            <MDBModalFooter className="d-felx justify-content-center">
              <MDBBtn
                type="button"
                onClick={handleConfirm}
                color="success"
              >
                موافقة
              </MDBBtn>
              <MDBBtn
                type="button"
                onClick={handleClose}
                color="danger"
              >
                رفض
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </ConfirmSnackbarContext.Provider>
  );
};
