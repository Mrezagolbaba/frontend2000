import { Input } from "antd";

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "large" | "middle" | "small";
  prefix: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

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
