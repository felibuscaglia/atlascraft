import { IListElement } from "lib/interfaces";
import { Map } from "react-feather";
import Actions from "./Actions";
import { Link } from "react-router-dom";

interface IListElementProps extends IListElement {
  redirectUrlPrefix: string;
}

const ListElement: React.FC<IListElementProps> = ({ title, id, redirectUrlPrefix }) => {
  return (
    <li className="flex cursor-pointer items-center justify-between border-b border-b-primary-brand-color hover:bg-[#2a2a2a]/10">
      <Link to={`/${redirectUrlPrefix}/${id}`} className="flex w-full items-center gap-2 px-2 py-3">
        <Map size={14} />
        <span className="font-titles">{title}</span>
      </Link>
      <Actions />
    </li>
  );
};

export default ListElement;
