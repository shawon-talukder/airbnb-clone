import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  icon,
  outline,
  small,
}) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
    ${outline ? "bg-white" : "bg-rose-500"}
    ${outline ? "border-black" : "border-rose-500"}
    ${outline ? "text-black" : "text-white"}
  `}
    >
      {label}
    </button>
  );
};

export default Button;
