export const GiftInputValidator = (newRow) => {
  const Errors = [];
  if (newRow["الامر بالمنحة"] === "") Errors.push("ادخل الامر بالمنحة");
  if (newRow["التاريخ"] === "") Errors.push("ادخل التاريخ");
  if (newRow["السبب"] === "") Errors.push("ادخل السبب");
  if (newRow["عدد الايام"] < 1 || newRow["عدد الايام"] > 100)
    Errors.push("عدد الايام [1,100]");
  return Errors;
};
export const EltemasInputValidator = (newRow) => {
  const Errors = [];
  if (newRow["التاريخ"] === "") Errors.push("ادخل التاريخ");
  if (newRow["السبب"] === "") Errors.push("ادخل السبب");
  if (newRow["عدد الايام"] < 1 || newRow["عدد الايام"] > 100)
    Errors.push("عدد الايام [1,100]");
  return Errors;
};
export const DisciplineInputValidator = (newRow) => {
  const Errors = [];
  if (newRow["تاريخ توقيع العقوبة"] === "")
    Errors.push("ادخل تاريخ توقيع العقوبة");
  if (newRow["الامر بالعقوبة"] === "") Errors.push("ادخل الامر بالعقوبة");
  if (newRow["السبب"] === "") Errors.push("ادخل السبب");
  if (newRow["عدد الايام"] < 1 || newRow["عدد الايام"] > 1000)
    Errors.push("عدد الايام [1,1000]");
  return Errors;
};
export const SportInputValidator = (newRow, selectedYear, selectedValue) => {
  const Errors = [];
  const month = newRow["الشهر"];
  const exist = selectedYear.filter((item) => item[9] === month);
  if (exist.length) Errors.push(`${month}${selectedValue} موجود`);
  if (newRow["عقلة"] < 0 || newRow["عقلة"] > 100)
    Errors.push(" عدد العقلة [0,100]");
  if (newRow["ضغط"] < 0 || newRow["ضغط"] > 200)
    Errors.push(" عدد الضغط [0,200]");
  if (newRow["بطن"] < 0 || newRow["بطن"] > 150)
    Errors.push(" عدد البطن [0,150]");
  if (newRow["جري معدل"] < 0 || newRow["جري معدل"] > 60)
    Errors.push(" عدد الجري معدل [0,60]");
  if (newRow["النسبة المئوية"] < 0 || newRow["النسبة المئوية"] > 150)
    Errors.push(" النسبة المئوية [0,150]");
  if (newRow["الضاحية"] < 0 || newRow["الضاحية"] > 3)
    Errors.push(" الضاحية [0,3]");
  if (newRow["الطول"] < 100 || newRow["الطول"] > 250)
    Errors.push(" الطول [100,250]");
  if (newRow["الوزن"] < 40 || newRow["الوزن"] > 150)
    Errors.push("  الوزن [40,150]");
  return Errors;
};
export const EducationInputValidator = (
  newRow,
  selectedYear,
  selectedValue
) => {
  const Errors = [];
  const month = newRow["الشهر"];
  const exist = selectedYear.filter((item) => item[8] === month);
  if (exist.length) Errors.push(`${month}${selectedValue} موجود`);
  if (newRow["حرب الكترونية"] < 0 || newRow["حرب الكترونية"] > 10)
    Errors.push("  حرب الكترونية [0,10]");
  if (newRow["أسلحة"] < 0 || newRow["أسلحة"] > 10)
    Errors.push(" أسلحة  [0,10]");
  if (newRow["أمن حربي"] < 0 || newRow["أمن حربي"] > 10)
    Errors.push(" أمن حربي  [0,10]");
  if (newRow["طبوغرافيا"] < 0 || newRow["طبوغرافيا"] > 10)
    Errors.push(" طبوغرافيا  [0,10]");
  if (newRow["حرب كيميائية"] < 0 || newRow["حرب كيميائية"] > 10)
    Errors.push(" حرب كيميائية  [0,10]");
  if (newRow["تقديم النفس+المهمة"] < 0 || newRow["تقديم النفس+المهمة"] > 10)
    Errors.push("تقديم النفس+المهمة  [0,10]");
  return Errors;
};

export const ShootingInputValidator = (newRow, selectedYear, selectedValue) => {
  const Errors = [];
  const month = newRow["الشهر"];
  const exist = selectedYear.filter((item) => item[1] === month);
  if (exist.length) Errors.push(`${month}${selectedValue} موجود`);
  return Errors;
};
const is_number = (num) => {
  let cnt = 0;
  for (let i = 0; i < num.length; i++) {
    if (num[i] >= "0" && num[i] <= "9") cnt++;
  }
  return cnt === num.length;
};
export const InfoInputValidator = (newRecord) => {
  const Errors = [];
  if (
    !is_number(newRecord["phone_number"]) ||
    newRecord["phone_number"].length !== 11
  )
    Errors.push("رقم التليفون لازم يكون 11 رقم");
  if (
    !is_number(newRecord["dad_or_mom_phone_number"]) ||
    newRecord["dad_or_mom_phone_number"].length !== 11
  )
    Errors.push("رقم تليفون الوالد / أقرب الأقارب لازم يكون 11 رقم");
  if (
    !is_number(newRecord["shose1_size"]) ||
    newRecord["shose1_size"].length !== 2
  )
    Errors.push("مقاس البيادة لازم يكون رقمين");
  if (
    !is_number(newRecord["shose2_size"]) ||
    newRecord["shose2_size"].length !== 2
  )
    Errors.push("مقاس الحذاء لازم يكون رقمين");
  if (
    !is_number(newRecord["avarol_size"]) ||
    newRecord["avarol_size"].length !== 2
  )
    Errors.push("مقاس الافرول لازم يكون رقمين");
  if (
    !is_number(newRecord["militeryNumber"]) ||
    newRecord["militeryNumber"].length !== 13
  )
    Errors.push("الرقم العسكري لازم يكون 13 رقم");
  if (
    !is_number(newRecord["num_of_brothers_and_sisters"]) ||
    newRecord["num_of_brothers_and_sisters"] < 0 ||
    newRecord["num_of_brothers_and_sisters"] > 20
  )
    Errors.push("عدد الإخوة والأخوات لازم يكون [0,20]");
  if (
    !is_number(newRecord["num_of_children"]) ||
    newRecord["num_of_children"] < 0 ||
    newRecord["num_of_children"] > 20
  )
    Errors.push("عدد الأولاد لازم يكون [0,20]");
  return Errors;
};

