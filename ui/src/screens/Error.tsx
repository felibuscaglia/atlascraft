import { UI_PATHS } from "lib/constants/paths";
import { Link } from "react-router-dom";

interface IErrorScreenProps {
  msg: string;
}

const ErrorScreen: React.FC<IErrorScreenProps> = ({ msg }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">{msg}</h1>
      <Link className="font-text text-lg underline" to={UI_PATHS.HOME}>
        Take me back.
      </Link>
    </div>
  );
};

export default ErrorScreen;
