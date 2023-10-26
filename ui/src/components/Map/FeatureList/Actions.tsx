import { Eye, Layers, UserPlus } from "react-feather";

const actions = [
  { text: "Add layer", icon: Layers },
  { text: "Share", icon: UserPlus },
  { text: "Preview", icon: Eye },
];

const FeatureListActions = () => {
  return (
    <div className="bg-primary-brand-color flex items-center justify-between px-4 py-2 text-white rounded-b-sm">
      {actions.map(({ text, icon: Icon }) => (
        <button
          className="flex items-center gap-1 hover:underline"
          key={`feature-list-icon-${text}`}
        >
          <Icon size={14} />
          <span>{text}</span>
        </button>
      ))}
    </div>
  );
};

export default FeatureListActions;
