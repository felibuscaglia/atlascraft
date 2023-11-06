import { APP_NAME } from "lib/constants/app-data";
import { UI_PATHS } from "lib/constants/paths";
import { Link } from "react-router-dom";
import UserActions from "./UserActions";

const PageHead = () => {
  return (
    <nav className="flex items-center justify-between bg-primary-brand-color px-4 py-2 text-secondary-brand-color">
      <Link to={UI_PATHS.HOME} className="font-titles text-3xl">{APP_NAME}</Link>
      <UserActions />
    </nav>
  );
};

export default PageHead;
