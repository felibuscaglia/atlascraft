import { User } from "react-feather";

const UserActions = () => {
  return (
    <button className="rounded-full border-2 border-secondary-brand-color p-2 text-secondary-brand-color hover:bg-secondary-brand-color hover:text-primary-brand-color">
      <User />
    </button>
  );
};

export default UserActions;
