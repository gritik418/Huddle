"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Tabs } from "@chakra-ui/react";
import React, { JSX } from "react";
import { FaHashtag } from "react-icons/fa";
import { GrChannel } from "react-icons/gr";
import { LuUser } from "react-icons/lu";

const Explore = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full gap-5">
      <SearchBar />

      <div className="bg-white rounded-lg p-3">
        <Tabs.Root defaultValue="accounts">
          <Tabs.List className="gap-4">
            <Tabs.Trigger
              value="accounts"
              className="p-0 text-xs items-center flex justify-center"
            >
              <LuUser />
              Accounts
            </Tabs.Trigger>

            <Tabs.Trigger
              value="projects"
              className="p-0 text-xs items-center flex justify-center"
            >
              <GrChannel />
              Channels
            </Tabs.Trigger>

            <Tabs.Trigger
              value="hashtags"
              className="p-0 text-xs items-center flex justify-center"
            >
              <FaHashtag />
              Hashtags
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="accounts">Manage your team members</Tabs.Content>
          <Tabs.Content value="projects">Manage your projects</Tabs.Content>
          <Tabs.Content value="hashtags">
            Manage your tasks for freelancers
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Explore;
