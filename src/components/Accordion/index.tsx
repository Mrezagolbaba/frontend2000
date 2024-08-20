import { useState } from "react";
import styles from "./Accordion.module.css";
import { Acc, DarkAcc } from "components/Icons/landingIcons";

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
      className={`${styles.accordion_item} ${isActive ? styles.active : ""} ${className}`}
    >
      <div
        className={styles.accordion_title}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={titleStyle}>{item.title}</div>
        <span className={isActive ? styles.active_svg : ""}>
          {dark ? <DarkAcc /> : <Acc />}
        </span>
      </div>
      <div
        className={`${styles.accordion_content} ${isActive ? styles.accordion_content_active : ""}`.trim()}
      >
        <p>{item.description}</p>
      </div>
    </article>
  );
}
