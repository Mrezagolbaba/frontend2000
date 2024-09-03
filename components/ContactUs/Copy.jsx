import React, { useContext } from 'react';
import { DarkCopy, LightCopy } from '../svg';
import ThemeContext from '../ThemeContext';
import styles from './ContactUs.module.css';

export default function Copy({ label }) {
  const { theme } = useContext(ThemeContext);

  return (
    <button className={styles.copy} data-label={label}>
      {theme === 'dark' ? <DarkCopy /> : <LightCopy />}
    </button>
  );
}
