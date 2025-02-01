import React, { JSX } from "react";

const ChatSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="w-1/3 border-2 h-[calc(100%-56px)]">{children}</div>;
};

export default ChatSection;
