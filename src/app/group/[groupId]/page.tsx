"use client";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import GroupMemberTile from "../../../components/GroupMemberTile/GroupMemberTile";
import Spinner from "../../../components/Spinner/Spinner";
import {
  GroupApiResponse,
  useDeleteGroupMutation,
  useGetGroupByIdQuery,
  useLeaveGroupMutation,
  useUpdateGroupIconMutation,
  useUpdateGroupInfoMutation,
} from "../../../features/api/groupApi";
import groupSchema from "../../../validators/groupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/user/userSlice";
import NotLoggedIn from "../../../components/NotLoggedIn/NotLoggedIn";
import { FiLogOut } from "react-icons/fi";

interface FormValues {
  groupName: string;
  groupDescription: string;
  groupIcon: File | undefined;
}

const GroupInformation = (): JSX.Element => {
  const params: { groupId: string } = useParams();
  const { isLoading, data, error } = useGetGroupByIdQuery(params.groupId);
  const [updateIcon] = useUpdateGroupIconMutation();
  const [updateInfo] = useUpdateGroupInfoMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const user: User | null = useSelector(selectUser);
  const [groupIcon, setGroupIcon] = useState<File | null>(null);
  const [groupIconPreview, setGroupIconPreview] = useState<string | null>(null);
  const [groupIconLoading, setGroupIconLoading] = useState<boolean>(false);
  const [leaveGroupLoading, setLeaveGroupLoading] = useState<boolean>(false);
  const [deleteGroupLoading, setDeleteGroupLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      groupName: data?.group?.groupName,
      groupDescription: data?.group?.groupDescription,
    },
    resolver: zodResolver(groupSchema),
  });

  const handleUpdateGroupInfo = async (values: FormValues): Promise<void> => {
    try {
      const { data, error } = await updateInfo({
        data: values,
        groupId: params.groupId,
      });

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as GroupApiResponse;

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
      } else if (data) {
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

  const handleUpdateGroupIcon = async (): Promise<void> => {
    try {
      if (groupIcon) {
        setGroupIconLoading(true);
        const formData = new FormData();
        formData.append("groupIcon", groupIcon);
        const { data, error } = await updateIcon({
          data: formData,
          groupId: params.groupId,
        });
        setGroupIconLoading(false);

        if (error) {
          const errorResponse = error as FetchBaseQueryError;
          const parsedError = errorResponse?.data as GroupApiResponse;

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
        } else if (data) {
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
        }
      } else {
        toast.error("Please select a file to upload.", {
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

  const handleLeaveGroup = async () => {
    try {
      setLeaveGroupLoading(true);
      const { data, error } = await leaveGroup(params.groupId);
      setLeaveGroupLoading(false);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as GroupApiResponse;

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
      } else if (data) {
        router.push("/chat");
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
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error.", {
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

  const handleDeleteGroup = async () => {
    try {
      setDeleteGroupLoading(true);
      const { data, error } = await deleteGroup(params.groupId);
      setDeleteGroupLoading(false);
      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as GroupApiResponse;

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
      } else if (data) {
        router.push("/chat");
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
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error.", {
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

  const handleGroupIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setGroupIcon(e.target.files[0]);
      setGroupIconPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    setValue("groupName", data?.group?.groupName || "");
    setValue("groupDescription", data?.group?.groupDescription || "");
  }, [data?.group, setValue]);

  if (!user || !user._id) return <NotLoggedIn />;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner variant={"medium"} />
      </div>
    );
  }

  if (error || !data?.group) {
    return (
      <div className="flex p-2 flex-col h-[calc(100vh-56px)] flex-1 items-center justify-center">
        <Image
          src={"/images/no-chat.jpg"}
          alt="no-chat"
          height={300}
          width={300}
        />
        <p className="text-xl text-center">
          Oops! This group doesn&apos;t exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-14">
      <div className="grid grid-cols-1 container m-auto justify-evenly gap-8 items-center">
        {data.group.admins.includes(user._id) ? (
          <div className="flex flex-col bg-white p-3 py-6 rounded-lg h-full flex-1 items-center justify-center">
            <div className="relative rounded-full flex h-[200px] md:h-[300px] w-[200px] md:w-[300px]">
              <Image
                className="h-full w-full rounded-full object-cover"
                src={
                  groupIconPreview ||
                  data?.group?.groupIcon ||
                  "/images/default-group-icon.png"
                }
                alt="group icon"
                height={300}
                width={300}
              />

              <label
                htmlFor="group-icon"
                className="absolute cursor-pointer rounded-full flex items-center justify-center bottom-1 right-1 bg-[var(--secondary)] border-4 border-white w-14 h-14 text-white z-10"
              >
                <FaCamera className="text-2xl" />
              </label>
              <input
                accept="image/*"
                multiple={false}
                className="hidden"
                type="file"
                id="group-icon"
                onChange={handleGroupIconChange}
              />
            </div>

            <button
              onClick={handleUpdateGroupIcon}
              className="bg-[var(--secondary)] flex items-center justify-center h-10 w-40 font-semibold text-white rounded-lg mt-8"
            >
              {groupIconLoading ? (
                <Spinner variant={null} />
              ) : (
                "Update Group Icon"
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col bg-white p-3 py-6 rounded-lg h-full flex-1 items-center justify-center">
            <div className="rounded-full flex h-[200px] md:h-[300px] w-[200px] md:w-[300px]">
              <Image
                className="h-full w-full rounded-full object-cover"
                src={data?.group?.groupIcon || "/images/default-group-icon.png"}
                alt="group icon"
                height={300}
                width={300}
              />
            </div>
          </div>
        )}

        {data.group.admins.includes(user._id) ? (
          <form
            onSubmit={handleSubmit(handleUpdateGroupInfo)}
            className="flex bg-white p-3 py-6 rounded-lg flex-col flex-1 w-full gap-4 items-center"
          >
            <div className="flex w-full gap-1 flex-col">
              <label htmlFor="groupName">Group Name</label>
              <input
                {...register("groupName")}
                type="text"
                className="border-2 p-2 rounded-lg bg-gray-50"
                placeholder="Group Name"
                id="groupName"
              />

              {errors.groupName && touchedFields.groupName ? (
                <span className="text-xs h-2 text-red-500">
                  {errors?.groupName.message}
                </span>
              ) : (
                <span className="h-2 text-xs text-red-500"></span>
              )}
            </div>

            <div className="flex w-full gap-1 flex-col">
              <label htmlFor="groupDescription">Group Description</label>
              <textarea
                {...register("groupDescription")}
                className="border-2 p-2 resize-none bg-gray-50 rounded-lg h-20"
                placeholder="Group Description"
                id="groupDescription"
              />

              {errors.groupDescription && touchedFields.groupDescription ? (
                <span className="text-xs h-2 text-red-500">
                  {errors?.groupDescription.message}
                </span>
              ) : (
                <span className="h-2 text-xs text-red-500"></span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[var(--secondary)] flex items-center justify-center h-10 w-24 text-white font-semibold rounded-lg"
            >
              {isSubmitting ? <Spinner variant={null} /> : "Update"}
            </button>
          </form>
        ) : (
          <div className="flex bg-white p-3 py-6 rounded-lg flex-col flex-1 w-full gap-4 items-center">
            <div className="flex w-full gap-1 flex-col">
              <label htmlFor="groupName">Group Name</label>
              <input
                readOnly
                type="text"
                value={data.group.groupName}
                className="border-2 p-2 rounded-lg outline-none bg-gray-50"
                placeholder="Group Name"
                id="groupName"
              />
            </div>

            <div className="flex w-full gap-1 flex-col">
              <label htmlFor="groupDescription">Group Description</label>
              <textarea
                readOnly
                value={data.group.groupDescription}
                className="border-2 p-2 resize-none outline-none bg-gray-50 rounded-lg h-20"
                placeholder="Group Description"
                id="groupDescription"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col container mt-8 bg-white rounded-lg p-3 py-6 m-auto w-full">
        <h2 className="text-xl">Group Members</h2>

        <div className="flex flex-col mt-4 gap-4">
          {data?.group?.members.map((member: ChatMember) => (
            <GroupMemberTile
              key={member._id}
              admins={data.group?.admins || []}
              member={member}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto my-10 flex justify-end">
        {data.group.admins.includes(user._id) ? (
          <button
            onClick={handleDeleteGroup}
            className="h-10 w-36 flex items-center justify-center rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-200"
          >
            {deleteGroupLoading ? <Spinner variant={null} /> : "Delete Group"}
          </button>
        ) : (
          <button
            onClick={handleLeaveGroup}
            className="gap-2 h-10 w-36 flex items-center justify-center rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-200"
          >
            {leaveGroupLoading ? (
              <Spinner variant={null} />
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiLogOut size={18} />
                Leave Group
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupInformation;
