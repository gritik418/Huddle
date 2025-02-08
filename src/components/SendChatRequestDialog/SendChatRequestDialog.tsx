"use client";
import { AppDispatch } from "@/app/store";
import {
  searchUsersForChatRequestAsync,
  selectSearchedUsersForChatRequest,
  selectSearchUserForChatRequestMessage,
} from "@/features/chatRequest/chatRequestSlice";
import { ChangeEvent, JSX, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SearchedUserForChatItem from "../SearchedUserForChatItem/SearchedUserForChatItem";

const SendChatRequestDialog = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const searchedUsers = useSelector(selectSearchedUsersForChatRequest);
  const message: string = useSelector(selectSearchUserForChatRequestMessage);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      dispatch(searchUsersForChatRequestAsync(searchQuery));
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div className="flex min-h-10 h-10 w-10 min-w-10 rounded-full items-center justify-center bg-gray-100">
          <FiPlus />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="mt-4 w-full flex flex-col items-center">
            <button className="flex p-2 gap-3 rounded-lg w-full bg-[var(--secondary)] outline-none text-white">
              <MdGroups2 />
              Create group chat
            </button>
            <div className="h-1 border-b-2 mt-4 w-2/3"></div>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-1">
          <p className="text-xs text-gray-500">
            Search for users to send a chat request.
          </p>
          <input
            type="text"
            onChange={handleChange}
            value={searchQuery}
            placeholder="Search users..."
            className="bg-gray-100 p-2 rounded-lg outline-[var(--secondary)]"
          />
        </div>

        <div className="mt-2 max-h-[400px]">
          {searchedUsers?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {searchedUsers.map((user: SearchedUserForChat) => {
                return <SearchedUserForChatItem key={user._id} {...user} />;
              })}
            </div>
          ) : (
            <>{message ? <p className="text-sm">{message}</p> : null}</>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendChatRequestDialog;
