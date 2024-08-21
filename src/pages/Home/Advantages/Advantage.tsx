import { Link } from "react-router-dom";
import styles from "./Advantage.module.css";
import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactElement | ReactElement[];
  className: string;
  title: string | ReactNode;
  description: string;
  address: string;
  actionHolderCls?: string;
};
export default function Advantage({
  children,
  className,
  title,
  description,
  address,
  actionHolderCls,
}: Props) {
  return (
    <div className={`${styles.options} ${className}`}>
      <article className={styles.options_description}>
        <h3 className="section_title">{title}</h3>
        <p className={styles.options_description_text}>{description}</p>
        <Link className={styles.options_description_link} to={address}>
          اطلاعات بیشتر
        </Link>
      </article>

      <section className={styles.left_section}>
        <div
          className={
            actionHolderCls
              ? `${styles.action_holder} ${actionHolderCls}`
              : styles.action_holder
          }
        >
          {children}
        </div>
      </section>
    </div>
  );
}
