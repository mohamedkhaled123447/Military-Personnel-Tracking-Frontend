import React from "react";
import {
  profileLeaderOpinionTableHeaders,
} from "../../utils/MostUsed";
import { converTextToArabic } from "../../utils/tools";

function LeaderOpinionSection({ leaderOpinionData }) {
  return (
    <div className="pe-3 mt-4">
      <div className="text-end mb-4 mt-1">
        <h1 className="fw-bolder fs-2">
          <span className="border-bottom border-3 border-dark">
            :رأي القائد المباشر
          </span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profileLeaderOpinionTableHeaders.map(([key,label],index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaderOpinionData.map((record, index) => (
            <tr key={index}>
              {profileLeaderOpinionTableHeaders.map(([key,label], index) => (
                <td key={index}>{converTextToArabic(record[key],label)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderOpinionSection;
