// components/CustomButton.tsx
import React from "react";
import {
  UserPlusIcon,
  ArchiveBoxArrowDownIcon,
  PrinterIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/16/solid";

interface CustomButtonProps {
  variant: "create" | "import" | "export" | "print";
  name?: string;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: string;
  children?: React.ReactNode;
}

const ActionButtonHeader: React.FC<CustomButtonProps> = React.memo(({
  variant,
  name,
  value,
  onClick,
  disabled = false,
  type = "button",
}) => {
  let className = "btn btn-sm";
  let icon = null;
  let ButtonName = null;

  switch (variant) {
    case "create":
      className += " btn-primary";
      icon = <UserPlusIcon className="h-5 w-5" />;
      ButtonName = "Create";
      break;
    case "import":
      className += " btn-secondary";
      icon = <ArchiveBoxArrowDownIcon className="h-5 w-5" />;
      ButtonName = "Import";
      break;
    case "export":
      className += " btn-secondary";
      icon = <DocumentArrowUpIcon className="h-5 w-5" />;
      ButtonName = "Export";
      break;
      case "print":
        className += " btn-secondary";
        icon = <PrinterIcon className="h-5 w-5" />;
        ButtonName = "Print";
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
      {icon}{ButtonName}
    </button>
  );
});

ActionButtonHeader.displayName = 'ActionButtonHeader';

export default ActionButtonHeader;
