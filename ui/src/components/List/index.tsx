import { IListElement } from "lib/interfaces";
import { Plus } from "react-feather";

interface IListProps {
  title: string;
  actionBtnProps: {
    text: string;
  }
  elements: IListElement[];
}

const List: React.FC<IListProps> = ({ title, actionBtnProps, elements = [] }) => {
  return (
    <div>
      <section className="flex items-center justify-between">
        <h4 className="text-2xl">{title}</h4>
        <button className="text-secondary-brand-color bg-primary-brand-color px-4 py-2 border border-primary-brand-color hover:bg-transparent hover:text-primary-brand-color flex items-center gap-1">
          <Plus size={12} />
          <span>{actionBtnProps.text}</span>
        </button>
      </section>
      <div></div>
    </div>
  )
};

export default List;
