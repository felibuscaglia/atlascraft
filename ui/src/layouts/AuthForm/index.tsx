import ErrorBanner from "./Banners/Error";
import { ClipLoader } from "react-spinners";
import InfoBanner from "./Banners/Info";
import { Link } from 'react-router-dom';
import { UI_PATHS } from "lib/constants/paths";
import { APP_NAME } from "lib/constants/app-data";

interface IAuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  submitBtnText: string;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  infoMsg?: string;
  loading?: boolean;
  isSignIn?: boolean;
}

const AuthFormLayout: React.FC<IAuthFormLayoutProps> = ({
  children,
  title,
  submitBtnText,
  onSubmit,
  error,
  infoMsg,
  loading = false,
  isSignIn = false
}) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      {error && <ErrorBanner error={error} />}
      {infoMsg && <InfoBanner infoMsg={infoMsg} />}
      <form className="flex w-1/4 flex-col gap-4" onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          className="mt-4 rounded border border-primary-brand-color bg-primary-brand-color p-4 font-titles text-white hover:bg-transparent hover:text-primary-brand-color"
        >
          {loading ? (
            <ClipLoader
              color="white"
              size={20}
              aria-label="Auth Form Loading Spinner"
              data-testid="loader"
            />
          ) : (
            submitBtnText
          )}
        </button>
        {isSignIn && <p className="text-center">Don't have an account? <Link className="font-titles font-bold hover:underline" to={`/${UI_PATHS.SIGN_UP}`}>Sign up for {APP_NAME}</Link></p>}
      </form>
    </div>
  );
};

export default AuthFormLayout;
