import Notify from "components/Notify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LuCopy } from "react-icons/lu";

import style from "assets/scss/components/Input/copyInput.module.scss";
import CopyIcon from "components/Icons/CopyIcon";

type Props = {
  text: string;
  hasBox?: boolean;
  maxCharacter?: number;
  name?:string
};

export default function CopyInput({
  text,
  hasBox = true,
  maxCharacter,
  name
}: Props) {
  return text ? (
    <CopyToClipboard
      text={text}
      onCopy={() => Notify({ type: "success", text: `${name} کپی شد.` })}
    >
      <button
        type="button"
        className={`${style["copy-btn"]} ${hasBox ? style["btn-with-box"] : style["btn-without-box"]} d-ltr iban-copy`}
        data-clipboard-text={text}
      >
        <span className={style["copy-btn__icon"]}>
          <CopyIcon />
        </span>
        <span className={style["copy-btn__text"]}>
          {maxCharacter && text?.length > maxCharacter
            ? text.slice(0, maxCharacter) + "..."
            : text}
        </span>
      </button>
    </CopyToClipboard>
  ) : null;
}
