import Image from "next/image";
import { Dispatch, JSX, SetStateAction } from "react";
import { GrRadial, GrRadialSelected } from "react-icons/gr";

type PropsType = {
  user: Follower;
  selectedMentions: string[];
  setSelectedMentions: Dispatch<SetStateAction<string[]>>;
};

const MentionItem = ({
  user,
  selectedMentions,
  setSelectedMentions,
}: PropsType): JSX.Element => {
  const handleSelect = () => {
    if (selectedMentions.includes(user._id)) {
      const mentions: string[] = selectedMentions.filter(
        (id: string) => id !== user._id
      );

      setSelectedMentions(mentions);
    } else {
      setSelectedMentions([...selectedMentions, user._id]);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className="flex p-2 hover:bg-gray-200 duration-300 transition-colors ease-in-out cursor-pointer gap-6 justify-between items-center bg-gray-50"
    >
      <div className="flex gap-2">
        <div className="flex h-10 w-10 rounded-full">
          <Image
            src={user.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={40}
            width={40}
            className="rounded-full h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-xs font-semibold text-gray-500">
            @{user.username}
          </p>
        </div>
      </div>

      <div className="flex p-1 text-lg text-[var(--secondary)]">
        {selectedMentions.includes(user._id) ? (
          <GrRadialSelected />
        ) : (
          <GrRadial />
        )}
      </div>
    </div>
  );
};

export default MentionItem;
