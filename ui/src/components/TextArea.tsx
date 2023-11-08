import { IInputComponentProps } from "lib/interfaces/props";

const TextArea: React.FC<IInputComponentProps<HTMLTextAreaElement>> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = true,
}) => {
  return (
    <div className="w-full">
      <label className="text-small mb-1 block" htmlFor={id}>
        <span>{label}</span>
        {error && <span className="ml-1 text-error">— {error}</span>}
      </label>
      <textarea
        className={`w-full rounded border h-40 ${
          error ? "border-error" : "border-gray-300"
        } p-1`}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextArea;
