import { Copy } from "react-feather";

interface IProps {
  url: string;
  withOriginPrefix?: boolean;
}

const MAX_URL_LENGTH = 53;

const LinkCopier: React.FC<IProps> = ({ url, withOriginPrefix = true }) => {
  let displayUrl: string | undefined = undefined;

  if (withOriginPrefix) {
    url = window.location.origin + url;
  }

  if (url.length >= MAX_URL_LENGTH) {
    displayUrl = url.slice(0, MAX_URL_LENGTH - 3) + "...";
  }

  return (
    <div className="rounded border border-primary-brand-color flex items-center justify-between">
      <span className="text-sm p-2">{displayUrl ?? url}</span>
      <button className="bg-primary-brand-color p-2">
        <Copy color='white' />
      </button>
    </div>
  );
};

export default LinkCopier;
