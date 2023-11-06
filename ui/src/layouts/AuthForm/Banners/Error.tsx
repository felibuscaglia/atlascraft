interface IAuthFormErrorBannerProps {
  error: string;
}

const AuthFormErrorBanner: React.FC<IAuthFormErrorBannerProps> = ({
  error,
}) => {
  return (
    <div className="font-text capitalize-first border-error w-1/3 text-center rounded border-2 bg-red-300 p-1 text-base font-semibold">
      {error}
    </div>
  );
};

export default AuthFormErrorBanner;
