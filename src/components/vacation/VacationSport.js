import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { calc_sport, calculateBMI, lowerBound } from "../../utils/tools";
import { profileSportTableHeaders } from "../../utils/MostUsed";
const color = {
  0: "#d9b40f",
  1: "#42f554",
  2: "#d9990f",
  3: "#d9200f",
};
export default function VacationSport({ sportRecords }) {
  return (
    <MDBContainer>
      <h2 className="text-end">:اللياقة</h2>
      <MDBTable align="middle" className="text-black">
        <MDBTableHead>
          <tr className="text-center">
            {profileSportTableHeaders.map(([name, lable], index) => (
              <th className="fw-bold" key={index} scope="col">
                {lable}
              </th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {sportRecords.map((record, index) => (
            <tr className="text-center">
              {profileSportTableHeaders.map(([name, lable], index) =>
                name === "bmi" ? (
                  <td
                    key={index}
                    style={{
                      fontWeight: "bold",
                      color: `${
                        color[
                          lowerBound(
                            [18.4, 24.9, 30, 40],
                            calculateBMI(record["weight"], record["height"])
                          )
                        ]
                      }`,
                    }}
                  >
                    {calculateBMI(record["weight"], record["height"])}
                  </td>
                ) : (
                  <td key={index}>{record[name]}</td>
                )
              )}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
