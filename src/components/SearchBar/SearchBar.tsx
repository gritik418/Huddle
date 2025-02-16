import React, { ChangeEvent, JSX } from "react";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ setSearchQuery, searchQuery }: PropsType): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex w-full bg-white p-3  gap-2 rounded-lg">
      <div className="flex w-full bg-gray-100 rounded-lg items-center p-1 px-4 gap-2">
        <FaSearch className="text-gray-400" />
        <input
          onChange={handleChange}
          value={searchQuery}
          className="p-2 bg-transparent outline-none text-lg flex-1 text-gray-500"
          type="text"
          placeholder="Explore people, channels, communities, and more."
        />
      </div>
    </div>
  );
};

export default SearchBar;
