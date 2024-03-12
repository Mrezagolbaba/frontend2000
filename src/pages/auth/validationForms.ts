import * as Yup from "yup";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[0-9]{1,3}?[- .]?\(?[0-9]{3}\)?[- .]?[0-9]{3}[- .]?[0-9]{4}$/;

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
    inviteCode: Yup.string().required("لطفا کد معرف خود را وارد کنید."),
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
