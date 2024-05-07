import PhoneInput from "react-phone-input-2";

import "./style.scss";
type Props = {
  value: string;
  onChange: (string) => void;
};

export default function Phone({ value, onChange }: Props) {
  return (
    <PhoneInput
      containerClass="phone-control"
      inputClass="phone-control__input"
      buttonClass="phone-control__btn"
      dropdownClass="phone-control__dropdown"
      country={"ir"}
      value={value}
      onChange={(phone) => onChange(phone)}
      enableSearch={true}
      preferredCountries={["ir", "tr", "ru", "ae"]}
      excludeCountries={["il"]}
    />
  );
}
