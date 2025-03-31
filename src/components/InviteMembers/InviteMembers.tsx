import { JSX } from "react";
import InviteMemberItem from "../InviteMemberItem/InviteMemberItem";

const members: Follower[] = [
  {
    _id: "67d82efd5acd2adc74a7e3f1",
    firstName: "Devansh ",
    lastName: "Davash",
    username: "Devansh",
  },
  {
    _id: "67d86eafb31852b954870581",
    firstName: "Ritik",
    lastName: "Gupta",
    username: "ritik_dev",
  },
];

const InviteMembers = (): JSX.Element => {
  function renderContent(): JSX.Element {
    return (
      <div className="flex flex-col gap-3">
        {members.map((member: Follower) => (
          <InviteMemberItem key={member._id} member={member} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-3 flex flex-col rounded-lg">
      <p className="mb-4 text-xl">Invite Members</p>

      <div className="flex border mb-6 bg-white rounded-md">
        <input
          type="text"
          className="w-full p-4 outline-[var(--secondary)] rounded-md"
          placeholder="Search users..."
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default InviteMembers;
