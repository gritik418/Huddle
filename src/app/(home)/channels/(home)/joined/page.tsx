"use client";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../app/store";
import Spinner from "../../../../../components/Spinner/Spinner";
import {
  getJoinedChannelsAsync,
  selectJoinedChannels,
  selectJoinedChannelsLoading,
  selectJoinedChannelsPagination,
} from "../../../../../features/channel/channelSlice";
import ChannelItem from "../../../../../components/ChannelItem/ChannelItem";

const JoinedChannels = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const channels: Channel[] = useSelector(selectJoinedChannels);
  const loading: boolean = useSelector(selectJoinedChannelsLoading);
  const pagination = useSelector(selectJoinedChannelsPagination);

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(getJoinedChannelsAsync({ page: page + 1, limit: 10 }));
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    const timeOutId = setTimeout(() => {
      dispatch(getJoinedChannelsAsync({ page: 1, limit: 10 }));
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [dispatch]);

  function renderContent(): JSX.Element {
    if (loading && page === 1) {
      return (
        <div className="flex justify-center py-8 items-center w-full">
          <Spinner variant={"small"} />
        </div>
      );
    }

    if (!channels || channels.length === 0 || !pagination) {
      return (
        <div className="flex items-center justify-center my-6">
          <p className="text-lg">You haven&apos;t joined any channels yet.</p>
        </div>
      );
    }

    return (
      <InfiniteScroll
        dataLength={channels.length}
        next={fetchData}
        hasMore={pagination.totalPages! > page}
        loader={
          <div className="flex items-center py-6 justify-center">
            <Spinner variant={"small"} />
          </div>
        }
        className="w-full"
      >
        <div className="grid w-full min-w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {channels.map((channel: Channel) => (
            <ChannelItem key={channel._id} channel={channel} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <div className="w-full bg-white min-h-[calc(100vh-56px-16px-24px-130px)] flex flex-col p-3 rounded-lg">
      <div className="mx-auto w-full p-2 items-center">
        <div className="flex justify-between items-center h-10 mb-4">
          <h2 className="text-2xl font-semibold">Joined Channels</h2>
        </div>

        <div className="flex mt-6 w-full flex-col">{renderContent()}</div>
      </div>
    </div>
  );
};

export default JoinedChannels;
