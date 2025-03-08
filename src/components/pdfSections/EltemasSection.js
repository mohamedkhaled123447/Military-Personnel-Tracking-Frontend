import React from "react";
import { profileEltemasTableHeaders } from "../../utils/MostUsed";
import { converTextToArabic } from "../../utils/tools";
function EltemasSection({ eltemasData }) {
  return (
    <div className="pe-3">
      <div className="text-end mb-4 mt-4">
        <h1 className="fw-bolder fs-2">
          <span className="border-bottom border-3 border-dark">:الالتماسات</span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profileEltemasTableHeaders.map(([key,label],index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {eltemasData.map((record, index) => (
            <tr key={index}>
              {profileEltemasTableHeaders.map(([key,label], index) => (
                <td key={index}>{converTextToArabic( record[key],label)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EltemasSection;
