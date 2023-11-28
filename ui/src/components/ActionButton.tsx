import {
  PRIMARY_BRAND_COLOR,
  SECONDARY_BRAND_COLOR,
} from "lib/constants/styles";
import { ClipLoader } from "react-spinners";

interface IProps {
  color: "danger" | "brand";
  onClick: () => void;
  performingAction?: boolean;
  text: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  textSize: 'small' | 'medium'
}

const ActionButton: React.FC<IProps> = ({
  color,
  onClick,
  performingAction = false,
  text,
  type = "button",
  fullWidth = false,
  textSize
}) => {
  const btnColorClassnames =
    color === "danger"
      ? "border-transparent bg-red-100 text-red-900 focus-visible:ring-red-500 hover:bg-red-200"
      : `border-primary-brand-color bg-primary-brand-color text-secondary-brand-color disabled:bg-primary-brand-color disabled:cursor-not-allowed hover:text-primary-brand-color hover:bg-transparent`;

  return (
    <button
      type={type}
      className={
        `inline-flex ${
          fullWidth ? "w-full" : ""
        } justify-center rounded-md border px-4 py-2 ${textSize === 'small' ? 'text-sm' : 'text-base'} font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ` +
        btnColorClassnames
      }
      onClick={onClick}
      disabled={performingAction}
    >
      {performingAction ? (
        <ClipLoader
          size={20}
          color={
            performingAction && color === "brand"
              ? SECONDARY_BRAND_COLOR
              : PRIMARY_BRAND_COLOR
          }
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default ActionButton;
