import React, { useEffect, useRef, useState } from "react";
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
import VacationSport from "../vacation/VacationSport";
import VacationEducation from "../vacation/VacationEducation";
import VacationShooting from "../vacation/VacationShooting";

export default function VacationModal({ open, setOpen, record }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <MDBModal open={open} tabIndex={-1}>
        <MDBModalDialog centered size="fullscreen">
          <MDBModalContent>
            <MDBModalBody>
              <h1 className="text-center mb-5">{record.name}</h1>
              <VacationSport sportRecords={record.fitness_records} />
              <VacationEducation educationRecords={record.education_records} />
              <VacationShooting shootingRecords={record.shooting_records} />
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type="button" onClick={() => setOpen(!open)}>
                اغلاق
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
