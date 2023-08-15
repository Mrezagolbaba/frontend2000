import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("شماره همراه الزامی می باشد."),
  password: Yup.string()
    .required("رمز عبور الزامی می باشد.")
    .min(6)
    .max(30)
    .trim(),
  selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
});

export const registerSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("شماره همراه الزامی می باشد."),
  password: Yup.string()
    .required("رمز عبور الزامی می باشد.")
    .min(8)
    .max(30)
    .trim(),
  selectedCountry: Yup.string().required("کد کشور الزامی می باشد."),
  terms: Yup.boolean()
    .test(
      "required",
      "لطفا قوانین را مطالعه کنید و تایید کنید",
      (value) => value === true
    )
    .required(),
});

export const OtpSchema = Yup.object().shape({
  code: Yup.string().required("کد ارسالی به درستی وارد نشده است."),
});

export const InformationSchema = Yup.object().shape({
  firstName: Yup.string().required("درج نام الزامی است."),
  lastName: Yup.string().required("درج نام خانوادگی الزامی است."),
  nationalCode: Yup.string().required("کد ملی الزامی می باشد."),
  birthDate: Yup.string().required("تاریخ تولد الزامی می باشد."),
  phoneNumber: Yup.string().required("شماره تماس الزامی می باشد."),
  email: Yup.string().email().required("درج ایمیل الزامی می باشد."),
});