"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, { useState } from "react";

const ExploreChannels = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div>
      <SearchBar
        placeholder="Explore your favorite channels."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex p-3 flex-col"></div>
    </div>
  );
};

export default ExploreChannels;
