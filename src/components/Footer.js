import React from "react";
export default function App() {
  return (
    <div
      className="text-center pt-2"
      style={{
        backgroundColor: "#f7f7f7",
        position: "fixed",
        bottom: "0px",
        left: "0px",
        width:"100%",
        zIndex:50
      }}
    >
      <p className="fw-bold" style={{ fontSize: "13px" }}>
        جميع الحقوق محفوظة  &copy; 2024
      </p>
    </div>
  );
}
