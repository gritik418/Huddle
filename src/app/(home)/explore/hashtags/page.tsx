"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchedHashtags from "@/components/SearchedHashtags/SearchedHashtags";
import { useState } from "react";

const ExploreHashtags = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div>
      <SearchBar
        placeholder="Explore posts by hashtag, e.g., #travel"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex p-3 flex-col">
        <SearchedHashtags searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default ExploreHashtags;
