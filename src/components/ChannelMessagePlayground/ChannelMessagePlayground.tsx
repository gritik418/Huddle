import { selectChannelMessages } from "../../features/channel/channelSlice";
import { JSX } from "react";
import { useSelector } from "react-redux";
import ChannelMessageItem from "../ChannelMessageItem/ChannelMessageItem";

const ChannelMessagePlayground = ({
  channelId,
}: {
  channelId: string;
}): JSX.Element => {
  const messages = useSelector(selectChannelMessages);

  console.log(messages);

  return (
    <div className="h-full flex w-full flex-col p-3 gap-2">
      {messages.map((message: ChannelMessage) => (
        <ChannelMessageItem key={message._id} message={message} />
      ))}
    </div>
  );
};

export default ChannelMessagePlayground;
