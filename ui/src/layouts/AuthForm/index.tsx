import ErrorBanner from "./ErrorBanner";

interface IAuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  submitBtnText: string;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
}

const AuthFormLayout: React.FC<IAuthFormLayoutProps> = ({
  children,
  title,
  submitBtnText,
  onSubmit,
  error,
}) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      {error && <ErrorBanner error={error} />}
      <form className="flex w-1/4 flex-col gap-4" onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          className="mt-4 rounded border border-primary-brand-color bg-primary-brand-color p-4 font-titles text-white hover:bg-transparent hover:text-primary-brand-color"
        >
          {submitBtnText}
        </button>
      </form>
    </div>
  );
};

export default AuthFormLayout;
