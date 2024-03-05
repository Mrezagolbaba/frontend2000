//style
import style from "assets/scss/dashboard/profile.module.scss";

const CircleProgressBar = ({ counter }: { counter: number }) => {
  //render
  return (
    <div className={style.progressbar}>
      <div className={style.progressbar__circles}>
        <svg>
          <circle
            r="59"
            cy="62.5"
            cx="62.5"
            strokeWidth="1"
            className={style["progressbar__circles__background-dashes"]}
          />
          <circle
            r="59"
            cy="62.5"
            cx="62.5"
            strokeWidth="2"
            className={`${style["progressbar__circles__progress-dashes"]} ${style[`progressbar__circles__progress-dashes--${counter}`]}`}
          />
        </svg>
      </div>
    </div>
  );
};

export default CircleProgressBar;
