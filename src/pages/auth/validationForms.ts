import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("شماره همراه الزامی می باشد."),
  password: Yup.string()
    .min(8, "اطلاعات وارد شده اشتباه است.")
    .matches(/[a-z]/, ",اطلاعات وارد شده اشتباه است.")
    .matches(/[A-Z]/, "اطلاعات وارد شده اشتباه است.")
    .matches(/[0-9]/, "اطلاعات وارد شده اشتباه است.")
    .matches(
      /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
      "اطلاعات وارد شده اشتباه است.",
    )
    .required("رمز عبور الزامی است."),
  selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
});
export const loginEmailSchema = Yup.object().shape({
  email: Yup.string().email().required(",ایمیل الزامی می باشد."),
  password: Yup.string()
    .min(8, "اطلاعات وارد شده اشتباه است.")
    .matches(/[a-z]/, ",اطلاعات وارد شده اشتباه است.")
    .matches(/[A-Z]/, "اطلاعات وارد شده اشتباه است.")
    .matches(/[0-9]/, "اطلاعات وارد شده اشتباه است.")
    .matches(
      /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
      "اطلاعات وارد شده اشتباه است.",
    )
    .required("رمز عبور الزامی است."),
});

export const registerSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("شماره همراه الزامی می باشد."),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر باشد.")
    .matches(/[a-z]/, "رمز عبور حداقل باید شامل یک حرف کوچک انگلیسی باشد.")
    .matches(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد.")
    .matches(/[0-9]/, "رمز عبور حداقل باید شامل یک عدد باشد.")
    .matches(
      /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
      "رمز عبور باید حداقل شامل یک کاراکتر ویژه باشد (!@#$%^&*()-+).",
    )
    .required("رمز عبور الزامی است."),
  selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
  terms: Yup.boolean()
    .test(
      "required",
      "لطفا قوانین را مطالعه کنید و تایید کنید",
      (value) => value === true,
    )
    .required(),
  codeReference: Yup.string().required("لطفا کد معرف خود را وارد کنید."),
});
export const changePassSchema = Yup.object().shape({
  oldPassword: Yup.string().required("رمز عبور قبلی الزامی است."),
  newPassword: Yup.string()
    .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر باشد.")
    .matches(/[a-z]/, "رمز عبور حداقل باید شامل یک حرف کوچک انگلیسی باشد.")
    .matches(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد.")
    .matches(/[0-9]/, "رمز عبور حداقل باید شامل یک عدد باشد.")
    .matches(
      /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
      "رمز عبور باید حداقل شامل یک کاراکتر ویژه باشد (!@#$%^&*()-+).",
    )
    .required("رمز عبور الزامی است."),
  rePassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword")],
      "رمز عبور و تکرار رمز عبور با هم مطابقت ندارند.",
    )
    .required("تکرار رمز عبور الزامی می باشد."),
});

export const OtpSchema = Yup.object().shape({
  code: Yup.string().required("کد ارسالی به درستی وارد نشده است."),
});

export const InformationSchema = Yup.object().shape({
  firstName: Yup.string().required("درج نام الزامی است."),
  lastName: Yup.string().required("درج نام خانوادگی الزامی است."),
  nationalCode: Yup.string().required("کد ملی الزامی می باشد."),
  // birthDate: Yup.string().required("تاریخ تولد الزامی می باشد."),
  phoneNumber: Yup.string(),
  email: Yup.string().email().required("درج ایمیل الزامی می باشد."),
});

export const forgetPassSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("شماره همراه الزامی می باشد."),
  selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
});
export const forgetPassWithEmailSchema = Yup.object().shape({
  email: Yup.string().email().required(",ایمیل الزامی می باشد."),
});

export const forgetPassSchema2 = Yup.object().shape({
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر باشد.")
    .matches(/[a-z]/, "رمز عبور حداقل باید شامل یک حرف کوچک انگلیسی باشد.")
    .matches(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد.")
    .matches(/[0-9]/, "رمز عبور حداقل باید شامل یک عدد باشد.")
    .matches(
      /[!@#$%^&*()\-_=+[\]{}|;:',.<>/?\\]/,
      "رمز عبور باید حداقل شامل یک کاراکتر ویژه باشد (!@#$%^&*()-+).",
    )
    .required("رمز عبور الزامی است."),
  rePassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "رمز عبور و تکرار رمز عبور با هم مطابقت ندارند.",
    )
    .required("تکرار رمز عبور الزامی می باشد."),
});

export const inviteCodes = [
  "0PNDE",
  "DVHR9",
  "BWL58",
  "JWGQ7",
  "BEWZP",
  "QBOKE",
  "YCQGZ",
  "YTEJX",
  "28A9W",
  "LY30C",
  "A2WN7",
  "3EF5I",
  "CTZM3",
  "WVXKP",
  "KHVPA",
  "9LAID",
  "SGUL9",
  "O3UMD",
  "IA4CP",
  "U0MXY",
  "0NASK",
  "WZR9E",
  "ANFK8",
  "72D85",
  "ILQFE",
  "7LIBV",
  "I5KDT",
  "C7Y82",
  "D9M1B",
  "OX74R",
  "J94VX",
  "15SYP",
  "O2H81",
  "YE1ZU",
  "5W3BC",
  "O65XN",
  "3QCZK",
  "96HDG",
  "TNF5W",
  "2Z7VU",
  "FEBP4",
  "HF1X0",
  "812HO",
  "GHYN4",
  "KFM24",
  "ILRD3",
  "EC13D",
  "5D69K",
  "O7349",
  "TOM0L",
  "JHDOR",
  "NQGMY",
  "L4BFX",
  "1XMNE",
  "E9M4I",
  "FG3KE",
  "OX4CN",
  "QPO82",
  "8IHFZ",
  "G9W8P",
  "KURS8",
  "2Z1CI",
  "SU9P3",
  "GMFPI",
  "A4STR",
  "DC7F3",
  "CGRAS",
  "AC1W9",
  "BXWTR",
  "YNS8D",
  "TD73R",
  "2JHD4",
  "6U3HM",
  "E34B2",
  "XDY04",
  "S479A",
  "OK38N",
  "QWTNO",
  "4CTKS",
  "F2WM6",
  "5H8S4",
  "EX8V9",
  "8VATO",
  "TEOGK",
  "Y9WS6",
  "JKGP7",
  "3KTZR",
  "RCDB0",
  "0MQNY",
  "PN2ID",
  "PD83C",
  "N7KUW",
  "L8W7U",
  "R9OCX",
  "MGW83",
  "DLHBE",
  "FQCXG",
  "2SDMQ",
  "IEPZ6",
  "M6REL",
];
