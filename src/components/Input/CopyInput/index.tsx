import ClipboardJS from "clipboard";
import { LuCopy } from "react-icons/lu";
import { useRef } from "react";

import style from "assets/scss/components/Input/copyInput.module.scss";
import Notify from "components/Notify";

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
        Notify({ type: "success", text: "کپی شد." });
        e.clearSelection();
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        Notify({ type: "error", text: "کپی نشد! لطفا دوباره تلاش کنید." });
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
