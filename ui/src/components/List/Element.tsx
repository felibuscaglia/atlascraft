import { IListElement } from "lib/interfaces";

const ListElement: React.FC<IListElement> = ({ title }) => {
    return (
        <li>
            <span>{title}</span>
        </li>
    )
}

export default ListElement;