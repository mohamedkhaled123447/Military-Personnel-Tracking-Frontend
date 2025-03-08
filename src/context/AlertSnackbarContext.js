import React, { createContext, useState, useContext } from "react";
import { Alert, Snackbar } from "@mui/material";

// Create a Context for Alert Snackbar
const AlertSnackbarContext = createContext();

// Create a provider component
export function AlertSnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showAlertSnackbar = (message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <AlertSnackbarContext.Provider value={{ showAlertSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={severity}
          sx={{
            width: "450px",
            height: "60px",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertSnackbarContext.Provider>
  );
}

// Custom hook to use the AlertSnackbar context
export function useAlertSnackbar() {
  return useContext(AlertSnackbarContext);
}
