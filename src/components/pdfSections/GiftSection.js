import React from "react";
import { profileGiftTableHeaders } from "../../utils/MostUsed";
import { converTextToArabic } from "../../utils/tools";

function GiftSection({ giftData }) {
  return (
    <div className="pe-3">
      <div className="text-end mb-4 mt-4">
        <h1 className="pdf-header fs-2">
          <span className="pdf-underline">:المنح/المكافئات</span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profileGiftTableHeaders.map(([key,label],index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {giftData.map((record, index) => (
            <tr key={index}>
              {profileGiftTableHeaders.map(([key,label], index) => (
                <td key={index}>{converTextToArabic(record[key],label)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GiftSection;
