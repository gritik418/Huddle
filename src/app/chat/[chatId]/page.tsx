"use client";
import ChatSection from "../../../components/ChatSection/ChatSection";
import MessageInput from "../../../components/MessageInput/MessageInput";
import MessagePlayground from "../../../components/MessagePlayground/MessagePlayground";
import MessageSection from "../../../components/MessageSection/MessageSection";
import MessageSectionHeader from "../../../components/MessageSectionHeader/MessageSectionHeader";
import Spinner from "../../../components/Spinner/Spinner";
import {
  useGetChatByIdQuery,
  useGetChatsQuery,
} from "../../../features/api/chatApi";
import { useGetMessagesQuery } from "../../../features/api/messageApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import { JSX } from "react";

const SelectedChat = (): JSX.Element => {
  const params: { chatId: string } = useParams();

  const { chatId } = params;
  const { isLoading, data, error } = useGetChatByIdQuery(chatId);
  useGetChatsQuery();
  useGetMessagesQuery(chatId, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen flex-1 items-center justify-center">
        <Spinner variant="medium" />
      </div>
    );
  }

  if (error || !data?.chat) {
    return (
      <div className="flex p-2 flex-col h-[calc(100%-56px)] flex-1 items-center justify-center">
        <Image
          src={"/images/no-chat.jpg"}
          alt="no-chat"
          height={300}
          width={300}
        />
        <p className="text-xl text-center">
          Oops! This chat doesn&apos;t exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:flex">
        <ChatSection chatId={chatId} />
      </div>

      <MessageSection>
        <MessageSectionHeader chat={data?.chat} />
        <MessagePlayground />
        <MessageInput chatId={chatId} chat={data.chat} />
      </MessageSection>
    </>
  );
};

export default SelectedChat;
