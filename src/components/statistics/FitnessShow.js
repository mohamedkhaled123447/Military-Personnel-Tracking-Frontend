import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { TextField } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const Map = {
  0: 0,
  1: 3,
  2: 2,
  3: 1,
};
function FitnessShow() {
  const { ip } = useUser();
  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [vacation, setVacation] = useState({
    الاولي: 1,
    الثانية: 1,
    الثالثة: 1,
    الرابعة: 1,
  });
  const [column, setColumn] = useState("percentage");
  const [sortDirection, setSortDirection] = useState("asc");
  const fetchData = async () => {
    const response = await fetch(`${ip}/userData/fitness-show/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    const data = await response.json();
    setData(data.records);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  const sortedData = () => {
    const dataCopy = [...data];
    if (column === "running") {
      return dataCopy.sort((a, b) => {
        const aMapped = Map[Number(a.fitness_records[0][column])];
        const bMapped = Map[Number(b.fitness_records[0][column])];
        if (sortDirection === "asc") {
          return aMapped > bMapped ? -1 : 1;
        } else {
          return aMapped < bMapped ? -1 : 1;
        }
      });
    }

    return dataCopy.sort((a, b) => {
      const aValue = Number(a.fitness_records[0][column]);
      const bValue = Number(b.fitness_records[0][column]);
      if (sortDirection === "asc") {
        return aValue > bValue ? -1 : 1;
      } else {
        return aValue < bValue ? -1 : 1;
      }
    });
  };
  const filteredData = () => {
    let dataCopy = [...sortedData()];

    Object.keys(vacation).forEach((key) => {
      if (!vacation[key]) {
        dataCopy = dataCopy.filter((record) => record.vacation !== key);
      }
    });
    dataCopy = dataCopy.filter((record, index) => index < limit);
    return dataCopy;
  };

  return (
    <div>
      <h1 className="text-center">كشف اللياقة</h1>
      <div className="d-flex flex-row-reverse justify-content-center mt-4">
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setVacation((pre) => ({
              ...pre,
              الاولي: !pre.الاولي,
            }))
          }
          pill
          light
          color={vacation.الاولي ? "success" : "danger"}
          className="mx-1"
        >
          الميدانية الاولي
        </MDBBadge>
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setVacation((pre) => ({
              ...pre,
              الثانية: !pre.الثانية,
            }))
          }
          pill
          light
          color={vacation.الثانية ? "success" : "danger"}
          className="mx-1"
        >
          الميدانية الثانية
        </MDBBadge>
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setVacation((pre) => ({
              ...pre,
              الثالثة: !pre.الثالثة,
            }))
          }
          pill
          light
          color={vacation.الثالثة ? "success" : "danger"}
          className="mx-1"
        >
          الميدانية الثالثة
        </MDBBadge>
        <MDBBadge
          style={{ cursor: "pointer" }}
          onClick={() =>
            setVacation((pre) => ({
              ...pre,
              الرابعة: !pre.الرابعة,
            }))
          }
          pill
          light
          color={vacation.الرابعة ? "success" : "danger"}
          className="mx-1"
        >
          الميدانية الرابعة
        </MDBBadge>
      </div>
      <MDBTable
        dir="rtl"
        className="mt-1 text-black caption-top"
        align="middle"
      >
        <caption className="text-end">
          <TextField
            variant="standard"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            size="small"
          />
        </caption>
        <MDBTableHead>
          <tr className="text-center">
            <th className="fw-bold hover-pointer">م</th>
            <th className="fw-bold w-25" style={{ cursor: "pointer" }}>
              الاسم
            </th>
            <th className="fw-bold" style={{ cursor: "pointer" }}>
              الميدانية
            </th>
            <th
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortDirection((pre) => (pre === "asc" ? "desc" : "asc"));
                setColumn("percentage");
              }}
            >
              نسبة اللياقة
              {column === "percentage" &&
                (sortDirection === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </th>
            <th
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortDirection((pre) => (pre === "asc" ? "desc" : "asc"));
                setColumn("running");
              }}
            >
              الضاحية
              {column === "running" &&
                (sortDirection === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </th>
            <th
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortDirection((pre) => (pre === "asc" ? "desc" : "asc"));
                setColumn("pull_up");
              }}
            >
              عقلة
              {column === "pull_up" &&
                (sortDirection === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </th>
            <th
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortDirection((pre) => (pre === "asc" ? "desc" : "asc"));
                setColumn("push_up");
              }}
            >
              ضغط
              {column === "push_up" &&
                (sortDirection === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </th>
            <th
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortDirection((pre) => (pre === "asc" ? "desc" : "asc"));
                setColumn("crunch");
              }}
            >
              بطن
              {column === "crunch" &&
                (sortDirection === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </th>
            <th
              className="fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSortDirection((pre) => (pre === "asc" ? "desc" : "asc"));
                setColumn("running_rate");
              }}
            >
              جري معدل
              {column === "running_rate" &&
                (sortDirection === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </th>
            <th className="fw-bold">ملاحظات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredData().map((record, index) => (
            <tr className="text-center" key={index}>
              <td>{index + 1}</td>
              <td>{record.name}</td>
              <td>{record.vacation}</td>
              <td>{record.fitness_records[0].percentage}</td>
              <td>{record.fitness_records[0].running}</td>
              <td>{record.fitness_records[0].pull_up}</td>
              <td>{record.fitness_records[0].push_up}</td>
              <td>{record.fitness_records[0].crunch}</td>
              <td>{record.fitness_records[0].running_rate}</td>
              <td>{record.fitness_records[0].notes}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}

export default FitnessShow;
