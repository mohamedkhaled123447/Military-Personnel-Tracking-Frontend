import React, { useState, useEffect } from "react";
import PieChart from "../charts/PieChart";
import DonutChart from "../charts/DonutChart";
import { calculateBMI, lowerBound } from "../../utils/tools";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Add, Details } from "@mui/icons-material";
import VacationModal from "../Modals/VacationModal";
const map = {
  1: "زمن اول",
  2: "زمن تاني",
  3: "زمن تالت",
  0: "خارج الزمن",
};
const color = {
  0: "#d9b40f",
  1: "#42f554",
  2: "#d9990f",
  3: "#d9200f",
};
function VacationRecords({
  SportRecords,
  rate1,
  setOpenAddModal,
  setVacationNote,
}) {
  const [open, setOpen] = useState(false);
  const [curRecord, setCurRecord] = useState(0);
  const chartsData = () => {
    const temp = [0, 0, 0, 0];
    const temp1 = [0, 0, 0, 0];
    SportRecords.forEach((element) => {
      const percentage = Number(element.fitness_records[0].percentage);
      const running = Number(element.fitness_records[0].running);
      if (percentage === 0) return;
      if (percentage < 50) temp[0]++;
      else if (percentage < 75) temp[1]++;
      else if (percentage < 90) temp[2]++;
      else temp[3]++;
      if (running === 0) temp1[3]++;
      else if (running === 1) temp1[0]++;
      else if (running === 2) temp1[1]++;
      else temp1[2]++;
    });
    return [temp, temp1];
  };

  if (!SportRecords || !SportRecords.length)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-grow" role="status"></div>
      </div>
    );

  return (
    <div className="position-relative">
      <MDBTable dir="rtl" className="mt-4 text-black" align="middle">
        <MDBTableHead>
          <tr className="text-center">
            <th className="fw-bold">م</th>
            <th className="fw-bold">الاسم</th>
            <th className="fw-bold">نسبة اللياقة</th>
            <th className="fw-bold">الضاحية</th>
            <th className="fw-bold">نسبة التعليم</th>
            <th className="fw-bold">الرماية</th>
            <th className="fw-bold">التناسق(BMI)</th>
            <th className="fw-bold">ملاحظات</th>
            <th className="fw-bold">الاجراءات</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {SportRecords.map((record, index) => (
            <>
              <tr className="text-center table-secondary" key={index * 2 + 1}>
                <td className="align-middle">{index + 1}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => window.open(`/records/user/${record.id}/`)}
                >
                  {record.name}
                </td>
                {Number(record.first_record.fitness_percentage) >= rate1 ? (
                  <td className="bg-success">
                    {record.first_record.fitness_percentage}
                  </td>
                ) : (
                  <td className="bg-danger">
                    {record.first_record.fitness_percentage}
                  </td>
                )}

                <td>{map[record.first_record.running_value]}</td>
                <td>{record.first_record.education_percentage}</td>
                <td>{record.first_record.shooting_value}</td>
                <td
                  style={{
                    fontWeight: "bold",
                    color: `${
                      color[
                        lowerBound(
                          [18.4, 24.9, 30, 40],
                          calculateBMI(
                            record.first_record.weight,
                            record.first_record.height
                          )
                        )
                      ]
                    }`,
                  }}
                >
                  {calculateBMI(
                    record.first_record.weight,
                    record.first_record.height
                  )}
                </td>
                <td>{record.first_record.notes}</td>
                <td>
                  <Details
                    style={{ cursor: "pointer" }}
                    className="ms-2"
                    onClick={() => {
                      setCurRecord(index);
                      setOpen(true);
                    }}
                  />
                  <Add
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setVacationNote((pre) => ({
                        ...pre,
                        name: record.name,
                        governorate: record.fullAddress,
                        grade: record.dgree,
                        fieldwork_location: record.vacation,
                        sub_unit: record.job_classification,
                      }));
                      setOpenAddModal(true);
                    }}
                  />
                </td>
              </tr>
              <tr className="text-center" key={index * 2 + 2}>
                <td></td>
                <td></td>
                <td>{record.second_record.fitness_percentage}</td>
                <td>{map[record.second_record.running_value]}</td>
                <td>{record.second_record.education_percentage}</td>
                <td>{record.second_record.shooting_value}</td>
                <td
                  style={{
                    fontWeight: "bold",
                    color: `${
                      color[
                        lowerBound(
                          [18.4, 24.9, 30, 40],
                          calculateBMI(
                            record.second_record.weight,
                            record.second_record.height
                          )
                        )
                      ]
                    }`,
                  }}
                >
                  {calculateBMI(
                    record.second_record.weight,
                    record.second_record.height
                  )}
                </td>
                <td>{record.second_record.notes}</td>
              </tr>
            </>
          ))}
        </MDBTableBody>
      </MDBTable>
      <VacationModal
        open={open}
        setOpen={setOpen}
        record={SportRecords[curRecord]}
      />
      <div className="row mt-5">
        <div className="col-6 mt-5">
          <PieChart
            title="مستوي اللياقة"
            labels={["0-50", "50-75", "75-90", "90-100"]}
            colors={["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"]}
            values={chartsData()[0]}
          />
        </div>
        <div className="col-6 mt-5">
          <DonutChart
            title="الضاحية"
            labels={["زمن اول", "زمن ثاني", "زمن ثالث", "خارج الزمن"]}
            colors={["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"]}
            values={chartsData()[1]}
          />
        </div>
      </div>
    </div>
  );
}

export default VacationRecords;
