"use client";
import { PulseApiResponse, useAddPulseMutation } from "@/features/api/pulseApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, JSX, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { addNewPulse } from "@/features/pulse/pulseSlice";
import { selectUser } from "@/features/user/userSlice";

const PulseInput = (): JSX.Element => {
  const [pulseText, setPulseText] = useState<string>("");
  const [addPulse] = useAddPulseMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user: User = useSelector(selectUser) as User;

  const handlePulseChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPulseText(e.target.value);
  };

  const handlePulseSubmit = async (): Promise<void> => {
    if (pulseText.length >= 10) {
      setLoading(true);
      const { data, error } = await addPulse({ content: pulseText });
      setLoading(false);
      if (data) {
        if (data.success) {
          if (data.savedPulse) {
            dispatch(
              addNewPulse({
                ...data.savedPulse,
                userId: {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName || "",
                  username: user.username,
                  profilePicture: user.profilePicture || "",
                  coverImage: user.coverImage || "",
                },
              })
            );
          }
        } else {
          toast.error(data.message, {
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
      } else {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as PulseApiResponse;

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
      setPulseText("");
    } else {
      toast.error("Please enter at least 10 characters.", {
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
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <textarea
        autoCapitalize="on"
        className="w-full p-2 border-2 focus:border-blue-400 border-gray-300 bg-gray-50 outline-none rounded-lg resize-none"
        placeholder="What's on your mind?"
        value={pulseText}
        onChange={handlePulseChange}
        rows={4}
      ></textarea>

      <button
        disabled={pulseText.length <= 10}
        onClick={handlePulseSubmit}
        className="mt-3 flex items-center justify-center h-10 w-20 disabled:bg-gray-400 bg-blue-500 transition-colors ease-in-out duration-300 text-white rounded-full hover:bg-blue-600"
      >
        {loading ? <Spinner variant={null} /> : "Pulse"}
      </button>
    </div>
  );
};

export default PulseInput;
