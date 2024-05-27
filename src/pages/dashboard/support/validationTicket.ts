import * as Yup from "yup";
export const TicketSchema = Yup.object().shape({
  category: Yup.string().required("دسته بندی الزامی است."),
  subject: Yup.string().required("عنوان الزامی است."),
  description: Yup.string().required("توضیحات الزامی است."),
});
