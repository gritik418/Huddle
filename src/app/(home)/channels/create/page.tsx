"use client";
import CreatorInfo from "../../../../components/CreatorInfo/CreatorInfo";
import { SelectChannelType } from "../../../../components/SelectChannelType/SelectChannelType";
import SelectMessagePermission from "../../../../components/SelectMessagePermission/SelectMessagePermission";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import {
  CreateChannelApiResponse,
  useCreateChannelMutation,
} from "../../../../features/api/channelApi";
import ChannelSchema, {
  ChannelData,
} from "../../../../validators/channelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../features/user/userSlice";
import { JSX } from "react";
import NotLoggedIn from "../../../../components/NotLoggedIn/NotLoggedIn";

const CreateChannelPage = (): JSX.Element => {
  const [createChannel] = useCreateChannelMutation();
  const user = useSelector(selectUser);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<ChannelData>({
    defaultValues: {
      name: "",
      description: "",
      sendMessagePermission: "creator",
      type: "public",
    },
    resolver: zodResolver(ChannelSchema),
  });

  if (!user) return <NotLoggedIn />;

  const handleCreateChannel = async (values: ChannelData) => {
    try {
      const { data, error } = await createChannel(values);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as CreateChannelApiResponse;

        if (parsedError?.errors) {
          if (parsedError.errors?.name) {
            setError("name", {
              message: parsedError.errors.name,
            });
          }
          if (parsedError.errors?.description) {
            setError("description", {
              message: parsedError.errors?.description,
            });
          }
          if (parsedError.errors?.sendMessagePermission) {
            setError("sendMessagePermission", {
              message: parsedError.errors?.sendMessagePermission,
            });
          }
          if (parsedError.errors?.type) {
            setError("type", {
              message: parsedError.errors?.type,
            });
          }
          return;
        }
        if (parsedError?.message) {
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
          return;
        }
      }

      if (data?.success) {
        toast.success(data.message, {
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

        if (data.channel) {
          router.push(`/channels/info/${data.channel._id}`);
        }
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
    <form
      onSubmit={handleSubmit(handleCreateChannel)}
      className="flex flex-col min-h-[calc(100vh-56px-16px-24px)] w-full gap-3 bg-white rounded-lg p-6"
    >
      <h1 className="text-2xl font-medium mx-auto">Create a new Channel</h1>

      <div className="flex flex-col mt-8 gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CreatorInfo user={user} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Creator</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col gap-1">
          <label htmlFor="channelName" className="text-lg">
            Channel Name
          </label>
          <input
            {...register("name")}
            type="text"
            name="name"
            className="border-2 bg-gray-50 rounded-md p-2 outline-[var(--secondary)]"
            id="channelName"
          />
          <span className="text-xs h-4 text-red-500 font-medium">
            {touchedFields.name && errors.name?.message}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="channelDescription" className="text-lg">
            Channel Description
          </label>
          <textarea
            {...register("description")}
            name="description"
            className="border-2 bg-gray-50 resize-none rounded-md p-2 outline-[var(--secondary)]"
            id="channelDescription"
          />
          <span className="text-xs h-4 text-red-500 font-medium">
            {touchedFields.description && errors.description?.message}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="channelDescription" className="text-lg">
            Channel Type
          </label>

          <SelectChannelType getValues={getValues} setValue={setValue} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="channelDescription" className="text-lg">
            Select who can send messages
          </label>

          <SelectMessagePermission getValues={getValues} setValue={setValue} />
        </div>

        <button
          type="submit"
          className="flex shadow-lg bg-[var(--secondary)] ml-auto h-10 w-44 mt-4 items-center justify-center text-white font-medium rounded-lg text-xl"
        >
          {isSubmitting ? <Spinner variant={null} /> : "Create Channel"}
        </button>
      </div>
    </form>
  );
};

export default CreateChannelPage;
