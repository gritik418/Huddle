"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ChannelsPage = (): null => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/channels/chats");
  }, [router]);

  return null;
};

export default ChannelsPage;
