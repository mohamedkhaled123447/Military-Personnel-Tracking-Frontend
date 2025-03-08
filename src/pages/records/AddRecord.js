import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MDBInput, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import "../../style/AddRecord.css";
import {
  sergeantAttributes,
  officerAttributes,
  soldierAttributes,
} from "../../utils/MostUsed";
import { useRecords } from "../../context/RecordsContext";
import { useUser } from "../../context/UserContext";
import { useSettings } from "../../context/SettingsContext";
const AddRecord = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings } = useSettings();
  const updatedSoldierAttributes = soldierAttributes.map((item) => {
    if (item[0] === "classification") {
      const newItem = item;
      newItem[3] = settings
        .find((item) => item.key === "التسكين")
        ?.value.split(",");
      return newItem;
    } else if (item[0] === "job_classification") {
      const newItem = item;
      newItem[3] = settings
        .find((item) => item.key === "الوحدات الفرعية")
        ?.value.split(",");
      return newItem;
    }
    return item;
  });
  const updatedSergeantAttributes = sergeantAttributes.map((item) => {
    if (item[0] === "classification") {
      const newItem = item;
      newItem[3] = settings
        .find((item) => item.key === "التسكين")
        ?.value.split(",");
      return newItem;
    } else if (item[0] === "job_classification") {
      const newItem = item;
      newItem[3] = settings
        .find((item) => item.key === "الوحدات الفرعية")
        ?.value.split(",");
      return newItem;
    }
    return item;
  });

  const target = searchParams.get("target");
  const { user } = useUser();
  const {
    newRecord,
    handleNewRecordChange,
    handleAddRecord,
    setImage,
    loading,
  } = useRecords();
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  if (
    !settings.length ||
    !updatedSergeantAttributes ||
    !updatedSoldierAttributes
  )
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );

  return (
    <>
      {user && (
        <div className="p-3 mb-5">
          <h1 className="text-center mb-3 fs-2 text-primary fw-bolder">
            اضافة بيانات {target}
          </h1>
          <div className="row" dir="rtl">
            <div className="col-lg-4 col-md-6 col-sm-8 mt-3">
              <TextField
                dir="rtl"
                size="small"
                fullWidth
                label="صورة"
                name="image"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            {target === "جندي"
              ? updatedSoldierAttributes.map(
                  ([name, label, is_choice, choices], index) =>
                    !is_choice ? (
                      <div
                        className="col-lg-4 col-md-6 col-sm-8 mt-3"
                        key={index}
                      >
                        <TextField
                          error={newRecord[name] === "" ? true : false}
                          fullWidth
                          size="small"
                          dir="rtl"
                          label={label}
                          name={name}
                          type={
                            name.includes("Date") || name.includes("date")
                              ? "date"
                              : "text"
                          }
                          value={newRecord[name]}
                          onChange={handleNewRecordChange}
                        />
                      </div>
                    ) : (
                      <div
                        className="col-lg-4 col-md-6 col-sm-8 mt-3"
                        key={index}
                      >
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {label}
                          </InputLabel>
                          <Select
                            error={newRecord[name] === "" ? true : false}
                            className="fs-lg"
                            dir="rtl"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newRecord[name]}
                            label={label}
                            name={name}
                            onChange={handleNewRecordChange}
                          >
                            {choices.map((label, index) => (
                              <MenuItem key={index} value={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )
                )
              : target === "ضابط"
              ? officerAttributes.map(
                  ([name, label, is_choice, choices], index) =>
                    !is_choice ? (
                      <div
                        className="col-lg-4 col-md-6 col-sm-8 mt-3"
                        key={index}
                      >
                        <TextField
                          error={newRecord[name] === "" ? true : false}
                          fullWidth
                          size="small"
                          dir="rtl"
                          label={label}
                          name={name}
                          type={
                            name.includes("Date") || name.includes("date")
                              ? "date"
                              : "text"
                          }
                          value={newRecord[name]}
                          onChange={handleNewRecordChange}
                        />
                      </div>
                    ) : (
                      <div
                        className="col-lg-4 col-md-6 col-sm-8 mt-3"
                        key={index}
                      >
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {label}
                          </InputLabel>
                          <Select
                            error={newRecord[name] === "" ? true : false}
                            className="fs-lg"
                            dir="rtl"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newRecord[name]}
                            label={label}
                            name={name}
                            onChange={handleNewRecordChange}
                          >
                            {choices.map((label, index) => (
                              <MenuItem key={index} value={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )
                )
              : updatedSergeantAttributes.map(
                  ([name, label, is_choice, choices], index) =>
                    !is_choice ? (
                      <div
                        className="col-lg-4 col-md-6 col-sm-8 mt-3"
                        key={index}
                      >
                        <TextField
                          error={newRecord[name] === "" ? true : false}
                          fullWidth
                          size="small"
                          dir="rtl"
                          label={label}
                          name={name}
                          type={
                            name.includes("Date") || name.includes("date")
                              ? "date"
                              : "text"
                          }
                          value={newRecord[name]}
                          onChange={handleNewRecordChange}
                        />
                      </div>
                    ) : (
                      <div
                        className="col-lg-4 col-md-6 col-sm-8 mt-3"
                        key={index}
                      >
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {label}
                          </InputLabel>
                          <Select
                            error={newRecord[name] === "" ? true : false}
                            className="fs-lg"
                            dir="rtl"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newRecord[name]}
                            label={label}
                            name={name}
                            onChange={handleNewRecordChange}
                          >
                            {choices.map((label, index) => (
                              <MenuItem key={index} value={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    )
                )}
          </div>
          <div className="text-center">
            {(user.type === 1 || user.type === 2) && (
              <MDBBtn
                className="mt-2 mb-4 bg-primary"
                onClick={handleAddRecord}
              >
                {loading && <MDBSpinner size="sm" role="status" tag="span" />}
                {!loading && "حفظ"}
              </MDBBtn>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddRecord;
