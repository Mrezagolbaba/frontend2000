import { useRef } from "react";
import { LuCopy } from "react-icons/lu";
import ClipboardJS from "clipboard";
import toast from "react-hot-toast";

import style from "./style.module.scss";

type Props = {
  text: string;
};

export default function CopyInput({ text }: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleCopy = () => {
    if (buttonRef.current) {
      const clipboard = new ClipboardJS(buttonRef.current);

      clipboard.on("success", (e) => {
        toast.success("کپی شد.", { position: "top-center" });
        e.clearSelection();
        clipboard.destroy();
      });

      clipboard.on("error", () => {
        toast.error("کپی نشد! لطفا دوباره تلاش کنید.", {
          position: "top-center",
        });
        clipboard.destroy();
      });

      buttonRef.current.click();
    }
  };

  return (
    <button
      type="button"
      className={`${style["copy-btn"]} d-ltr iban-copy`}
      onClick={handleCopy}
      ref={buttonRef}
      data-clipboard-text={text}
    >
      <span className={style["copy-btn__icon"]}>
        <LuCopy />
      </span>
      <span className={style["copy-btn__text"]}>{text}</span>
    </button>
  );
}
