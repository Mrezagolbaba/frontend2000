import toast from "react-hot-toast";
type Props = {
  type: "success" | "error";
  text: string;
};
const Notify = ({ type, text }: Props) => {
  if (type === "success") return toast.success(text, { position: "top-left" });
  else return toast.error(text, { position: "top-left" });
};

export default Notify;
