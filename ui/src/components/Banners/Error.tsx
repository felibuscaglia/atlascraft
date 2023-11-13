interface IAuthFormErrorBannerProps {
  error: string | string[];
  fullWidth?: boolean;
}

const ErrorBanner: React.FC<IAuthFormErrorBannerProps> = ({
  error,
  fullWidth = false,
}) => {
  return (
    <div
      className={`border-error font-text ${
        fullWidth ? "w-full" : "w-1/3"
      } rounded border-2 bg-red-300 p-1 text-center text-base font-semibold`}
    >
      {typeof error === "string" ? (
        <span className="capitalize-first">{error}</span>
      ) : (
        <ul>
          {error.map((err, index) => (
            <li className="capitalize-first" key={`error-${index}`}>
              • {err}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ErrorBanner;
