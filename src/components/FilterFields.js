import React from "react";
import { useSearchParams } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import "../style/FilterFields.css"; // Import the CSS file
import { TextField } from "@mui/material";
import {
  officerFilterNames,
  sergeantFilterNames,
  soldierFilterNames,
} from "../utils/MostUsed";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRecords } from "../context/RecordsContext";
import { useSettings } from "../context/SettingsContext";
const FilterFields = () => {
  const { settings } = useSettings();
  const [searchParams, setSearchParams] = useSearchParams();

  const target = searchParams.get("target");
  const updatedSoldierFilterNames = soldierFilterNames.map((item) => {
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
  const updatedSergeantFilterNames = sergeantFilterNames.map((item) => {
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
  const filterNames =
    target === "جندي"
      ? updatedSoldierFilterNames
      : target === "ضابط"
      ? officerFilterNames
      : updatedSergeantFilterNames;
  const { fetchData, filters, handleFilterChange, resetFilters } = useRecords();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchData(1, target);
    }
  };
  if (!settings.length)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  return (
    <div className="filter-container">
      <h3 className="text-center fw-bold">عناصر البحث</h3>
      <div className="row" dir="rtl">
        {filterNames.map(([name, label, type, choices], index) => (
          <div className="col-lg-4 col-md-6 mt-3" key={index}>
            {type === 1 ? (
              <TextField
                fullWidth
                size="small"
                type="number"
                name={name}
                label={label}
                value={filters[name]}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
              />
            ) : type === 2 ? (
              <TextField
                fullWidth
                size="small"
                name={name}
                label={label}
                value={filters[name]}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
              />
            ) : type === 3 ? (
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                  label={label}
                  name={name}
                  value={filters[name]}
                  onChange={handleFilterChange}
                  onKeyDown={handleKeyDown}
                >
                  {choices.map((label, index) => (
                    <MenuItem key={index} value={label}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                type="date"
                size="small"
                name={name}
                label={label}
                value={filters[name]}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center m-3">
        <MDBBtn className="me-4" onClick={resetFilters}>
          اعادة ضبط
        </MDBBtn>
        <MDBBtn onClick={() => fetchData(1, target)}>بحث</MDBBtn>
      </div>
    </div>
  );
};

export default FilterFields;
