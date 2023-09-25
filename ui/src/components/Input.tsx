interface IInputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
}

const Input: React.FC<IInputProps> = ({ id, label, placeholder, type = 'text' }) => {
  return (
    <div className="w-full">
      <label className="text-small mb-1 block" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full rounded border border-gray-300 p-2"
        id={id}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default Input;
