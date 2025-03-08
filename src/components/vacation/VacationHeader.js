import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { monthsInArabic } from "../../utils/MostUsed";
import { useUser } from "../../context/UserContext";
function VacationHeader({
  vacation,
  setVcation,
  test,
  setTest,
  rate1,
  setRate1,
  month,
  setMonth,
}) {
  const { ip } = useUser();
  const downloadReports = async () => {
    const formData = new FormData();
    formData.append("vacation", vacation);
    const response = await fetch(`${ip}/userData/reports/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      const links = data.links;
      for (let i = 0; i < Object.keys(links).length; i++) {
        setTimeout(() => {
          window.open(links[Object.keys(links)[i]], "_blank");
        }, i * 500);
      }
    }
  };

  return (
    <>
      <div className="text-center mb-4">
        <h1>الميدانيات</h1>
      </div>
      <div className="d-flex justify-content-center px-4">
        <FormControl size="small" fullWidth className="mx-2">
          <InputLabel id="demo-simple-select-label">الميدانية</InputLabel>
          <Select
            className="fs-lg"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vacation}
            label="الميدانية"
            name="vacation"
            onChange={(e) => setVcation(e.target.value)}
          >
            <MenuItem value="الاولي">الاولي</MenuItem>
            <MenuItem value="الثانية">الثانية</MenuItem>
            <MenuItem value="الثالثة">الثالثة</MenuItem>
            <MenuItem value="الرابعة">الرابعة</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth className="mx-2">
          <InputLabel id="demo-simple-select-label">الاختبار</InputLabel>
          <Select
            className="fs-lg"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={test}
            label="الاختبار"
            name="test"
            onChange={(e) => setTest(e.target.value)}
          >
            <MenuItem value="اللياقة">الميدانية</MenuItem>
            <MenuItem value="ملاحظات">ملاحظات</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth className="mx-2">
          <InputLabel id="demo-simple-select-label">الشهر</InputLabel>
          <Select
            className="fs-lg"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="الشهر"
            name="month"
            onChange={(e) => setMonth(e.target.value)}
          >
            {monthsInArabic.map((month, index) => (
              <MenuItem key={index} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="mx-2"
          label="نسبة الخصم"
          size="small"
          value={rate1}
          fullWidth
          dir="rtl"
          type="number"
          onChange={(e) => setRate1(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <img
          src="/icons/word.png"
          alt="Add User"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
          onClick={downloadReports}
        />
      </div>
    </>
  );
}

export default VacationHeader;
