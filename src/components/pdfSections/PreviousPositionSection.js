import React from "react";
import { profilePositionTableHeaders} from "../../utils/MostUsed";
import { converTextToArabic } from "../../utils/tools";

function PreviousPositionSection({ previousPositionData }) {
  return (
    <div className="pe-3">
      <div className="text-end mb-4 mt-4">
        <h1 className="fw-bolder fs-2">
          <span className="border-bottom border-3 border-dark">
            :  الوظائف السابقة
          </span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profilePositionTableHeaders.map(([key,label],index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {previousPositionData.map((record, index) => (
            <tr key={index}>
              {profilePositionTableHeaders.map(([key,label], index) => (
                <td key={index}>{converTextToArabic(record[key],label)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviousPositionSection;
