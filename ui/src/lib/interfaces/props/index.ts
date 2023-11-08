export interface IInputComponentProps<T> {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<T>) => void;
}