"use client";
import Image from "next/image";
import { JSX } from "react";

const Notification = ({
  type,
  chatRequest,
  message,
  followRequest,
  followRequestReceiver,
  creator,
  chat,
  channel,
  channelMessage,
}: NotificationData): JSX.Element => {
  if (type === "CHAT_REQUEST")
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Image
            src={
              chatRequest?.sender.profilePicture ||
              "/images/default-profile.jpg"
            }
            className="rounded-full h-12 w-12"
            alt="img"
            height={50}
            width={50}
          />

          <div className="flex flex-col">
            <p className="text-sm font-bold">
              {chatRequest?.sender.firstName} {chatRequest?.sender.lastName}
            </p>
            <p className="text-sm font-medium">
              {chatRequest?.sender.username}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold">Sent you a chat request.</p>
        </div>
      </div>
    );

  if (type === "NEW_MENTION")
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Image
            src={creator?.profilePicture || "/images/default-profile.jpg"}
            alt="img"
            className="rounded-full h-12 w-12"
            height={50}
            width={50}
          />

          <div className="flex flex-col">
            <p className="text-sm font-bold">
              {creator?.firstName} {creator?.lastName}
            </p>
            <p className="text-sm font-medium">{creator?.username}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold">Mentioned you in a post.</p>
        </div>
      </div>
    );

  if (type === "FOLLOW_REQUEST")
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Image
            src={
              followRequest?.sender.profilePicture ||
              "/images/default-profile.jpg"
            }
            className="rounded-full h-12 w-12"
            alt="img"
            height={50}
            width={50}
          />

          <div className="flex flex-col">
            <p className="text-sm font-bold">
              {followRequest?.sender.firstName} {followRequest?.sender.lastName}
            </p>
            <p className="text-sm font-medium">
              {followRequest?.sender.username}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold">Sent you a follow request.</p>
        </div>
      </div>
    );

  if (type === "ACCEPTED_FOLLOW_REQUEST")
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Image
            src={
              followRequestReceiver?.profilePicture ||
              "/images/default-profile.jpg"
            }
            alt="img"
            className="rounded-full h-12 w-12"
            height={50}
            width={50}
          />

          <div className="flex flex-col">
            <p className="text-sm font-bold">
              {followRequestReceiver?.firstName}{" "}
              {followRequestReceiver?.lastName}
            </p>
            <p className="text-sm font-medium">
              {followRequestReceiver?.username}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold">Accepted your follow request.</p>
        </div>
      </div>
    );

  if (type === "NEW_MESSAGE") {
    if (chat?.isGroupChat) {
      return (
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <Image
              src={chat.groupIcon || "/images/default-group-icon.png"}
              alt="img"
              className="rounded-full h-12 w-12"
              height={50}
              width={50}
            />

            <div className="flex flex-col">
              <p className="text-sm font-bold">{chat.groupName}</p>
            </div>
          </div>

          {message?.content && (
            <div className="flex items-center mt-2 justify-between p-1">
              <p className="text-sm font-normal">
                <span className="font-semibold">
                  {message?.sender.firstName}:
                </span>{" "}
                {message?.content?.slice(0, 20)}
                {message?.content?.length > 20 ? "..." : ""}
              </p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <Image
              src={
                message?.sender.profilePicture || "/images/default-profile.jpg"
              }
              alt="img"
              className="rounded-full h-12 w-12"
              height={50}
              width={50}
            />

            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {message?.sender.firstName} {message?.sender.lastName}
              </p>
              <p className="text-sm font-medium">{message?.sender.username}</p>
            </div>
          </div>

          {message?.content && (
            <div className="flex items-center mt-2 justify-between p-1">
              <p className="text-sm font-bold">
                {message?.content?.slice(0, 20)}
                {message?.content?.length > 20 ? "..." : ""}
              </p>
            </div>
          )}
        </div>
      );
    }
  }

  if (type === "NEW_CHANNEL_MESSAGE") {
    return (
      <div className="flex flex-col w-full">
        <div className="flex font-semibold flex-col">
          <p className="text-xs font-bold">New Channel Message</p>
          <p>{channel?.name}</p>
        </div>

        {channelMessage?.content && (
          <div className="flex items-center mt-2 justify-between p-1">
            <p className="text-sm font-normal">
              <span className="font-semibold">
                {channelMessage?.sender.firstName}:
              </span>{" "}
              {channelMessage?.content?.slice(0, 20)}
              {channelMessage?.content?.length > 20 ? "..." : ""}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (type === "ADDED_TO_GROUP") {
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Image
            src={creator?.profilePicture || "/images/default-profile.jpg"}
            alt="img"
            className="rounded-full h-12 w-12"
            height={50}
            width={50}
          />

          <div className="flex flex-col">
            <p className="text-sm font-bold">
              {creator?.firstName} {creator?.lastName}
            </p>
            <p className="text-sm font-medium">{creator?.username}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-normal">
            {creator?.firstName} added you to the group{" "}
            <span className="font-bold">{chat?.groupName}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Image
        src={"/images/default-profile.jpg"}
        alt="img"
        className="rounded-full h-12 w-12"
        height={50}
        width={50}
      />
      <p></p>
    </div>
  );
};

export default Notification;
