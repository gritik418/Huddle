import React, { JSX } from "react";

const MessageSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="flex flex-1 flex-col">{children}</div>;
};

export default MessageSection;
