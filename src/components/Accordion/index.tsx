import { useState } from "react";
import styles from "./Accordion.module.css";
import acc from "assets/icons/acc.svg";
import darkAcc from "assets/icons/dark-acc.svg";

type Props = {
  item: any;
  dark: any;
  className: string;
  titleStyle?: string;
};
export default function Accordion({
  item,
  dark,
  className,
  titleStyle,
}: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      className={`${styles["accordion_item"]} ${isActive ? styles.active : ""} ${className}`}
    >
      <div
        className={styles["accordion_title"]}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={titleStyle}>{item.title}</div>
        <span className={isActive ? styles["active_svg"] : ""}>
          {dark ? (
            <img src={darkAcc} alt="icon" />
          ) : (
            <img src={acc} alt="icon" />
          )}
        </span>
      </div>
      <div
        className={`${styles["accordion_content"]} ${isActive ? "active" : ""}`.trim()}
      >
        <p>{item.description}</p>
      </div>
    </article>
  );
}
