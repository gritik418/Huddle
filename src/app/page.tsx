"use client";
import AddPost from "@/components/AddPost/AddPost";
import Feed from "@/components/Feed/Feed";
import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import Navbar from "@/components/Navbar/Navbar";
import StoriesContainer from "@/components/StoriesContainer/StoriesContainer";
import { JSX } from "react";

const App = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <div className="flex bg-gray-100 pt-4 pb-7">
        <div className="sticky h-max top-[70px]">
          <HomeSidebar />
        </div>

        <div className="flex bg-gray-100 w-[calc(100%-300px)] flex-col gap-3 flex-1 p-3">
          <StoriesContainer />

          <AddPost />
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default App;
