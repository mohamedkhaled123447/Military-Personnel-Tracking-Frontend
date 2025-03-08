import React from "react";
import { profileCourseTableHeaders} from "../../utils/MostUsed";
import { converTextToArabic } from "../../utils/tools";
function CourseSection({ courseData }) {
  return (
    <div className="pe-3">
      <div className="text-end mb-4 mt-4">
        <h1 className="fw-bolder fs-2">
          <span className="border-bottom border-3 border-dark">
            : الفرق الحاصل عليها
          </span>
        </h1>
      </div>
      <table className="pdf-info-table">
        <thead>
          <tr>
            {profileCourseTableHeaders.map(([key,label],index) => (
              <th className="pdf-info-table-header" key={index}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {courseData.map((record, index) => (
            <tr key={index}>
              {profileCourseTableHeaders.map(([key,label], index) => (
                <td key={index}>{converTextToArabic(record[key],label)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseSection;
