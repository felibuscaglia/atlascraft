import { useState } from "react";
import Disclosure from "./Disclosure";

const MarkerDetailSidebarNotepad = () => {
  const [notes, setNotes] = useState("");

  return (
    <Disclosure buttonText="Notes">
      <textarea
        value={notes}
        onChange={({ target }) => setNotes(target.value)}
        placeholder="Drop in whatever you feel like about getting around – hacks, tips, and cool tricks!"
        className="h-40 w-11/12 resize-none rounded-sm bg-neutral-200 p-2 text-base"
      />
    </Disclosure>
  );
};

export default MarkerDetailSidebarNotepad;
