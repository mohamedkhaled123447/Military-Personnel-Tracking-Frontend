import React from "react";
import { profileSportTableHeaders } from "../../utils/MostUsed";
import { calculateBMI, converTextToArabic } from "../../utils/tools";

function SportSection({ sportData }) {
  return (
    <div className="pe-3">
      <div className="text-end mb-4 mt-4">
        <h1 className="fw-bolder fs-2">
          <span className="border-bottom border-3 border-dark">
            :مستوي اللياقة
          </span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profileSportTableHeaders.map(([key, label], index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sportData.map((record, index) => (
            <tr key={index}>
              {profileSportTableHeaders.map(([key, label], index) => (
                <td key={index}>
                  {key === "bmi"
                    ? converTextToArabic(
                        calculateBMI(record.weight, record.height),
                        label
                      )
                    : converTextToArabic(record[key], label)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SportSection;
