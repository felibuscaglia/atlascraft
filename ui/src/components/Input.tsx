import { IInputComponentProps } from "lib/interfaces/props";

interface IInputProps extends IInputComponentProps<HTMLInputElement> {
  size?: "small" | "base";
  type?: React.HTMLInputTypeAttribute;
}

const Input: React.FC<IInputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  required = true,
  size = "base",
}) => {
  return (
    <div className="w-full">
      <label className="text-small mb-1 block" htmlFor={id}>
        <span>{label}</span>
        {error && <span className="ml-1 text-error">— {error}</span>}
      </label>
      <input
        className={`w-full rounded border ${
          error ? "border-error" : "border-gray-300"
        } ${size === "base" ? "p-2" : "p-1"}`}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
