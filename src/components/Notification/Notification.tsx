"use client";
import Image from "next/image";
import { JSX } from "react";

const Notification = ({
  type,
  chatRequest,
  message,
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

  if (type === "NEW_MESSAGE")
    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-2">
          <Image
            src={
              message?.sender.profilePicture || "/images/default-profile.jpg"
            }
            alt="img"
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

        <div className="flex items-center justify-between p-2">
          <p className="text-sm font-bold">{message?.content}</p>
        </div>
      </div>
    );

  return (
    <div>
      <Image
        src={"/images/default-profile.jpg"}
        alt="img"
        height={50}
        width={50}
      />
      <p></p>
    </div>
  );
};

export default Notification;
