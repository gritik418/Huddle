"use client";
import { AppDispatch } from "@/app/store";
import {
  DeletePulseApiResponse,
  useDeletePulseMutation,
} from "@/features/api/pulseApi";
import { deleteUserPulse } from "@/features/pulse/pulseSlice";
import { Menu, Portal } from "@chakra-ui/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";

const UserPulseItem = ({ pulse }: { pulse: Pulse }): JSX.Element => {
  const [deletePulse] = useDeletePulseMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleDeletePulse = async (): Promise<void> => {
    try {
      const { data, error } = await deletePulse(pulse._id);
      if (data) {
        dispatch(deleteUserPulse(pulse._id));
      }
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as DeletePulseApiResponse;

        toast.error(parsedError.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occured.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-full">
      <div className="flex items-center justify-between bg-gray-50 p-4">
        <div className="flex space-x-2 items-center">
          <Image
            src={pulse.userId.profilePicture || "/images/default-profile.jpg"}
            alt={"avatar"}
            height={50}
            width={50}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{pulse.userId.firstName}</p>
            <p className="text-gray-500 font-semibold text-sm">
              @{pulse.userId.username}
            </p>
          </div>
        </div>

        <Menu.Root>
          <Menu.Trigger asChild>
            <div className="flex cursor-pointer p-2 items-center justify-center rounded-lg bg-gray-200">
              <IoEllipsisVerticalSharp />
            </div>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item
                  onClick={handleDeletePulse}
                  className="cursor-pointer"
                  value=""
                >
                  Delete Pulse{" "}
                  <Menu.ItemCommand>
                    <MdDelete />
                  </Menu.ItemCommand>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>

      <div className="flex flex-col px-4 pb-4 pt-2">
        <p>{pulse.content}</p>
        <p className="text-gray-500 text-right text-xs">
          {new Date(pulse.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserPulseItem;
