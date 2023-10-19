import { SECONDARY_BRAND_COLOR } from "lib/constants/styles";
import { IListElement } from "lib/interfaces";
import { Plus } from "react-feather";
import { ClipLoader } from "react-spinners";

interface IListProps {
  title: string;
  actionBtnProps: {
    text: string;
    onClick: () => void;
    loading: boolean;
  };
  elements: IListElement[];
  emptyPlaceholderText: string;
}

const List: React.FC<IListProps> = ({
  title,
  actionBtnProps,
  elements = [],
  emptyPlaceholderText,
}) => {
  return (
    <div className="flex h-full flex-col gap-4">
      <section className="flex items-center justify-between">
        <h4 className="text-2xl font-bold">{title}</h4>
        <button
          disabled={actionBtnProps.loading}
          onClick={actionBtnProps.onClick}
          className="border border-primary-brand-color bg-primary-brand-color px-4 py-2 text-secondary-brand-color hover:bg-transparent hover:text-primary-brand-color disabled:cursor-not-allowed disabled:hover:bg-primary-brand-color"
        >
          {actionBtnProps.loading ? (
            <div className="w-[150px] h-5 flex items-center justify-center">
              <ClipLoader color={SECONDARY_BRAND_COLOR} size={16} />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Plus size={12} />
              <span>{actionBtnProps.text}</span>
            </div>
          )}
        </button>
      </section>
      <div className="flex grow items-center justify-center">
        {elements.length ? (
          <div></div>
        ) : (
          <span className="font-titles text-3xl opacity-50">
            {emptyPlaceholderText}
          </span>
        )}
      </div>
    </div>
  );
};

export default List;
