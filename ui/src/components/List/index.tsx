interface IListProps {
  title: string;
}

const List: React.FC<IListProps> = ({ title }) => {
  return <h4 className="text-2xl">{title}</h4>;
};

export default List;
