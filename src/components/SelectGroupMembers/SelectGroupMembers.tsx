import React, { JSX } from "react";
import SelectMemberTile from "../SelectMemberTile/SelectMemberTile";

const SelectGroupMembers = (): JSX.Element => {
  return (
    <div className="flex flex-col container m-auto mt-12">
      <p className="text-2xl">Select Group Members</p>

      <div className="grid grid-cols-1 md:grid-cols-2 py-3 gap-3">
        <SelectMemberTile />
        <SelectMemberTile />
        <SelectMemberTile />
        <SelectMemberTile />
      </div>
    </div>
  );
};

export default SelectGroupMembers;
