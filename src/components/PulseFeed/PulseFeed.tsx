"use client";
import { AppDispatch } from "../../app/store";
import {
  getAllPulsesAsync,
  selectPulses,
  selectPulsesLoading,
  selectPulsesPagination,
} from "../../features/pulse/pulseSlice";
import { JSX, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import PulseItem from "../PulseItem/PulseItem";

const PulseFeed = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const pulses: Pulse[] = useSelector(selectPulses);
  const pagination = useSelector(selectPulsesPagination);
  const loading: boolean = useSelector(selectPulsesLoading);

  const fetchData = async () => {
    if (page >= 1) {
      dispatch(getAllPulsesAsync({ page: page + 1, limit: 5 }));
      setPage(() => page + 1);
    }
  };

  useEffect(() => {
    if (page === 1) {
      dispatch(getAllPulsesAsync({ page: page, limit: 5 }));
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
          <PulseItem key={pulse._id} pulse={pulse} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PulseFeed;
