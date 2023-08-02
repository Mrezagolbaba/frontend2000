import { Select } from "antd";
import React from "react";

interface SelectProps {
  options: Array<{ value: string; label: string }>;
    handleChange?: (value: string) => void;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    id: string;
    size?: "large" | "middle" | "small";
    style?: React.CSSProperties;
    className?: string;
}
const SelectComponent: React.FC<SelectProps> = ({ options,
    handleChange,
    value,
    placeholder,
    disabled,
    id,
    size,
    style
    ,className
 }) => {
 

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
      <Select
        className={`dropdown bootstrap-select bs-select-control bs-form-select ${className}`}
        size={size}
        disabled={disabled}
        id={id}
        value={value}
        style={style}
        placeholder={placeholder}
        onChange={handleChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}

      />
  );
};

export default SelectComponent;
