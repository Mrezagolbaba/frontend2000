import { useContext } from "react";
import darkTwitter from "assets/icons/dark-twitter.svg";
import twitter from "assets/icons/twitter.svg";
import instagram from "assets/icons/instagram.svg";
import linkedin from "assets/icons/linkedin.svg";
import telegram from "assets/icons/telegram.svg";
import { Link } from "react-router-dom";
import ThemeContext from "contexts/ThemeContext";

import styles from "./SocialMedia.module.css";

export default function SocialMedia() {
  const { theme } = useContext(ThemeContext);

  const socialMediaItems = [
    {
      address: "https://t.me/Arsonexchange",
      icon: <img src={telegram} alt="icon" />,
      darkIcon: <img src={telegram} alt="icon" />,
    },
    {
      address: "https://twitter.com/Arsonexchange",
      icon: <img src={twitter} alt="icon" />,
      darkIcon: <img src={darkTwitter} alt="icon" />,
    },
    {
      address: "https://www.instagram.com/Arsonexchange/",
      icon: <img src={instagram} alt="icon" />,
      darkIcon: <img src={instagram} alt="icon" />,
    },
    {
      address: "#",
      icon: <img src={linkedin} alt="icon" />,
      darkIcon: <img src={linkedin} alt="icon" />,
    },
  ];

  return (
    <ul className={styles.social_media}>
      {socialMediaItems.map((item, index) => (
        <li key={index}>
          <Link to={item.address}>
            {theme === "dark" ? item.darkIcon : item.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}
