"use client";
import { useSelector } from "react-redux";
import ChannelChatInfo from "../../../../../components/ChannelChatInfo/ChannelChatInfo";
import ChannelChatInput from "../../../../../components/ChannelChatInput/ChannelChatInput";
import ChannelMessagePlayground from "../../../../../components/ChannelMessagePlayground/ChannelMessagePlayground";
import { selectUser } from "../../../../../features/user/userSlice";
import NotLoggedIn from "../../../../../components/NotLoggedIn/NotLoggedIn";
import { JSX } from "react";

const ChannelChat = () => {
  const channel: Channel = {
    _id: "67e6f3d4fcc6985b0227a62f",
    creatorId: {
      _id: "67d70298559797abea6b5068",
      firstName: "Ritik",
      lastName: "",
      username: "ritik123",
      profilePicture:
        "https://huddle-server.onrender.com/uploads/67d70298559797abea6b5068/profilePicture/download.jpeg",
    },
    name: "Hello Channel 10",
    description: "Hello Channel",
    members: [
      {
        _id: "67d70298559797abea6b5068",
        firstName: "Ritik",
        lastName: "",
        username: "ritik123",
        profilePicture:
          "https://huddle-server.onrender.com/uploads/67d70298559797abea6b5068/profilePicture/download.jpeg",
      },
    ],
    isActive: true,
    type: "public",
    sendMessagePermission: "creator",
  };

  const user: User | null = useSelector(selectUser);

  if (!user || !user._id) return <NotLoggedIn />;

  const memberIds = channel.members.map((member: Follower) => member._id);

  function renderInputComponent(): JSX.Element {
    if (channel.sendMessagePermission === "creator") {
      if (channel.creatorId._id === user?._id) return <ChannelChatInput />;
      return (
        <div className="flex rounded-lg p-6 bg-gray-200">
          <p>
            Only <span className="text-green-600">creator</span> can send
            messages.
          </p>
        </div>
      );
    }

    if (channel.sendMessagePermission === "members") {
      if (memberIds.includes(user?._id.toString()!))
        return <ChannelChatInput />;

      return (
        <div className="flex rounded-lg p-6 bg-gray-200">
          <p>
            Only <span className="text-green-600">members</span> can send
            messages.
          </p>
        </div>
      );
    }

    if (channel.sendMessagePermission === "everyone") {
      if (channel.creatorId._id === user?._id) return <ChannelChatInput />;

      if (memberIds.includes(user?._id.toString()!))
        return <ChannelChatInput />;

      return (
        <div className="flex rounded-lg p-6 bg-gray-200">
          <p>
            Only <span className="text-green-600">members or creator</span> can
            send messages.
          </p>
        </div>
      );
    }

    return (
      <div className="flex rounded-lg p-6 bg-gray-200">
        <p>
          Only <span className="text-green-600">members</span> can send
          messages.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <ChannelChatInfo channel={channel} />

      <ChannelMessagePlayground />

      {renderInputComponent()}
    </div>
  );
};

export default ChannelChat;
