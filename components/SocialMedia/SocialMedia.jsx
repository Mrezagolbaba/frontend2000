import Link from 'next/link';
import React, { useContext } from 'react';
import { DarkTwitter, Instagram, LinkedIn, Telegram, Twitter } from '../svg';
import styles from './SocialMedia.module.css';
import ThemeContext from '../ThemeContext';

export default function SocialMedia() {
  const { theme } = useContext(ThemeContext);

  const socialMediaItems = [
    {
      address: 'https://t.me/Arsonexchange',
      icon: <Telegram />,
      darkIcon: <Telegram />,
    },
    {
      address: 'https://twitter.com/Arsonexchange',
      icon: <Twitter />,
      darkIcon: <DarkTwitter />,
    },
    {
      address: 'https://www.instagram.com/Arsonexchange/',
      icon: <Instagram />,
      darkIcon: <Instagram />,
    },
    // { address: '#', icon: <LinkedIn />, darkIcon: <LinkedIn /> },
  ];

  return (
    <ul className={styles.social_media}>
      {socialMediaItems.map((item, index) => (
        <li key={index}>
          <Link href={item.address}>
            {theme === 'dark' ? item.darkIcon : item.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}
