import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { profileEducationTableHeaders } from "../../utils/MostUsed";
export default function VacationEducation({ educationRecords }) {
  return (
    <MDBContainer>
      <h2 className="text-end">:التعليم</h2>
      <MDBTable align="middle" className="text-black">
        <MDBTableHead>
          <tr className="text-center">
            {profileEducationTableHeaders.map(([name, lable], index) => (
              <th className="fw-bold" key={index} scope="col">
                {lable}
              </th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {educationRecords.map((record, index) => (
            <tr className="text-center">
              {profileEducationTableHeaders.map(([name, lable], index) => (
                <th key={index} scope="col">
                  {record[name]}
                </th>
              ))}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
