"use client";
import Link from "next/link";
import { AppDispatch } from "../../../../app/store";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  clearSearch,
  searchAsync,
  selectSearchedChannels,
  selectSearchLoading,
  selectSearchPagination,
} from "../../../../features/search/searchSlice";
import { selectUser } from "../../../../features/user/userSlice";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const AllChannels = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const channels: Channel[] = useSelector(selectSearchedChannels);
  const loading: boolean = useSelector(selectSearchLoading);
  const pagination = useSelector(selectSearchPagination);
  const user: User = useSelector(selectUser)!;
  const router = useRouter();

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(
        searchAsync({
          searchQuery: "",
          type: "channels",
          page: page + 1,
          limit: 10,
        })
      );

      setPage(() => page + 1);
    }
  };

  const handleCreateChannelPage = () => {
    router.push("/channels/create");
  };

  useEffect(() => {
    setPage(1);
    const timeOutId = setTimeout(() => {
      dispatch(clearSearch());

      dispatch(
        searchAsync({ searchQuery: "", type: "channels", page: 1, limit: 10 })
      );
    }, 600);

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
                    href={`/channels/info/${channel._id}`}
                    className="border-blue-500 text-blue-500 border-2 font-semibold px-2 box-border rounded-md"
                  >
                    View
                  </Link>

                  {!channel.members.includes(user._id) && (
                    <button className="bg-blue-500 text-white px-2 font-semibold rounded-md hover:bg-blue-600">
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
    <div className="w-full bg-white min-h-[calc(100vh-56px-16px-24px-130px)] flex flex-col p-3 rounded-lg">
      <div className="mx-auto w-full p-2 items-center">
        <div className="flex justify-between items-center mb-4 h-10">
          <h2 className="text-2xl font-semibold">All Channels</h2>

          <div className="text-center">
            <button
              onClick={handleCreateChannelPage}
              className="bg-[var(--primary)] transition-colors h-10 ease-in-out duration-300 text-white px-6 rounded-md hover:bg-[var(--secondary)]"
            >
              Create a New Channel
            </button>
          </div>
        </div>

        <div className="flex mt-6 w-full flex-col">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AllChannels;
