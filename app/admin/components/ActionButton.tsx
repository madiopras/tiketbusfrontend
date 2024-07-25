// components/CustomButton.tsx
import React from "react";
import {
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

interface CustomButtonProps {
  variant: "edit" | "view" | "delete";
  name?: string;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: string;
  children?: React.ReactNode;
}

const ActionButton: React.FC<CustomButtonProps> = React.memo(({
  variant,
  name,
  value,
  onClick,
  disabled = false,
  type = "button",
}) => {
  let className = "btn btn-xs btn-square mr-2";
  let icon = null;

  switch (variant) {
    case "edit":
      className += " btn-warning";
      icon = <PencilSquareIcon className="h-4 w-4" />;
      break;
    case "view":
      className += " btn-info";
      icon = <EyeIcon className="h-4 w-4" />;
      break;
    case "delete":
      className += " btn-error";
      icon = <TrashIcon className="h-4 w-4" />; 
      break;
  }

  return (
    <button
      type={"button"}
      name={name}
      value={value}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {icon}
    </button>
  );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
