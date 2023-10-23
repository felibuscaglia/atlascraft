import { UI_PATHS } from "lib/constants/paths";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl">Uh-oh. We couldn't find what you're looking for.</h1>
      <Link className="font-text underline text-lg" to={UI_PATHS.HOME}>Take me back.</Link>
    </div>
  );
};

export default NotFoundScreen;
