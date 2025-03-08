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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MultipleSelect from '../MultipleSelect'
export default function AddModal({
  title,
  fields,
  newRow,
  handleNewRowDataChange,
  handleUpdateRow,
  open,
  setOpen,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <MDBModal open={open} tabIndex={-1}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setOpen(!open)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="row">
                {fields.map(([name, label, type, choices], index) => (
                  <div className="col-6 mt-2" key={index}>
                    {type === 1 ? (
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        name={name}
                        label={label}
                        value={newRow[name]}
                        onChange={handleNewRowDataChange}
                      />
                    ) : type === 2 ? (
                      <TextField
                        fullWidth
                        size="small"
                        name={name}
                        label={label}
                        value={newRow[name]}
                        onChange={handleNewRowDataChange}
                      />
                    ) : type === 3 ? (
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          {label}
                        </InputLabel>
                        <Select
                          label={label}
                          name={name}
                          value={newRow[name]}
                          onChange={handleNewRowDataChange}
                        >
                          {choices.map((label, index) => (
                            <MenuItem key={index} value={label}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) :type === 4 ? (
                      <TextField
                        fullWidth
                        type="date"
                        size="small"
                        name={name}
                        label={label}
                        value={newRow[name]}
                        onChange={handleNewRowDataChange}
                      />
                    ) : (
                      <MultipleSelect
                        choices={choices}
                        label={label}
                        name={name}
                        handleNewRowDataChange={handleNewRowDataChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type="button" onClick={handleUpdateRow}>
                تعديل
              </MDBBtn>
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
