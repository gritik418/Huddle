"use client";
import { useGetChatRequestsQuery } from "@/features/api/chatRequestApi";
import { IoIosNotifications } from "react-icons/io";
import Spinner from "../Spinner/Spinner";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import ChatRequestItem from "../ChatRequestItem/ChatRequestItem";

const ChatNotificationMenu = () => {
  const { isLoading, data, error } = useGetChatRequestsQuery();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center my-3 justify-center">
          <Spinner variant="small" />
        </div>
      );
    }

    if (error || !data?.requests?.length) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">No requests found.</p>
        </div>
      );
    }

    if (data.message) {
      return (
        <div className="flex items-center my-3 justify-center">
          <p className="text-xs">{data.message}</p>
        </div>
      );
    }

    return data?.requests.map((request: ChatRequest) => (
      <ChatRequestItem key={request._id} {...request.sender} />
    ));
  };

  return (
    <Menubar className="p-0 border-none">
      <MenubarMenu>
        <MenubarTrigger
          asChild
          className="cursor-pointer border-none outline-none bg-none rounded-full"
        >
          <div className="relative flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
            <IoIosNotifications />
            <span className="absolute h-2 w-2 bg-red-400 rounded-full top-1 right-1"></span>
          </div>
        </MenubarTrigger>
        <MenubarContent className="max-w-[500px] min-w-[300px]">
          <p className="p-1 text-sm font-medium text-gray-500">Chat Requests</p>
          <div className="flex flex-col max-h-[430px] overflow-y-scroll hide-scrollbar">
            {renderContent()}
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ChatNotificationMenu;
