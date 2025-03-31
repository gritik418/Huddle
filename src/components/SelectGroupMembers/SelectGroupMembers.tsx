"use client";
import { selectFollowings } from "../../features/user/userSlice";
import { Dispatch, JSX, SetStateAction } from "react";
import { useSelector } from "react-redux";
import SelectMemberTile from "../SelectMemberTile/SelectMemberTile";

type PropsType = {
  setAdminsToBe: React.Dispatch<React.SetStateAction<Follower[]>>;
  adminsToBe: Follower[];
  selectedMembers: string[];
  setSelectedMembers: Dispatch<SetStateAction<string[]>>;
};

const SelectGroupMembers = ({
  setAdminsToBe,
  adminsToBe,
  selectedMembers,
  setSelectedMembers,
}: PropsType): JSX.Element => {
  const following: Follower[] = useSelector(selectFollowings);

  function renderContent() {
    if (!following || following.length === 0) {
      return (
        <div className="flex items-center justify-center my-4 w-full">
          <p className="p-3 text-center">
            You have no followings yet. Follow someone to add them to a group.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 py-3 gap-3">
        {following.map((user: Follower) => {
          return (
            <SelectMemberTile
              key={user._id}
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
              member={user}
              adminsToBe={adminsToBe}
              setAdminsToBe={setAdminsToBe}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col container m-auto mt-12">
      <p className="text-2xl">Select Group Members</p>

      {renderContent()}
    </div>
  );
};

export default SelectGroupMembers;
