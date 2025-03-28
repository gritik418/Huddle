"use client";
import { AppDispatch } from "@/app/store";
import Spinner from "@/components/Spinner/Spinner";
import {
  clearSearch,
  searchAsync,
  selectSearchedChannels,
  selectSearchLoading,
  selectSearchPagination,
} from "@/features/search/searchSlice";
import { selectUser } from "@/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

const Channels = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const channels: Channel[] = useSelector(selectSearchedChannels);
  const loading: boolean = useSelector(selectSearchLoading);
  const pagination = useSelector(selectSearchPagination);
  const user: User = useSelector(selectUser)!;

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(
        searchAsync({
          searchQuery,
          type: "channels",
          page: page + 1,
          limit: 10,
        })
      );

      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    const timeOutId = setTimeout(() => {
      dispatch(clearSearch());

      dispatch(
        searchAsync({ searchQuery, type: "channels", page: 1, limit: 10 })
      );
    }, 600);

    return () => clearTimeout(timeOutId);
  }, [searchQuery, dispatch]);

  const router = useRouter();

  const handleCreateChannelPage = () => {
    router.push("/channels/create");
  };

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
          <p className="text-lg">No channels found.</p>
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
              <h3 className="text-xl font-semibold">{channel.name}</h3>
              <p className="text-sm text-gray-600">{channel.description}</p>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {channel.members.length} members
                </span>

                <div className="flex gap-2">
                  <Link
                    href={`/channels/${channel._id}`}
                    className="border-blue-500 text-blue-500 border-2 font-semibold px-3 box-border py-1 rounded-md"
                  >
                    View
                  </Link>

                  {channel.members.includes(user._id) ? (
                    <button className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500">
                      Leave
                    </button>
                  ) : (
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                      Join
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] w-full gap-3">
      <div className="bg-gradient-to-r rounded-lg from-blue-400 to-purple-500 text-white text-center p-6">
        <h1 className="text-3xl font-bold">Channels</h1>
        <p className="mt-2 text-sm font-semibold">
          Join a channel or create your own to start a conversation!
        </p>
      </div>

      <div className="w-full bg-white min-h-[calc(100vh-56px-16px-24px-130px)] flex flex-col p-3 rounded-lg">
        <div className="mx-auto w-full p-6 items-center">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Browse Channels</h2>

            <div className="text-center">
              <button
                onClick={handleCreateChannelPage}
                className="bg-[var(--primary)] transition-colors ease-in-out duration-300 text-white px-6 py-3 rounded-md hover:bg-[var(--secondary)]"
              >
                Create a New Channel
              </button>
            </div>
          </div>

          <div className="w-full my-6 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Channels"
              className="border bg-gray-50 border-gray-300 outline-blue-400 p-4 rounded-md w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex mt-6 w-full flex-col">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
