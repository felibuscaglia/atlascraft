import React, { useState } from "react";
import { Copy } from "react-feather";
import { Tooltip } from "react-tooltip";

interface IProps {
  url: string;
  withOriginPrefix?: boolean;
}

const MAX_URL_LENGTH = 53;

const LinkCopier: React.FC<IProps> = ({ url, withOriginPrefix = true }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  let displayUrl: string | undefined = undefined;

  if (withOriginPrefix) {
    url = window.location.origin + url;
  }

  if (url.length >= MAX_URL_LENGTH) {
    displayUrl = url.slice(0, MAX_URL_LENGTH - 3) + "...";
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);

    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 2000);
  };

  return (
    <div className="flex items-center justify-between rounded border border-primary-brand-color">
      <span className="p-2 text-sm" data-tip={tooltipVisible ? "Copied!" : ""}>
        {displayUrl ?? url}
      </span>
      <a
        data-tooltip-id="link-copier-tooltip"
        className="bg-primary-brand-color p-2"
        onClick={handleCopyClick}
      >
        <Copy color="white" />
      </a>
      <Tooltip
        id="link-copier-tooltip"
        content="Copied!"
        openOnClick
        isOpen={tooltipVisible}
      />
    </div>
  );
};

export default LinkCopier;
