"use client";
import { AppDispatch } from "../../app/store";
import { searchUsersForChatRequestAsync } from "../../features/chatRequest/chatRequestSlice";
import { ChangeEvent, JSX, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SearchBarForChatRequest = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchQuery.length > 0) {
        dispatch(searchUsersForChatRequestAsync(searchQuery));
      }
    }, 1500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  return (
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
  );
};

export default SearchBarForChatRequest;
