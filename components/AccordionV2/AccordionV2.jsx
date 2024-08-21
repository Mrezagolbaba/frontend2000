import React, { useState } from 'react';
import styles from './AccordionV2.module.css';
import { Acc, DarkAcc } from '../svg';

export default function AccordionV2({ item, dark, className, titleStyle }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      className={`${styles.accordion_item} ${isActive ? styles.active : ''} ${className}`}
    >
      <div
        className={styles.accordion_title}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={titleStyle}>{item.title}</div>
        <span className={isActive ? styles.active_svg : ''}>
          {dark ? <DarkAcc /> : <Acc />}
        </span>
      </div>
      <div
        className={`${styles.accordion_content} ${isActive ? styles.accordion_content_active : ''}`.trim()}
      >
        <div className={styles.body}>{item.description}</div>
      </div>
    </article>
  );
}
