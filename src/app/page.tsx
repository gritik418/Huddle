"use client";
import AddPost from "@/components/AddPost/AddPost";
import Feed from "@/components/Feed/Feed";
import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import Navbar from "@/components/Navbar/Navbar";
import StoriesContainer from "@/components/StoriesContainer/StoriesContainer";
import { JSX } from "react";

const App = (): JSX.Element => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex bg-gray-100 pt-4 h-[calc(100%-56px)]">
        <HomeSidebar />

        <div className="flex w-[calc(100%-300px)] overflow-y-scroll flex-col gap-3 flex-1 bg-gray-100 p-3">
          <StoriesContainer />

          <AddPost />

          <Feed />
        </div>
      </div>
    </div>
  );
};

export default App;
