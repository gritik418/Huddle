import React, { JSX } from "react";

const ChatSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="w-1/3 border-r-2 border-gray-100 h-full">{children}</div>
  );
};

export default ChatSection;
