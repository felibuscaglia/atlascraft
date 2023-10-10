interface IInputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<IInputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full">
      <label className="text-small mb-1 block" htmlFor={id}>
        <span>{label}</span>
        {error && <span className="text-error ml-1">— {error}</span>}
      </label>
      <input
        className={`w-full rounded border ${
          error ? "border-error" : "border-gray-300"
        } p-2`}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
