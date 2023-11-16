import { Disclosure } from "@headlessui/react";
import { ChevronDown, ChevronRight, IconProps } from "react-feather";

const iconProps: IconProps = {
  strokeWidth: 1,
};

interface IMarkerDetailsSidebarDisclosureProps {
  children: React.ReactNode;
  buttonText: string;
}

const MarkerDetailsSidebarDisclosure: React.FC<
  IMarkerDetailsSidebarDisclosureProps
> = ({ children, buttonText }) => {
  return (
    <Disclosure>
      <Disclosure.Button className="w-full">
        {({ open }) => (
          <div className="flex items-center gap-1">
            {open ? (
              <ChevronDown {...iconProps} className="w-1/12" />
            ) : (
              <ChevronRight {...iconProps} className="w-1/12" />
            )}
            <h3 className="text-2xl font-bold">{buttonText}</h3>
          </div>
        )}
      </Disclosure.Button>
      <Disclosure.Panel className="flex w-full justify-end">
        {children}
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default MarkerDetailsSidebarDisclosure;
