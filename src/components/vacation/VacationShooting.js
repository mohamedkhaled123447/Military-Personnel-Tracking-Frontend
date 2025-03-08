import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { profileShootingTableHeaders } from "../../utils/MostUsed";
export default function VacationShooting({ shootingRecords }) {
  return (
    <MDBContainer>
      <h2 className="text-end">:الرماية</h2>
      <MDBTable align="middle" className="text-black">
        <MDBTableHead>
          <tr className="text-center">
            {profileShootingTableHeaders.map(([name, lable], index) => (
              <th className="fw-bold" key={index} scope="col">
                {lable}
              </th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {shootingRecords.map((record, index) => (
            <tr className="text-center">
              {profileShootingTableHeaders.map(([name, lable], index) => (
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
