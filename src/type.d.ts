interface OtpData {
  code: string;
  type: string;
  method: string;
}
interface NumericInputProps {
  style?: React.CSSProperties;
  value: string;
  onChange: (value: string) => void;
}

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
interface OtpInputProps {
  onChange: (code: string) => void;
}

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
interface SidebarProps {
  isOpen: boolean;
  onSidebarToggle: () => void;
}
interface TabOptionProps {
  label: React.ReactElement | string;
  key: string;
  children: React.ReactElement;
}

interface ProtectedRouteProps {
  user: boolean;
  children: any;
}
interface ErrorBoundaryProps {
  children: React.ReactNode;
}
