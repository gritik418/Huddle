import React, { JSX } from "react";
import MessageItem from "../MessageItem/MessageItem";

const MessagePlayground = (): JSX.Element => {
  return (
    <div className="p-4 h-[calc(100%-64px-80px)] bg-[#f2f2f2] flex-1 flex-col">
      <MessageItem isSent={false} />
      <MessageItem isSent={true} />
      <MessageItem isSent={false} />
      <MessageItem isSent={false} />
      <MessageItem isSent={false} />
      <MessageItem isSent={true} />
      <MessageItem isSent={false} />
      <MessageItem isSent={true} />
      <MessageItem isSent={false} />
      <MessageItem isSent={true} />
      <MessageItem isSent={false} />
      <MessageItem isSent={true} />
    </div>
  );
};

export default MessagePlayground;
