import React from "react";
import {
  soldierAttributes,
  officerAttributes,
  sergeantAttributes,
} from "../../utils/MostUsed";
import { MDBBtn } from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { useUser } from "../../context/UserContext";
import { useSettings } from "../../context/SettingsContext";
function ProfileInfo({
  profileData,
  handleProfileDataChange,
  handleUpdateProfileDate,
}) {
  const { settings } = useSettings();
  const { user } = useUser();
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
      <div className="text-end">
        <h2>
          <span>: البيانات الشخصية</span>
        </h2>
      </div>
      <div className="row" dir="rtl">
        {profileData["is_officer"]
          ? officerAttributes.map(([name, label, is_choice, choices], index) =>
              !is_choice ? (
                <div className="col-lg-4 col-md-6 col-sm-8 mt-3" key={index}>
                  <TextField
                    fullWidth
                    size="small"
                    sx={{ fontWeight: "bold" }}
                    dir="rtl"
                    label={label}
                    name={name}
                    type={
                      name.includes("Date") || name.includes("date")
                        ? "date"
                        : "text"
                    }
                    value={profileData[name]}
                    onChange={handleProfileDataChange}
                  />
                </div>
              ) : (
                <div className="col-lg-4 col-md-6 col-sm-8 mt-3" key={index}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      {label}
                    </InputLabel>
                    <Select
                      className="fs-lg"
                      dir="rtl"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={profileData[name]}
                      label={label}
                      name={name}
                      onChange={handleProfileDataChange}
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
          : profileData["is_soldier"]
          ? updatedSoldierAttributes.map(
              ([name, label, is_choice, choices], index) =>
                !is_choice ? (
                  <div className="col-lg-4 col-md-6 col-sm-8 mt-3" key={index}>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{ fontWeight: "bold" }}
                      dir="rtl"
                      label={label}
                      name={name}
                      type={
                        name.includes("Date") || name.includes("date")
                          ? "date"
                          : "text"
                      }
                      value={profileData[name]}
                      onChange={handleProfileDataChange}
                    />
                  </div>
                ) : (
                  <div className="col-lg-4 col-md-6 col-sm-8 mt-3" key={index}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        {label}
                      </InputLabel>
                      <Select
                        className="fs-lg"
                        dir="rtl"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={profileData[name]}
                        label={label}
                        name={name}
                        onChange={handleProfileDataChange}
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
                  <div className="col-lg-4 col-md-6 col-sm-8 mt-3" key={index}>
                    <TextField
                      fullWidth
                      size="small"
                      sx={{ fontWeight: "bold" }}
                      dir="rtl"
                      label={label}
                      name={name}
                      type={name.includes("Date") ? "date" : "text"}
                      value={profileData[name]}
                      onChange={handleProfileDataChange}
                    />
                  </div>
                ) : (
                  <div className="col-lg-4 col-md-6 col-sm-8 mt-3" key={index}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        {label}
                      </InputLabel>
                      <Select
                        className="fs-lg"
                        dir="rtl"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={profileData[name]}
                        label={label}
                        name={name}
                        onChange={handleProfileDataChange}
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
      <div>
        {(user.type === 1 || user.type === 2) && (
          <MDBBtn className="m-3 no-print" onClick={handleUpdateProfileDate}>
            تحديث
          </MDBBtn>
        )}
      </div>
    </>
  );
}

export default ProfileInfo;
