import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import styles from '../Header/Header.module.css';
import ThemeContext from '../ThemeContext';
import PhoneMenu from './PhoneMenu';
import { usePathname } from 'next/navigation';
import {
  DarkPhoneBlog,
  DarkPhoneCall,
  DarkPhoneLogo,
  DarkPhoneMenuIcon,
  PhoneBlog,
  PhoneCall,
  PhoneLogo,
  PhoneMenuIcon,
} from '../svg';
import { ADMIN_ADDRESS } from '@/data/config';

export default function Header() {
  const [authenticated, setAuthenticated] = useState(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeMenu, setactiveMenu] = useState(false);
  const menuItems = [
    {
      title: 'بازارها',
      icon: <PhoneCall />,
      address: '/coinsList',
      DarkIcon: <DarkPhoneCall />,
    },
    {
      title: 'بلاگ',
      icon: <PhoneBlog />,
      address: '#',
      DarkIcon: <DarkPhoneBlog />,
    },
    {
      title: 'درباره ما',
      icon: <PhoneLogo />,
      address: '/aboutUs',
      DarkIcon: <DarkPhoneLogo />,
    },
    {
      title: 'تماس با ما',
      icon: <PhoneCall />,
      address: '/contactUs',
      DarkIcon: <DarkPhoneCall />,
    },
  ];

  const menuBtn = [
    {
      title: 'ورود',
      address: `${ADMIN_ADDRESS}/login`,
      class: styles.login,
      phoneClass: styles.phone_login,
    },
    {
      title: 'ثبت نام',
      address: `${ADMIN_ADDRESS}/register`,
      class: styles.signup,
      phoneClass: styles.phone_signup,
    },
  ];

  return (
    <header
      className={`container ${styles.header_holder}  ${theme === 'dark' ? 'theme-dark' : ''}`}
    >
      <div className={styles.logo_holder}>
        <button
          className={styles.phone_menu_btn}
          onClick={() => setactiveMenu(true)}
        >
          {theme === 'dark' ? <DarkPhoneMenuIcon /> : <PhoneMenuIcon />}
        </button>

        {activeMenu && (
          <PhoneMenu
            {...{ setactiveMenu, menuItems, menuBtn, authenticated }}
          />
        )}

        <Link href="/">
          <h1
            className={`${styles.header_title} ${theme === 'dark' && styles.dark_header_title}`}
          >
            آرسونیکس
          </h1>
        </Link>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.address}
            className={
              pathname === item.address
                ? styles.header_holder_menu_active
                : null
            }
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <div className={styles.header_buttons_holder}>
        <label className={`${styles.switch} ${styles.larg}`}>
          <input
            type="checkbox"
            checked={theme === 'light'}
            onChange={toggleTheme}
          />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>

        {menuBtn.map((item, index) => (
          <Link key={index} className={item.class} href={item.address}>
            {item.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
