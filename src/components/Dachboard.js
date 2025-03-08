import React, { useEffect, useState } from "react";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import DonutChart from "./charts/DonutChart";
import { Person } from "@mui/icons-material";
import { useUser } from "../context/UserContext";
import { monthsInArabic } from "../utils/MostUsed";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import FitnessShow from "./statistics/FitnessShow";
import Navbar from "./Navbar";
import { MDBBadge } from "mdb-react-ui-kit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EducationShow from "./statistics/EducationShow";
const Items = [
  "تمام الفوج",
  "اللياقة والتعليم",
  "تاريخ التجنيد والتسريح",
  "الدرجات والرتب",
  "الوحدات الفرعية",
  "التسكين والميدانيات",
  "معدل الجزاءات",
  "كشف اللياقة",
  "كشف التعليم",
];
function Dachboard() {
  const { ip, handleLogout } = useUser();
  const [section, setSection] = useState(0);
  const [chartsData, setChartsData] = useState(null);
  const [chartsDate, setChartsDate] = useState({
    from: "يناير",
    to: "ديسمبر",
    year: new Date().getFullYear(),
  });
  const handleChartsDateChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setChartsDate((preDate) => ({
      ...preDate,
      [name]: value,
    }));
  };
  const fetchData = async () => {
    const response = await fetch(
      `${ip}/userData/statistics/?from=${chartsDate.from}&to=${chartsDate.to}&year=${chartsDate.year}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );
    if (!response.ok) handleLogout();
    const data = await response.json();
    setChartsData(data);
  };
  useEffect(() => {
    fetchData();
  }, [chartsDate]);
  if (!chartsData)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  return (
    <div className="mt-4 mb-4">
      <div className="d-flex justify-content-center align-items-center py-3">
        <ArrowBackIosIcon
          onClick={() =>
            setSection((pre) => (pre === 0 ? Items.length - 1 : pre - 1))
          }
          className="me-4 text-primary fs-3"
          style={{ cursor: "pointer" }}
        />

        <MDBBadge light color="info" className="fs-4">
          {Items[section]}
        </MDBBadge>

        <ArrowForwardIosIcon
          onClick={() => setSection((pre) => (pre + 1) % Items.length)}
          className="ms-4 text-primary fs-3"
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="w-100 p-4">
        {section === 0 && (
          <div className="row">
            <div className="row text-center mb-4">
              <h1>تمام الفوج</h1>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <span className="fs-4 mx-1">مجند</span>
                  <span className="fs-4">{chartsData.soliders}</span>
                  <Person fontSize="large" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <span className="fs-4 mx-1">ضابط صف</span>
                  <span className="fs-4">
                    {chartsData.total -
                      chartsData.soliders -
                      chartsData.officers}
                  </span>
                  <Person fontSize="large" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <span className="fs-4 mx-1">ضابط</span>
                  <span className="fs-4">{chartsData.officers}</span>
                  <Person fontSize="large" />
                </div>
              </div>
            </div>
          </div>
        )}
        {section === 1 && (
          <div className="row">
            <div className="row text-center">
              <h2>توقيت الإحصائية</h2>
            </div>
            <div className="col-4 mt-2">
              <TextField
                size="small"
                type="number"
                fullWidth
                name="year"
                value={chartsDate.year}
                label="السنة"
                onChange={handleChartsDateChange}
              />
            </div>
            <div className="col-4 mt-2">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">{"من"}</InputLabel>
                <Select
                  className="fs-lg"
                  dir="rtl"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="من"
                  value={chartsDate.from}
                  name="from"
                  onChange={handleChartsDateChange}
                >
                  {monthsInArabic.map((label, index) => (
                    <MenuItem key={index} value={label}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-4 mt-2">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">{"الي"}</InputLabel>
                <Select
                  className="fs-lg"
                  dir="rtl"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="من"
                  value={chartsDate.to}
                  name="to"
                  onChange={handleChartsDateChange}
                >
                  {monthsInArabic.map((label, index) => (
                    <MenuItem key={index} value={label}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-6 mt-2">
              <LineChart
                title="متوسط لياقة الفوج"
                x={chartsData.sports.keys}
                series={[
                  {
                    name: "النسبة",
                    data: chartsData.sports.values,
                  },
                ]}
                min={10}
                max={100}
              />
            </div>
            <div className="col-6 mt-2">
              <LineChart
                title="متوسط تعليم الفوج"
                x={chartsData.educations.keys}
                series={[
                  {
                    name: "النسبة",
                    data: chartsData.educations.values,
                  },
                ]}
                min={10}
                max={100}
              />
            </div>
          </div>
        )}
        {section === 2 && (
          <div className="row">
            <div className="col-6 mt-2">
              <BarChart
                title="تاريخ التجنيد"
                x={Object.keys(chartsData.getInDate)}
                y={Object.values(chartsData.getInDate)}
                name="قوة"
              />
            </div>
            <div className="col-6 mt-2">
              <BarChart
                title="تاريخ التسريح"
                x={Object.keys(chartsData.getOutDate)}
                y={Object.values(chartsData.getOutDate)}
                name="قوة"
              />
            </div>
          </div>
        )}
        {section === 3 && (
          <div className="row">
            <div className="col-6 mt-2">
              <BarChart
                title="الدرجات"
                x={Object.keys(chartsData.dgree)}
                y={Object.values(chartsData.dgree)}
                name="قوة"
              />
            </div>
            <div className="col-6 mt-2">
              <BarChart
                title="الرتب"
                x={Object.keys(chartsData.rank)}
                y={Object.values(chartsData.rank)}
                name="قوة"
              />
            </div>
          </div>
        )}
        {section === 4 && (
          <div className="mt-2">
            <BarChart
              title="الوحدات الفرعية"
              x={Object.keys(chartsData.job_classification)}
              y={Object.values(chartsData.job_classification)}
              name="قوة"
            />
          </div>
        )}
        {section === 5 && (
          <div className="row">
            <div className="col-6 mt-2">
              <PieChart
                title="الميدانيات"
                labels={Object.keys(chartsData.vacation)}
                colors={["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"]}
                values={Object.values(chartsData.vacation)}
              />
            </div>
            <div className="col-6 mt-2">
              <DonutChart
                title="التسكين"
                labels={Object.keys(chartsData.classification)}
                colors={["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"]}
                values={Object.values(chartsData.classification)}
              />
            </div>
          </div>
        )}
        {section === 6 && (
          <div className="mt-2">
            <LineChart
              title="معدل الجزاءات"
              x={[
                "يناير",
                "فبراير",
                "مارس",
                "أبريل",
                "مايو",
                "يونيو",
                "يوليو",
                "أغسطس",
                "سبتمبر",
                "أكتوبر",
                "نوفمبر",
                "ديسمبر",
              ]}
              series={[
                {
                  name: "حبس بالوحدة",
                  data: [2, 6, 3, 1, 3, 4, 9, 6, 5, 2, 1, 2],
                },
                {
                  name: "حجز بالوحدة",
                  data: [10, 13, 9, 4, 3, 5, 6, 2, 1, 3, 9, 2],
                },
              ]}
            />
          </div>
        )}
        {section === 7 && <FitnessShow />}
        {section === 8 && <EducationShow />}
      </div>
    </div>
  );
}

export default Dachboard;
