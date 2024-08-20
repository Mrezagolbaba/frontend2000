import { useContext } from "react";
import user from "assets/img/icons/User22.png";
import ThemeContext from "contexts/ThemeContext";
import { Link } from "react-router-dom";

import styles from "./Blog.module.css";

export default function Blog({ className, title, author, date, content }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${className} ${styles.blogs} ${theme === "dark" ? styles.darkBlog : ""}`}
    >
      <h6>{title}</h6>
      <p>{content}</p>
      <div className={styles.blog_info}>
        <span>{date}</span>
        <div className={styles.user_info}>
          <img className={styles.user_info_img} src={user} alt={author} />
          <span>{author}</span>
        </div>
      </div>

      <Link to="#" className={styles.more}>
        مشاهده همه
      </Link>
    </div>
  );
}
