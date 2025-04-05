import { selectChannelMessages } from "../../features/channel/channelSlice";
import { JSX, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ChannelMessageItem from "../ChannelMessageItem/ChannelMessageItem";

const ChannelMessagePlayground = (): JSX.Element => {
  const messages = useSelector(selectChannelMessages);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex w-full overflow-y-scroll hode-scrollbar flex-col p-3 gap-3">
      {messages.map((message: ChannelMessage) => (
        <ChannelMessageItem key={message._id} message={message} />
      ))}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChannelMessagePlayground;
