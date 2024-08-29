import React from 'react';
import styles from '../Tab/Tab.module.css';
import { useEffect, useState } from 'react';

export default function Tab({ tabContent, fcn, activeTab, hidden, label }) {
  const [classProperty, setClassProperty] = useState('');

  useEffect(() => {
    setClassProperty(
      `${styles.switch_box} ${hidden ? styles.hidden_switch : ''}`,
    );
  }, []);

  return (
    <div className={classProperty}>
      <span>{label}</span>
      {tabContent.map((item, index) => (
        <button
          key={index}
          onClick={() => fcn(item.code, item.content, item.type)}
          className={`${styles.switch_button} ${activeTab === item.code ? styles.switch_button_active : null}`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
