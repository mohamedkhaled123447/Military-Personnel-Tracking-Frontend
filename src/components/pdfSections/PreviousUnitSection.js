import React from "react";
import { profileUnitTableHeaders} from "../../utils/MostUsed";
import { converTextToArabic } from "../../utils/tools";

function PreviousUnitSection({ previousUnitData }) {
  return (
    <div className="pe-3">
      <div className="text-end mb-4 mt-4">
        <h1 className="fw-bolder fs-2">
          <span className="border-bottom border-3 border-dark">
            :  الوحدات السابقة
          </span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profileUnitTableHeaders.map(([key,label],index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {previousUnitData.map((record, index) => (
            <tr key={index}>
              {profileUnitTableHeaders.map(([key,label], index) => (
                <td key={index}>{converTextToArabic(record[key],label)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviousUnitSection;
