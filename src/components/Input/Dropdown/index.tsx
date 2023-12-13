import { ReactNode, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import dropdown from "assets/scss/components/Input/dropdown.module.scss";

export type OptionType = {
  value: string;
  content: ReactNode | string;
  otherOptions?: any;
};

type Props = {
  options: OptionType[] | [];
  id?: string;
  value: string | number;
  onChange?: (value: string, other?: any) => void;
  children?: ReactNode;
  hasError?: boolean;
  disabled?: boolean;
  label?: string;
};

const DropdownInput = ({
  options,
  value,
  onChange,
  id = "dropdown-input",
  children,
  label,
  hasError = false,
  disabled = false,
}: Props) => {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType>();

  useEffect(() => {
    const select = options.filter((option) => option.value === value);
    select.length > 0 && setSelectedOption(select[0]);
  }, [options, value]);

  const toggleDropdown = () => {
    setIsOpenDrop(!isOpenDrop);
  };

  const handleOptionSelect = (option: OptionType) => {
    option.otherOptions
      ? onChange?.(option.value, option.otherOptions)
      : onChange?.(option.value);
    setSelectedOption(option);
    setIsOpenDrop(false); // Close the dropdown when an option is selected
  };

  return (
    <Dropdown
      className={`${dropdown["custom-dropdown"]} ${
        hasError ? dropdown["invalid"] : ""
      } bootstrap-select bs-select-control bs-form-select`}
      isOpen={isOpenDrop}
      id={id}
      toggle={toggleDropdown}
      disabled={disabled}
    >
      <DropdownToggle
        className={`${dropdown["toggle-btn"]} ${
          isOpenDrop ? dropdown["show"] : ""
        }`}
        caret
        tabIndex={-1}
        color="light"
      >
        {selectedOption?.content || label}
      </DropdownToggle>
      <DropdownMenu
        className={`${dropdown["custom-dropdown__menu-wrapper"]} ${
          isOpenDrop ? dropdown["show"] : ""
        }`}
      >
        {children ? (
          children
        ) : (
          <ul
            className={`${dropdown["custom-dropdown__menu"]} ${dropdown.inner}`}
          >
            {options?.length > 0 ? (
              options.map((option: OptionType, index: number) => {
                return (
                  <DropdownItem
                    key={index}
                    tag="li"
                    onClick={() => handleOptionSelect(option)}
                  >
                    <a
                      role="option"
                      className={`${dropdown["custom-dropdown__item"]} ${
                        value === option.value ? dropdown["selected"] : ""
                      }`}
                    >
                      {option.content}
                    </a>
                  </DropdownItem>
                );
              })
            ) : (
              <DropdownItem key={0} tag="li" className="text-center">
                دیتایی وجود ندارد
              </DropdownItem>
            )}
          </ul>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownInput;
