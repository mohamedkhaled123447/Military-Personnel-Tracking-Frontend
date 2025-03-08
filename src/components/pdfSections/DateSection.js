import React from "react";
import { formatDateToDDMMYYYY } from "../../utils/tools";
function DateSection({user}) {
  return (
    <div className="m-4 d-flex justify-content-around fs-4 fw-bold text-balck">
      <span>التاريخ : {formatDateToDDMMYYYY(new Date())}</span>
      <span dir="rtl">القائم بالطباعة : {user.username}</span>
    </div>
  );
}

export default DateSection;
