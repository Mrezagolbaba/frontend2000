import { ReactElement } from "react";
import { Alert } from "reactstrap";
import { PiInfo, PiWarning, PiCheckCircle } from "react-icons/pi";

import alert from "assets/scss/components/Alert/style.module.scss";

type Props = {
  text: string;
  hasIcon?: boolean;
  icon: ReactElement;
  className: string;
};

function AlertBase({ text, hasIcon = false, icon, className }: Props) {
  return (
    <Alert className={`${alert["alert"]} ${className}`}>
      {hasIcon && <span className={alert["alert__icon"]}>{icon}</span>}
      <span className={alert["alert__text"]}>{text}</span>
    </Alert>
  );
}

const AlertInfo = ({ text, hasIcon }) => {
  return (
    <AlertBase
      className={alert.info}
      text={text}
      hasIcon={hasIcon}
      icon={<PiInfo />}
    />
  );
};
const AlertWarning = ({ text, hasIcon }) => {
  return (
    <AlertBase
      className={alert.warning}
      text={text}
      hasIcon={hasIcon}
      icon={<PiWarning />}
    />
  );
};
const AlertSuccess = ({ text, hasIcon }) => {
  return (
    <AlertBase
      className={alert.success}
      text={text}
      hasIcon={hasIcon}
      icon={<PiCheckCircle />}
    />
  );
};
const AlertDanger = ({ text, hasIcon }) => {
  return (
    <AlertBase
      className={alert.danger}
      text={text}
      hasIcon={hasIcon}
      icon={<PiWarning />}
    />
  );
};

export { AlertInfo, AlertWarning, AlertSuccess, AlertDanger };
