"use client";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import SearchedAccounts from "../../../../components/SearchedAccounts/SearchedAccounts";
import React, { useState } from "react";

const ExploreAccounts = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div>
      <SearchBar
        placeholder="Explore accounts, type a name or username."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex p-3 flex-col">
        <SearchedAccounts searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ExploreAccounts;
