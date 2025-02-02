import React, { JSX } from "react";

const MessageSection = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="w-2/3">{children}</div>;
};

export default MessageSection;
