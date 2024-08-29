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
import Image from 'next/image';

import PersianLight from '@/public/images/logo/PersianLight.svg';
import PersianDark from '@/public/images/logo/PersianDark.svg';

export default function Header() {
  const [authenticated, setAuthenticated] = useState(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeMenu, setactiveMenu] = useState(false);
  const menuItems = [
    {
      title: 'قیمت لحظه ای',
      icon: <PhoneCall />,
      address: '/coins',
      DarkIcon: <DarkPhoneCall />,
    },
    {
      title: 'خرید سریع',
      icon: <PhoneBlog />,
      address: `${ADMIN_ADDRESS}/exchange`,
      DarkIcon: <DarkPhoneBlog />,
    },
    {
      title: 'مرکز راهنمایی',
      icon: <PhoneLogo />,
      address: 'https://help.arsonex.com/',
      DarkIcon: <DarkPhoneLogo />,
    },
    {
      title: 'وبلاگ',
      icon: <PhoneCall />,
      address: 'https://arsonex.com/blog',
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
          <Image
            className={styles.header_title}
            src={theme === 'dark' ? PersianDark : PersianLight}
            alt="Arsonex-logo"
          />
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
