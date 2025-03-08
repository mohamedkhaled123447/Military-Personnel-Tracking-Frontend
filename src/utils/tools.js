export const converTextToArabic = (text, lable) => {
  if (lable.includes("تاريخ")) return convertDateToArabicNumerals(text);
  else if (lable.includes("بريد")) return text;
  else return convertToArabicNumerals(text);
};
export const convertToArabicNumerals = (englishNumber) => {
  if (!englishNumber) return "";
  const arabicDigits = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  let englishNumberStr = englishNumber.toString();
  let arabicNumber = "";
  for (let char of englishNumberStr) {
    arabicNumber += arabicDigits[char] || char;
  }

  return arabicNumber;
};
export function convertDateToArabicNumerals(englishNumber) {
  if (!englishNumber) return "";
  englishNumber = formatDateToDDMMYYYY(new Date(englishNumber));
  const arabicDigits = {
    0: "٠",
    1: "١",
    2: "٢",
    3: "٣",
    4: "٤",
    5: "٥",
    6: "٦",
    7: "٧",
    8: "٨",
    9: "٩",
  };

  let englishNumberStr = englishNumber.toString();
  let arabicNumber = "";
  for (let char of englishNumberStr) {
    arabicNumber += arabicDigits[char] || char;
  }

  return arabicNumber;
}
export function formatDateToDDMMYYYY(date) {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return convertToArabicNumerals(`${year}/${month}/${day}`);
}
function calculateAge(birthOfDate) {
  const birthDate = new Date(birthOfDate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  return age;
}
export const rankMap = {
  جندي: 1,
  عريف: 2,
  رقيب: 3,
  "صانع دقيق": 4,
  "رقيب اول": 5,
  مساعد: 6,
  "مساعد اول": 7,
};
export const officerRankMap = {
  ملازم: 1,
  "ملازم أول": 2,
  نقيب: 3,
  رائد: 4,
  مقدم: 5,
  عقيد: 6,
  عميد: 7,
  لواء: 8,
};
export const monthsMap = {
  يناير: 1,
  فبراير: 2,
  مارس: 3,
  أبريل: 4,
  مايو: 5,
  يونيو: 6,
  يوليو: 7,
  أغسطس: 8,
  سبتمبر: 9,
  أكتوبر: 10,
  نوفمبر: 11,
  ديسمبر: 12,
};

export const numberToMonth = {
  1: "يناير",
  2: "فبراير",
  3: "مارس",
  4: "أبريل",
  5: "مايو",
  6: "يونيو",
  7: "يوليو",
  8: "أغسطس",
  9: "سبتمبر",
  10: "أكتوبر",
  11: "نوفمبر",
  12: "ديسمبر",
};

const pull_up = [
  { start: 4, end: 22, shift: 0, step: 2 },
  { start: 2, end: 20, shift: 0, step: 2 },
  { start: 2, end: 18, shift: 1, step: 2 },
  { start: 2, end: 16, shift: 2, step: 2 },
  { start: 2, end: 14, shift: 3, step: 2 },
  { start: 2, end: 12, shift: 4, step: 2 },
];
const push_up = [
  { start: 19, end: 55, shift: 0, step: 4 },
  { start: 15, end: 51, shift: 0, step: 4 },
  { start: 11, end: 47, shift: 0, step: 4 },
  { start: 7, end: 43, shift: 0, step: 4 },
  { start: 3, end: 39, shift: 0, step: 4 },
  { start: 3, end: 35, shift: 1, step: 4 },
];
const crunch = [
  { start: 35, end: 80, shift: 0, step: 5 },
  { start: 30, end: 75, shift: 0, step: 5 },
  { start: 25, end: 70, shift: 0, step: 5 },
  { start: 20, end: 65, shift: 0, step: 5 },
  { start: 15, end: 60, shift: 0, step: 5 },
  { start: 10, end: 55, shift: 0, step: 5 },
];
const running_rate = [
  { start: 9, end: 45, shift: 0, step: 4 },
  { start: 5, end: 41, shift: 0, step: 4 },
  { start: 5, end: 37, shift: 1, step: 4 },
  { start: 5, end: 33, shift: 2, step: 4 },
  { start: 5, end: 29, shift: 3, step: 4 },
  { start: 5, end: 25, shift: 4, step: 4 },
];
export const lowerBound = (arr, value) => {
  let low = 0,
    high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};
const generateSequence = (start, step, end) => {
  const result = [];
  const iterations = (end - start) / step + 1;
  for (let i = 0; i < iterations; i++) {
    result.push(start + i * step);
  }
  return result;
};
const calc_sport_percentage = (record, stage) => {
  //pull up
  const pull_up_index =
    lowerBound(
      generateSequence(
        pull_up[stage].start,
        pull_up[stage].step,
        pull_up[stage].end
      ),
      record["pull_up"]
    ) + 1;
  const pull_up_percentage =
    record["pull_up"] < pull_up[stage].start
      ? 0
      : pull_up_index * 10 + pull_up[stage].shift * 10;
  //push_up
  const push_up_index =
    lowerBound(
      generateSequence(
        push_up[stage].start,
        push_up[stage].step,
        push_up[stage].end
      ),
      record["push_up"]
    ) + 1;
  const push_up_percentage =
    record["push_up"] < push_up[stage].start
      ? 0
      : push_up_index * 10 + push_up[stage].shift * 10;
  //crunch
  const crunch_index =
    lowerBound(
      generateSequence(
        crunch[stage].start,
        crunch[stage].step,
        crunch[stage].end
      ),
      record["crunch"]
    ) + 1;
  const crunch_percentage =
    record["crunch"] < crunch[stage].start
      ? 0
      : crunch_index * 10 + crunch[stage].shift * 10;
  //running_rate
  const running_rate_index =
    lowerBound(
      generateSequence(
        running_rate[stage].start,
        running_rate[stage].step,
        running_rate[stage].end
      ),
      record["running_rate"]
    ) + 1;
  const running_rate_percentage =
    record["running_rate"] < running_rate[stage].start
      ? 0
      : running_rate_index * 10 + running_rate[stage].shift * 10;
  return (
    (Math.min(100, pull_up_percentage) +
      Math.min(100, push_up_percentage) +
      Math.min(100, crunch_percentage) +
      Math.min(100, running_rate_percentage)) /
    4
  );
};
export const calc_sport = (record, name, value, birthOfDate) => {
  record[name] = value;
  const age = calculateAge(birthOfDate);

  let total = 0;
  if (age < 27) total = calc_sport_percentage(record, 0);
  else if (age < 32) total = calc_sport_percentage(record, 1);
  else if (age < 37) total = calc_sport_percentage(record, 2);
  else if (age < 42) total = calc_sport_percentage(record, 3);
  else if (age < 46) total = calc_sport_percentage(record, 4);
  else total = calc_sport_percentage(record, 5);

  return { ...record, percentage: total.toPrecision(3) };
};
const under27 = (record) => {
  let total1 = 0;
  if (record["pull_up"] === 1) total1 = 2;
  if (record["pull_up"] >= 2) total1 = 5;
  if (record["pull_up"] >= 4) total1 = 10;
  if (record["pull_up"] >= 6) total1 = 20;
  if (record["pull_up"] >= 8) total1 = 30;
  if (record["pull_up"] >= 10) total1 = 40;
  if (record["pull_up"] >= 12) total1 = 50;
  if (record["pull_up"] >= 14) total1 = 60;
  if (record["pull_up"] >= 16) total1 = 70;
  if (record["pull_up"] >= 18) total1 = 80;
  if (record["pull_up"] >= 20) total1 = 90;
  if (record["pull_up"] >= 22) total1 = 100;
  let total2 = 0;
  if (record["push_up"] >= 5) total2 = 1;
  if (record["push_up"] >= 10) total2 = 5;
  if (record["push_up"] >= 19) total2 = 10;
  if (record["push_up"] >= 23) total2 = 20;
  if (record["push_up"] >= 27) total2 = 30;
  if (record["push_up"] >= 31) total2 = 40;
  if (record["push_up"] >= 35) total2 = 50;
  if (record["push_up"] >= 39) total2 = 60;
  if (record["push_up"] >= 43) total2 = 70;
  if (record["push_up"] >= 47) total2 = 80;
  if (record["push_up"] >= 51) total2 = 90;
  if (record["push_up"] >= 55) total2 = 100;

  let total3 = 0;
  if (record["crunch"] >= 25) total3 = 2;
  if (record["crunch"] >= 30) total3 = 5;
  if (record["crunch"] >= 35) total3 = 10;
  if (record["crunch"] >= 40) total3 = 20;
  if (record["crunch"] >= 45) total3 = 30;
  if (record["crunch"] >= 50) total3 = 40;
  if (record["crunch"] >= 55) total3 = 50;
  if (record["crunch"] >= 60) total3 = 60;
  if (record["crunch"] >= 65) total3 = 70;
  if (record["crunch"] >= 70) total3 = 80;
  if (record["crunch"] >= 75) total3 = 90;
  if (record["crunch"] >= 80) total3 = 100;
  let total4 = 0;
  if (record["running_rate"] >= 2) total4 = 1;
  if (record["running_rate"] >= 5) total4 = 5;
  if (record["running_rate"] >= 9) total4 = 10;
  if (record["running_rate"] >= 13) total4 = 20;
  if (record["running_rate"] >= 17) total4 = 30;
  if (record["running_rate"] >= 21) total4 = 40;
  if (record["running_rate"] >= 25) total4 = 50;
  if (record["running_rate"] >= 29) total4 = 60;
  if (record["running_rate"] >= 33) total4 = 70;
  if (record["running_rate"] >= 37) total4 = 80;
  if (record["running_rate"] >= 41) total4 = 90;
  if (record["running_rate"] >= 45) total4 = 100;
  const total = (total1 + total2 + total3 + total4) / 4;
  return total;
};

export const calc_education = (record, name, value) => {
  record[name] = value;
  let total = 0;
  total += (record["electronic_war"] / 10) * 100;
  total += (record["weapons"] / 10) * 100;
  total += (record["military_security"] / 10) * 100;
  total += (record["topography"] / 10) * 100;
  total += (record["chemical_war"] / 10) * 100;
  total += (record["presentation_of_self_mission"] / 10) * 100;
  return { ...record, percentage: (total / 6).toPrecision(3) };
};

export const calculateBMI = (weight, height) => {
  height = height / 100;
  const bmi = weight / height ** 2;
  return Math.round(bmi * 100) / 100;
};
