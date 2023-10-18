import { APP_NAME } from "lib/constants/app-data";
import UserActions from "./UserActions";

const PageHead = () => {
  return (
    <nav className="flex w-full items-center justify-between bg-primary-brand-color px-4 py-2 text-secondary-brand-color">
      <h1 className="text-3xl">{APP_NAME}</h1>
      <UserActions />
    </nav>
  );
};

export default PageHead;
