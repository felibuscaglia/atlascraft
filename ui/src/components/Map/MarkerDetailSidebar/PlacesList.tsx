import Disclosure from "./Disclosure";

const MarkerDetailsSidebarPlacesList = () => {
  return (
    <Disclosure>
      <textarea
        placeholder="Drop in whatever you feel like about getting around – hacks, tips, and cool tricks!"
        className="h-40 w-11/12 resize-none rounded-sm bg-neutral-200 p-2 text-base"
      />
    </Disclosure>
  );
};

export default MarkerDetailsSidebarPlacesList;
