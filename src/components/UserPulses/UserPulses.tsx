"use client";
import { AppDispatch } from "../../app/store";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import {
  getUserPulsesAsync,
  selectUserPulses,
  selectUserPulsesLoading,
  selectUserPulsesPagination,
} from "../../features/pulse/pulseSlice";
import UserPulseItem from "../UserPulseItem/UserPulseItem";

const UserPulses = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const pulses: Pulse[] = useSelector(selectUserPulses);
  const pagination = useSelector(selectUserPulsesPagination);
  const loading: boolean = useSelector(selectUserPulsesLoading);

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(getUserPulsesAsync({ page: page + 1, limit: 10 }));
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    if (page === 1) {
      dispatch(getUserPulsesAsync({ page: page, limit: 10 }));
    }
  }, [dispatch, page]);

  if (!pulses || !pagination || pulses.length === 0) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] bg-white rounded-lg w-full text-xl justify-center items-center">
        <p>No pulses.</p>
      </div>
    );
  }

  if (loading && page === 1) {
    return (
      <div className="flex flex-col py-12 gap-4 text-xl items-center justify-center rounded-lg w-full">
        <Spinner variant={"small"} />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={pulses.length}
      next={fetchData}
      hasMore={pagination.totalPages! > page}
      loader={
        <div className="flex items-center py-6 justify-center">
          <Spinner variant={"small"} />
        </div>
      }
      className="w-full"
    >
      <div className="flex flex-col min-w-full flex-1 gap-3">
        {pulses.map((pulse: Pulse) => (
          <UserPulseItem key={pulse._id} pulse={pulse} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default UserPulses;
