

export const officerAttributes = [
  ["name", "الاسم", false, []],
  ["seniority", "الاقدمية", false, []],
  ["personal_number", "ت.الشخصية", false, []],
  ["batch", "الدفعة", false, []],
  ["national_id", "الرقم القومي", false, []],
  ["graduation_date", "تاريخ التخرج", false, []],
  [
    "rank",
    "الرتبة",
    true,
    ["ملازم", "ملازم أول", "نقيب", "رائد","رائد اح", "مقدم","مقدم اح", "عقيد","عقيد اح", "عميد","عميد اح", "لواء","لواء اح"],
  ],
  ["weapon", "السلاح", false, []],
  ["religion", "الديانة", false, []],
  ["current_unit", "الوحدة الحالية", false, []],
  ["college_or_institute", "الكلية/المهعد", false, []],
  ["birthOfDate", "تاريخ الميلاد", false, []],
  ["address", "جهة الميلاد", false, []],
  ["status", "الحالة الاجتماعية", true, ["متزوج", "اعزب"]],
  ["fullAddress", "محل الإقامة تفصيلياً", false, []],
  ["phone_number", "رقم التليفون", false, []],
  ["email", "البريد الإلكتروني", false, []],
  ["curJob", "الوظيفة الحالية", false, []],
  ["current_wives", "عدد الزوجات الحاليين", false, []],
  ["num_of_children", "عدد الأولاد", false, []],
  ["male_children", "ذكور", false, []],
  ["female_children", "اناث", false, []],
  ["marriage_date", "تاريخ الزواج", false, []],
  ["previous_marriages", "عدد الزيجات السابقة", false, []],
  ["divorce_date", "تاريخ الإنفصال", false, []],
  ["closest_relative", "أقرب الأقارب", false, []],
  ["avarol_size", "مقاس الأفرول", false, []],
  ["t_shirt_size", "مقاس التيشرت", true, ["S", "M", "L", "XL", "2XL", "3XL"]],
  ["shose1_size", "مقاس البيادة", false, []],
  ["shose2_size", "مقاس الحذاء", false, []],
  ["mask_size", "مقاس القناع", true, ["S", "M", "L", "XL"]],
  [
    "blood_class",
    "فصيلة الدم",
    true,
    ["A", "A+", "B", "B+", "O", "O+", "AB", "AB+"],
  ],
  ["unified_number", "الرقم الموحد", false, []],
];

export const soldierAttributes = [
  ["name", "الاسم", false, []],
  ["militeryNumber", "الرقم العسكري", false, []],
  [
    "classification",
    "التسكين",
    true,
    ["تصنت", "تحديد", "قيادة", "شئون ادارية"],
  ],
  [
    "job_classification",
    "الوحدة الفرعية",
    true,
    [
      "تصنت",
      "تحديد",
      "قيادة",
      "شئون ادارية",
      "امن",
      "حملة",
      "عمليات",
      "تأمين فني",
      "إشارة",
      "تنظيم وإدارة",
      "تدريب",
    ],
  ],
  [
    "dgree",
    "الدرجة",
    true,
    ["جندي", "عريف", "رقيب", "صانع دقيق", "رقيب اول", "مساعد", "مساعد اول"],
  ],
  ["study", "المؤهل الدراسي", false, []],
  ["getInDate", "تاريخ التجنيد", false, []],
  ["getOutDate", "تاريخ التسريح", false, []],
  ["curJob", "العمل القائم به بالسرية", false, []],
  ["preJob", "العمل القائم قبل التجنيد", false, []],
  ["birthOfDate", "تاريخ الميلاد", false, []],
  ["address", "جهة الميلاد", false, []],
  ["status", "الحالة الاجتماعية", true, ["متزوج", "اعزب"]],
  ["fullAddress", "محل الإقامة تفصيلياً", false, []],
  ["num_of_brothers_and_sisters", "عدد الإخوة والأخوات", false, []],
  ["num_of_children", "عدد الأولاد", false, []],
  ["phone_number", "رقم التليفون", false, []],
  ["dad_or_mom_phone_number", "رقم تليفون الوالد / أقرب الأقارب", false, []],
  ["avarol_size", "مقاس الأفرول", false, []],
  ["t_shirt_size", "مقاس التيشرت", true, ["S", "M", "L", "XL", "2XL", "3XL"]],
  ["shose1_size", "مقاس البيادة", false, []],
  ["shose2_size", "مقاس الحذاء", false, []],
  ["mask_size", "مقاس القناع", true, ["0", "1", "2", "3", "4"]],
  [
    "blood_class",
    "فصيلة الدم",
    true,
    ["A", "A+", "B", "B+", "O", "O+", "AB", "AB+"],
  ],
  ["hobby", "الهواية الشخصية", false, []],
  ["fasela", "الفصيلة", true, ["الاولي", "الثانية", "الثالثة"]],
  [
    "saria",
    "السرية",
    true,
    ["الاولي", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"],
  ],
  ["vacation", "الميدانية", true, ["الاولي", "الثانية", "الثالثة", "الرابعة"]],
];
export const sergeantAttributes = [
  ["name", "الاسم", false, []],
  ["militeryNumber", "الرقم العسكري", false, []],
  [
    "classification",
    "التسكين",
    true,
    ["تصنت", "تحديد", "قيادة", "شئون ادارية"],
  ],
  [
    "job_classification",
    "الوحدة الفرعية",
    true,
    [
      "تصنت",
      "تحديد",
      "قيادة",
      "شئون ادارية",
      "امن",
      "حملة",
      "عمليات",
      "تأمين فني",
      "إشارة",
      "تنظيم وإدارة",
      "تدريب",
    ],
  ],
  [
    "dgree",
    "الدرجة",
    true,
    ["جندي", "عريف", "رقيب", "صانع دقيق", "رقيب اول", "مساعد", "مساعد اول"],
  ],
  ["study", "المؤهل الدراسي", false, []],
  ["getInDate", "تاريخ التجنيد", false, []],
  ["getOutDate", "تاريخ التسريح", false, []],
  ["curJob", "العمل القائم به بالسرية", false, []],
  ["preJob", "العمل القائم قبل التجنيد", false, []],
  ["weapon", "السلاح", false, []],
  ["religion", "الديانة", false, []],
  ["birthOfDate", "تاريخ الميلاد", false, []],
  ["address", "جهة الميلاد", false, []],
  ["status", "الحالة الاجتماعية", true, ["متزوج", "اعزب"]],
  ["fullAddress", "محل الإقامة تفصيلياً", false, []],
  ["num_of_brothers_and_sisters", "عدد الإخوة والأخوات", false, []],
  ["num_of_children", "عدد الأولاد", false, []],
  ["phone_number", "رقم التليفون", false, []],
  ["dad_or_mom_phone_number", "رقم تليفون الوالد / أقرب الأقارب", false, []],
  ["avarol_size", "مقاس الأفرول", false, []],
  ["t_shirt_size", "مقاس التيشرت", true, ["S", "M", "L", "XL", "2XL", "3XL"]],
  ["shose1_size", "مقاس البيادة", false, []],
  ["shose2_size", "مقاس الحذاء", false, []],
  ["mask_size", "مقاس القناع", true, ["0", "1", "2", "3", "4"]],
  [
    "blood_class",
    "فصيلة الدم",
    true,
    ["A", "A+", "B", "B+", "O", "O+", "AB", "AB+"],
  ],
  ["closest_relative", "أقرب الأقارب", false, []],
  ["hobby", "الهواية الشخصية", false, []],
  ["fasela", "الفصيلة", true, ["الاولي", "الثانية", "الثالثة"]],
  [
    "saria",
    "السرية",
    true,
    ["الاولي", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"],
  ],
  ["vacation", "الميدانية", true, ["الاولي", "الثانية", "الثالثة", "الرابعة"]],
];

export const monthsInArabic = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const profileSportTableHeaders = [
  ["notes", "ملاحظات"],
  ["bmi", "BMI"],
  ["height", "الطول"],
  ["weight", "الوزن"],
  ["percentage", "النسبة"],
  ["running", "الضاحية"],
  ["running_rate", "الجري المعدل"],
  ["push_up", "الضغط"],
  ["pull_up", "العقلة"],
  ["crunch", "البطن"],
  ["date", "التاريخ"],
];

export const profileSportRecordFields = [
  ["running_rate", "الجري المعدل", 1, []],
  ["push_up", "الضغط", 1, []],
  ["pull_up", "العقلة", 1, []],
  ["crunch", "البطن", 1, []],
  ["running", "الضاحية", 1, []],
  ["percentage", "النسبة", 1, []],
  ["weight", "الوزن", 1, []],
  ["height", "الطول", 1, []],
  ["notes", "ملاحظات", 2, []],
  ["date", "التاريخ", 4, []],
];
export const profileEducationTableHeaders = [
  ["notes", "ملاحظات"],
  ["percentage", "النسبة"],
  ["electronic_war", "الحرب الإلكترونية"],
  ["weapons", "الأسلحة"],
  ["military_security", "الأمن الحربي"],
  ["topography", "طبوغرافيا"],
  ["chemical_war", "الحرب الكيميائية"],
  ["date", "التاريخ"],
];
export const profileEducationRecordFields = [
  ["electronic_war", "الحرب الإلكترونية", 1, []],
  ["weapons", "الأسلحة", 1, []],
  ["military_security", "الأمن الحربي", 1, []],
  ["topography", "طبوغرافيا", 1, []],
  ["chemical_war", "الحرب الكيميائية", 1, []],
  ["presentation_of_self_mission", "تقديم النفس+المهمة", 1, []],
  ["percentage", "النسبة", 1, []],
  ["notes", "ملاحظات", 2, []],
  ["date", "التاريخ", 4, []],
];

export const profileShootingTableHeaders = [
  ["notes", "ملاحظات"],
  ["result", "النتيحة"],
  ["date", "التاريخ"],
];

export const profileShootingRecordFields = [
  ["notes", "ملاحظات", 2, []],
  ["result", "النتيجة", 3, ["ضعيف", "جيد", "جبد جدا", "امتياز"]],
  ["date", "التاريخ", 4, []],
];

export const profileEltemasTableHeaders = [
  ["number_of_days", "عدد الايام"],
  ["reason", "السبب"],
  ["date", "التاريخ"],
];

export const profileEltemasRecordFields = [
  ["reason", "السبب", 2, []],
  ["date", "التاريخ", 4, []],
  ["number_of_days", "عدد الايام", 1, []],
];
export const profileDisciplineTableHeaders = [
  ["number_of_days", "عدد الايام"],
  ["commander", "الامر"],
  ["reason", "السبب"],
  ["type", "نوغ الجزاء"],
  ["date", "التاريخ"],
];
export const profileDisciplineRecordFields = [
  ["commander", "الامر", 2, []],
  ["reason", "السبب", 2, []],
  ["type", "نوع الجزاء", 3, ["حبس", "حجز"]],
  ["date", "التاريخ", 4, []],
  ["number_of_days", "عدد الايام", 1, []],
];

export const profileGiftTableHeaders = [
  ["number_of_days", "عدد الايام"],
  ["commander", "الامر"],
  ["reason", "السبب"],
  ["type", "نوغ المنحة"],
  ["date", "التاريخ"],
];
export const profileGiftRecordFields = [
  ["commander", "الامر", 2, []],
  ["reason", "السبب", 2, []],
  ["type", "نوع المنحة", 3, ["اجازة", "مادبة"]],
  ["date", "التاريخ", 4, []],
  ["number_of_days", "عدد الايام", 1, []],
];
export const profileLeaderOpinionTableHeaders = [
  ["military_discipline", "مدى تنفيذ المهام"],
  ["response_to_orders", "مدى الإستجابة للاوامر"],
  ["execution_of_tasks", "المظهر العام"],
  ["general_appearance", "الإنضباط العسكري"],
];
export const profileLeaderOpinionRecordFields = [
  [
    "military_discipline",
    "مدى تنفيذ المهام",
    3,
    ["ضعيف", "جيد", "جبد جدا", "ممتاز"],
  ],
  [
    "response_to_orders",
    "مدى الإستجابة للأوامر",
    3,
    ["ضعيف", "جيد", "جبد جدا", "ممتاز"],
  ],
  [
    "execution_of_tasks",
    "المظهر العام",
    3,
    ["ضعيف", "جيد", "جبد جدا", "ممتاز"],
  ],
  [
    "general_appearance",
    "الإنضباط العسكري",
    3,
    ["ضعيف", "جيد", "جبد جدا", "ممتاز"],
  ],
];
export const profileCourseTableHeaders = [
  ["end_date", "تاريخ النهاية"],
  ["start_date", "تاريخ البداية"],
  ["institution", "مكان عقد الفرقة"],
  ["grade", "التقدير"],
  ["course_name", "اسم الدورة"],
];
export const profileCourseRecordFields = [
  ["course_name", "اسم الدورة", 2, []],
  ["institution", "مكان عقد الفرقة", 2, []],
  ["grade", "التقدير", 2, []],
  ["end_date", "تاريخ النهاية", 4, []],
  ["start_date", "تاريخ البداية", 4, []],
];
export const profilePositionTableHeaders = [
  ["end_date", "تاريخ النهاية"],
  ["start_date", "تاريخ البداية"],
  ["position_name", "اسم الوظيفة"],
];
export const profilePositionRecordFields = [
  ["position_name", "اسم الوظيفة", 2, []],
  ["start_date", "تاريخ البداية", 4, []],
  ["end_date", "تاريخ النهاية", 4, []],
];
export const profileUnitTableHeaders = [
  ["end_date", "تاريخ النهاية"],
  ["start_date", "تاريخ البداية"],
  ["unit_name", "اسم الوحدة"],
];
export const profileUnitRecordFields = [
  ["unit_name", "اسم الوحدة", 2, []],
  ["start_date", "تاريخ البداية", 4, []],
  ["end_date", "تاريخ النهاية", 4, []],
];
export const profileTestTableHeaders = [
  ["score", "النتيجة"],
  ["date_taken", "تاريخ الاختبار"],
  ["test_name", "اسم الاختبار"],
];

export const medicalSituationRecordFields = [
  ["notes", "ملاحظات", 2, []],
  ["recommendation", "التوصية", 2, []],
  ["diagnosis", "التشخيص", 2, []],
  ["hospital", "المستشفي", 2, []],
  ["date", "التاريخ", 4, []],
];

export const medicalSituationTableHeaders = [
  ["notes", "ملاحظات"],
  ["recommendation", "التوصية"],
  ["hospital", "المستشفي"],
  ["diagnosis", "التشخيص"],
  ["date", "التاريخ"],
];

export const officerFilterNames = [
  ["name", "الاسم", 2, []],
  ["seniority", "الاقدمية", 2, []],
  ["batch", "الدفعة", 2, []],
  [
    "rank",
    "الرتبة",
    3,
    ["ملازم", "ملازم أول", "نقيب", "رائد","رائد اح", "مقدم","مقدم اح", "عقيد","عقيد اح", "عميد","عميد اح", "لواء","لواء اح"],
  ],
];
export const sergeantFilterNames = [
  ["name", "الاسم", 2, []],
  ["militeryNumber", "الرقم العسكري", 2, []],
  [
    "job_classification",
    "الوحدة الفرعية",
    3,
    [
      "تصنت",
      "تحديد",
      "قيادة",
      "امن",
      "حملة",
      "عمليات",
      "إشارة",
      "تدريب",
      "تنظيم وإدارة",
      "تأمين فني",
      "شئون ادارية",
    ],
  ],
  ["classification", "التسكين العملياتي", 3, ["تصنت", "تحديد", "قيادة"]],
  ["fasela", "الفصيلة", 3, ["الاولي", "الثانية", "الثالثة"]],
  [
    "saria",
    "السرية",
    3,
    ["الاولي", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"],
  ],
  [
    "dgree",
    "الدرجة",
    3,
    ["جندي", "عريف", "رقيب", "رقيب اول", "مساعد", "صانع دقيق", "مساعد اول"],
  ],
];
export const soldierFilterNames = [
  ["name", "الاسم", 2, []],
  ["militeryNumber", "الرقم العسكري", 2, []],
  ["vacation", "الميدانية", 3, ["الاولي", "الثانية", "الثالثة", "الرابعة"]],
  [
    "job_classification",
    "الوحدة الفرعية",
    3,
    [
      "تصنت",
      "تحديد",
      "قيادة",
      "امن",
      "حملة",
      "عمليات",
      "إشارة",
      "تدريب",
      "تنظيم وإدارة",
      "تأمين فني",
      "شئون ادارية",
    ],
  ],
  ["classification", "التسكين العملياتي", 3, ["تصنت", "تحديد", "قيادة"]],
  ["getInDate", "تاريخ التجنيد", 4, []],
  ["getOutDate", "تاريخ التسريح", 4, []],
  ["fasela", "الفصيلة", 3, ["الاولي", "الثانية", "الثالثة"]],
  [
    "saria",
    "السرية",
    3,
    ["الاولي", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة"],
  ],
  [
    "dgree",
    "الدرجة",
    3,
    ["جندي", "عريف", "رقيب", "رقيب اول", "مساعد", "صانع دقيق", "مساعد اول"],
  ],
];

export const officerHeaderNames = [
  ["batch", "الدفعة"],
  ["seniority", "رقم الاقدمية"],
  ["unified_number", "الرقم الموحد"],
  ["rank", "الرتبة"],
  ["name", "الاسم"],
];
export const soldierrHeaderNames = [
  ["getInDate", "تاريخ التجنيد"],
  ["militeryNumber", "الرقم العسكري"],
  ["unified_number", "الرقم الموحد"],
  ["dgree", "الدرجة"],
  ["name", "الاسم"],
];

export const userInfo = {
  name: "", // Default: "غير محدد"
  birthOfDate: "2024-10-10", // Default: null
  address: "غير محدد", // Default: "غير محدد"
  fullAddress: "غير محدد", // Default: "غير محدد"
  status: "اعزب", // Default: "اعزب"
  hobby: "غير محدد", // Default: "غير محدد"
  religion: "مسلم", // Default: "مسلم"
  email: "example@domain.com", // Default: "example@domain.com"
  closest_relative: "غير محدد", // Default: "غير محدد"
  study: "غير محدد",
  militeryNumber: "0000000000000", // Default: "غير محدد"
  classification: "تصنت", // Default: "تصنت"
  job_classification: "تصنت", // Default: "تصنت"
  dgree: "لايكن", // Default: "جندي"
  curJob: "غير محدد", // Default: "غير محدد"
  preJob: "غير محدد", // Default: "غير محدد"

  getInDate: "2024-10-10", // Default: null
  getOutDate: "2024-10-10", // Default: null
  graduation_date: "", // Default: null
  marriage_date: "", // Default: null
  divorce_date: "", // Default: null

  avarol_size: "50", // Default: "غير محدد"
  t_shirt_size: "S", // Default: "S"
  shose1_size: "42", // Default: "غير محدد"
  shose2_size: "42", // Default: "غير محدد"
  mask_size: "0", // Default: "0"
  blood_class: "A",

  num_of_brothers_and_sisters: "0", // Default: "0"
  num_of_children: "0", // Default: "0"
  current_wives: 0, // Default: 0
  male_children: 0, // Default: 0
  female_children: 0, // Default: 0
  previous_marriages: 0, // Default: 0

  phone_number: "00000000000", // Default: "غير محدد"
  dad_or_mom_phone_number: "00000000000", // Default: "غير محدد"

  fasela: "الاولي", // Default: "الاولي"
  saria: "الثانية", // Default: "الثانية"
  medical_situation: "لايكن", // Default: "لايكن"
  vacation: "الاولي", // Default: "الاولي"
  seniority: "0000000000", // Default: "0000000000"
  personal_number: "0000000000", // Default: "0000000000"
  batch: "غير محدد", // Default: "غير محدد"
  national_id: "00000000000000", // Default: "00000000000000"

  rank: "لايكن", // Default: "ملازم"
  weapon: "غير محدد", // Default: "غير محدد"
  current_unit: "غير محدد", // Default: "غير محدد"
  college_or_institute: "أكاديمية عسكرية", // Default: "أكاديمية عسكرية"
  unified_number: "غير محدد", // Default: "غير محدد"
  is_officer: false, // Default: false
  is_soldier: false, // Default: true
};
export const VacationNotesTableHeaders = [
  ["notes", "ملاحظات"],
  ["grants_discounts", "المنح والخصومات"],
  ["governorate", "المحافظة"],
  ["fieldwork_location", "الميدانية"],
  ["sub_unit", "الوحدة الفرعية"],
  ["duration", "المدة"],
  ["return_date", "توقيت العودة"],
  ["departure_date", "توقيت النزول"],
  ["grade", "الدرجة"],
  ["name", "الاسم"],
];
export const VacationNotesRecordFields = [
  ["name", "الاسم", 2, []],
  [
    "grants_discounts",
    "المنح والخصومات",
    3,
    [
      "منحة يوم",
      "منحة يومين",
      "منحة 3ايام",
      "خصم يوم",
      "خصم يومين",
      "خصم 3 ايام",
    ],
  ],
  ["notes", "ملاحظات", 5, ["لياقة", "تعليم", "ضاحية", "رماية", "سلوك", "تميز","وزن"]],
  ["notes", "ملاحظات", 2, []],
  ["grants_discounts", "المنح والخصومات", 2, []],
  ["governorate", "المحافظة", 2, []],
  [
    "fieldwork_location",
    "الميدانية",
    3,
    ["الاولي", "الثانية", "الثالثة", "الرابعة"],
  ],
  [
    "sub_unit",
    "الوحدة الفرعية",
    3,
    [
      "تصنت",
      "تحديد",
      "قيادة",
      "شئون ادارية",
      "امن",
      "حملة",
      "عمليات",
      "تأمين فني",
      "إشارة",
      "تنظيم وإدارة",
      "تدريب",
    ],
  ],
  ["duration", "المدة", 1, []],
  ["return_date", "توقيت العودة", 4, []],
  ["departure_date", "توقيت النزول", 4, []],
  [
    "grade",
    "الدرجة",
    3,
    ["جندي", "عريف", "رقيب", "صانع دقيق", "رقيب اول", "مساعد", "مساعد اول"],
  ],
];
