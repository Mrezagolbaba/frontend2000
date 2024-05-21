import ClipboardJS from "clipboard";
import toast from "react-hot-toast";
import { LuCopy } from "react-icons/lu";
import { useRef } from "react";

import style from "assets/scss/components/Input/copyInput.module.scss";

type Props = {
  text: string;
  isIban?: boolean;
  hasBox?: boolean;
  maxCharacter?: number;
};

export default function CopyInput({
  text,
  isIban = false,
  hasBox = true,
  maxCharacter,
}: Props) {
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
    }
  };

  return text ? (
    <button
      type="button"
      className={`${style["copy-btn"]} ${hasBox ? style["btn-with-box"] : style["btn-without-box"]} d-ltr iban-copy`}
      onClick={handleCopy}
      ref={buttonRef}
      data-clipboard-text={text}
    >
      <span className={style["copy-btn__icon"]}>
        <LuCopy />
      </span>
      <span className={style["copy-btn__text"]}>
        {maxCharacter && text?.length > maxCharacter
          ? text.slice(0, maxCharacter) + "..."
          : text}
      </span>
    </button>
  ) : null;
}
