import React, { JSX } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = (): JSX.Element => {
  return (
    <div className="flex flex-1 w-full bg-white p-3  gap-2 rounded-lg">
      <input
        className="flex w-full p-2 bg-gray-100 outline-none rounded-lg"
        type="text"
        placeholder="Explore people, channels, communities, and more."
      />
      <button className="bg-[var(--secondary)] px-3 text-white rounded-lg font-semibold">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
