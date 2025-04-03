"use client";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../app/store";
import Spinner from "../../../../../components/Spinner/Spinner";
import {
  getCreatedChannelsAsync,
  selectCreatedChannels,
  selectCreatedChannelsLoading,
  selectCreatedChannelsPagination,
} from "../../../../../features/channel/channelSlice";
import { BsThreeDotsVertical } from "react-icons/bs";

const CreatedChannels = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const channels: Channel[] = useSelector(selectCreatedChannels);
  const loading: boolean = useSelector(selectCreatedChannelsLoading);
  const pagination = useSelector(selectCreatedChannelsPagination);

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(getCreatedChannelsAsync({ page: page + 1, limit: 10 }));
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    const timeOutId = setTimeout(() => {
      dispatch(getCreatedChannelsAsync({ page: 1, limit: 10 }));
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
          <p className="text-lg">You haven't created any channels yet.</p>
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
            <div
              key={channel._id}
              className="bg-gray-50 w-full flex-col flex flex-1 p-4 rounded-lg shadow-lg hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">{channel.name}</h3>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                </div>

                <div className="flex bg-gray-200 cursor-pointer h-max p-[6px] rounded-lg">
                  <BsThreeDotsVertical className="text-sm" />
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {channel.members.length} members
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/channels/info/${channel._id}`}
                    className="border-blue-500 text-blue-500 border-2 font-semibold px-2 box-border rounded-md"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <div className="w-full bg-white min-h-[calc(100vh-56px-16px-24px-130px)] flex flex-col p-3 rounded-lg">
      <div className="mx-auto w-full p-2 items-center">
        <div className="flex justify-between items-center h-10 mb-4">
          <h2 className="text-2xl font-semibold">Created Channels</h2>
        </div>

        <div className="flex mt-6 w-full flex-col">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CreatedChannels;
