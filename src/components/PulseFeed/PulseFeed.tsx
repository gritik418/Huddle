"use client";
import { AppDispatch } from "@/app/store";
import {
  getAllPulsesAsync,
  selectPulses,
  selectPulsesPagination,
} from "@/features/pulse/pulseSlice";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import PulseItem from "../PulseItem/PulseItem";

const PulseFeed = () => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const pulses: Pulse[] = useSelector(selectPulses);
  const pagination = useSelector(selectPulsesPagination);

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

  return (
    <InfiniteScroll
      dataLength={pulses.length}
      next={fetchData}
      hasMore={pagination?.totalPages! > page}
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
