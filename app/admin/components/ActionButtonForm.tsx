// components/CustomButton.tsx
import React from "react";
import {
  DocumentPlusIcon,
  DocumentIcon,
  ArrowTurnDownLeftIcon,
  ArrowPathIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/16/solid";

interface CustomButtonProps {
  variant: "submit" | "reset" | "saveasdraft" | "cancel" | "update" | "back" | "cari";
  name?: string;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const ActionButtonForm: React.FC<CustomButtonProps> = React.memo(({
  variant,
  name,
  value,
  onClick,
  isLoading,
}) => {
  let className = "btn btn-sm ";
  let icon = null;
  let ButtonName = null;
  let buttonType: 'button' | 'submit' | 'reset' = 'button';

  switch (variant) {
    case "submit":
      className += " btn-primary";
      icon = <DocumentPlusIcon className="h-5 w-5" />;
      ButtonName = isLoading ? 'Creating...' : 'Save';
      buttonType = "submit";
      break;
      case "update":
        className += " btn-primary";
        icon = <DocumentArrowUpIcon className="h-5 w-5" />;
        ButtonName = isLoading ? 'Updating...' : 'Update';
        buttonType = "submit";
        break;
    case "reset":
      className += " ";
      icon = <ArrowPathIcon className="h-5 w-5" />;
      ButtonName = "Reset";
      buttonType = "reset";
      break;
    case "saveasdraft":
      className += " btn-secondary";
      icon = <DocumentIcon className="h-5 w-5" />;
      ButtonName = isLoading ? 'Creating...' : "Save As Draft";
      buttonType = "submit";
      break;
    case "cancel":
      className += " btn-neutral";
      icon = <ArrowTurnDownLeftIcon className="h-5 w-5" />;
      ButtonName = "Cancel";
      buttonType = "button";
      break;
      case "back":
      className += " btn-neutral";
      icon = <ArrowTurnDownLeftIcon className="h-5 w-5" />;
      ButtonName = "Back";
      buttonType = "button";
      break;
      case "cari":
      className += " btn-neutral mt-8";
      ButtonName = "Advance Search";
      buttonType = "button";
      break;
  }

  return (
    <button
      type={buttonType}
      name={name}
      value={value}
      onClick={onClick}
      className={className}
      disabled={isLoading}
    >
      {icon}
      {ButtonName}
    </button>
  );
});

ActionButtonForm.displayName = 'ActionButtonForm';

export default ActionButtonForm;
