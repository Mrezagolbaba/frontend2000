import Link from 'next/link';
import React, { useContext } from 'react';
import styles from './Header.module.css';
import ThemeContext from '../ThemeContext';
import { CloseMenu, DarkCloseMenu, DarkPhoneTheme, PhoneTheme } from '../svg';
import PersianLight from '@/public/images/logo/PersianLight.svg';
import PersianDark from '@/public/images/logo/PersianDark.svg';
import Image from 'next/image';

export default function PhoneMenu({
  setactiveMenu,
  menuItems,
  menuBtn,
  authenticated,
}) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.phone_menu_holder}>
      <header className={styles.phone_menu_holder_header}>
        <Link href="/">
          <Image
            className={styles.header_title}
            src={theme === 'dark' ? PersianDark : PersianLight}
            alt="Arsonex-logo"
          />
        </Link>

        <button
          className={styles.phone_menu_btn}
          onClick={() => setactiveMenu(false)}
        >
          {theme === 'dark' ? <DarkCloseMenu /> : <CloseMenu />}
        </button>
      </header>

      <ul className={styles.phone_menu}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.address}>
              {theme === 'dark' ? item.DarkIcon : item.icon}
              {item.title}
            </Link>
          </li>
        ))}

        <li className={styles.switch_holder}>
          <span className={styles.switch_holder_title}>
            {theme === 'dark' ? <DarkPhoneTheme /> : <PhoneTheme />}
            تغییر تم
          </span>

          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </li>
      </ul>

      <div className={styles.phone_header_buttons_holder}>
        {!authenticated &&
          menuBtn.map((item, index) => (
            <Link key={index} className={item.phoneClass} href={item.address}>
              {item.title}
            </Link>
          ))}
        {authenticated && (
          <Link href={`${ADMIN_ADDRESS}/dashboard`}>
            {authenticated.firstName} {authenticated.lastName}
          </Link>
        )}
      </div>
    </div>
  );
}