import style from "assets/scss/components/spot-tab.module.scss";
import { ReactNode } from "react";

type Props = {
  tabContent: {
    code: number;
    title: string | ReactNode;
    codeName?: "IRR" | "USDT";
    callback?: any;
  }[];
  handler: (number) => void;
  activeTab: number;
  label?: string;
  styleSpot?: any;
};
export default function SpotTab({
  tabContent,
  handler,
  activeTab,
  label,
  styleSpot,
}: Props) {
  return (
    <div className={style["switch-box"]} style={styleSpot}>
      <span>{label}</span>
      {tabContent.map((item, index) => (
        <button
          key={index}
          onClick={() => handler?.(item.code)}
          className={`${style["switch-button"]} ${activeTab === item.code ? style.active : ""}`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
