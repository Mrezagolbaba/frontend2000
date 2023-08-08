import { Input } from "antd";

const InputComponent: React.FC<InputProps> = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  size,
  prefix,
  className,
  style,
}) => {
  return (
    <Input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size={size}
      prefix={prefix}
      style={style}
      className={`input-style ${className}`}
    />
  );
};
export default InputComponent;
