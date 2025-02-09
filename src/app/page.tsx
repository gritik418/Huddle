"use client";
import AddPost from "@/components/AddPost/AddPost";
import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import Navbar from "@/components/Navbar/Navbar";
import StoriesContainer from "@/components/StoriesContainer/StoriesContainer";
import { JSX } from "react";

const Home = (): JSX.Element => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-[calc(100%-56px)]">
        <HomeSidebar />

        <div className="flex w-[calc(100%-300px)] flex-col gap-3 flex-1 bg-gray-100 p-3">
          <StoriesContainer />

          <AddPost />
        </div>
      </div>
    </div>
  );
};

export default Home;
