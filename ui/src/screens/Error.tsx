import { UI_PATHS } from "lib/constants/paths";
import { Link } from "react-router-dom";

interface IErrorScreenProps {
  msg: string;
}

const anchor = {
  classNames: "font-text text-lg underline",
  text: "Take me back.",
};

const ErrorScreen: React.FC<IErrorScreenProps> = ({ msg }) => {
  const isOnHomePage = window.location.pathname === UI_PATHS.HOME;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">{msg}</h1>
      {isOnHomePage ? (
        <a
          className={anchor.classNames}
          onClick={() => window.location.reload()}
        >
          {anchor.text}
        </a>
      ) : (
        <Link className={anchor.classNames} to={UI_PATHS.HOME}>
          {anchor.text}
        </Link>
      )}
    </div>
  );
};

export default ErrorScreen;
