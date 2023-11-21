import { Icon } from "react-feather";

interface IAction {
  text: string;
  icon: Icon;
  onClick: () => void;
}

interface IProps {
  actions: IAction[];
}

const FeatureListActions: React.FC<IProps> = ({ actions }) => {
  return (
    <div className="flex items-center justify-between bg-primary-brand-color px-4 py-2 text-white">
      {actions.map(({ text, icon: Icon, onClick }) => (
        <button
          className="flex items-center gap-1 hover:underline"
          key={`feature-list-icon-${text}`}
          onClick={onClick}
        >
          <Icon size={14} />
          <span>{text}</span>
        </button>
      ))}
    </div>
  );
};

export default FeatureListActions;
