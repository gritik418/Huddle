"use client";
import { JSX } from "react";
import { useGetFollowingQuery } from "@/features/api/userApi";
import Spinner from "../Spinner/Spinner";
import SelectMemberTile from "../SelectMemberTile/SelectMemberTile";

type PropsType = {
  setAdminsToBe: React.Dispatch<React.SetStateAction<Follower[]>>;
  adminsToBe: Follower[];
};

const SelectGroupMembers = ({
  setAdminsToBe,
  adminsToBe,
}: PropsType): JSX.Element => {
  const { isLoading, data, isError } = useGetFollowingQuery();

  function renderContent() {
    if (isLoading)
      return (
        <div className="flex items-center justify-center my-4 w-full">
          <Spinner variant={"xs"} />
        </div>
      );

    if (!data?.following || data.following.length === 0 || isError) {
      return (
        <div className="flex items-center justify-center my-4 w-full">
          <p className="p-3 text-center">
            You have no followings yet. Follow someone to add them to a group.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 py-3 gap-3">
        {data.following.map((user) => {
          return (
            <SelectMemberTile
              key={user._id}
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
