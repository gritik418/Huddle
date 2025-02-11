"use client";
import { selectMessages } from "@/features/message/messageSlice";
import { selectUser } from "@/features/user/userSlice";
import { JSX, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "../MessageItem/MessageItem";

const MessagePlayground = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const messages: Message[] = useSelector(selectMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-4 h-[calc(100%-64px-80px)] overflow-y-scroll pb-4 bg-[#f2f2f2] flex-col">
      {messages?.map((message: Message) => (
        <MessageItem
          key={message._id}
          message={message}
          isSent={user?._id === message.sender._id}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessagePlayground;
