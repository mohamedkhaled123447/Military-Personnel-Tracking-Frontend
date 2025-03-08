import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit'; // You can use any icon library or custom icons
import '../style/FloatingButton.css'; // Import the CSS file

const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      <MDBIcon fas icon="plus" />
    </button>
  );
};

export default FloatingButton;
