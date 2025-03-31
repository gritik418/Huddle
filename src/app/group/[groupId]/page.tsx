"use client";
import GroupMemberTile from "../../../components/GroupMemberTile/GroupMemberTile";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetGroupByIdQuery } from "../../../features/api/groupApi";
import groupSchema from "../../../validators/groupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

interface FormValues {
  groupName: string;
  groupDescription: string;
  groupIcon: File | undefined;
}

const GroupInformation = () => {
  const params: { groupId: string } = useParams();
  const { isLoading, data, error } = useGetGroupByIdQuery(params.groupId);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    defaultValues: {
      groupName: data?.group?.groupName,
      groupDescription: data?.group?.groupDescription,
    },
    resolver: zodResolver(groupSchema),
  });

  const handleUpdateGroupInfo = (values: FormValues) => {
    console.log(values);
  };

  useEffect(() => {
    setValue("groupName", data?.group?.groupName || "");
    setValue("groupDescription", data?.group?.groupDescription || "");
  }, [data?.group, setValue]);

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
        <div className="flex flex-col bg-white p-3 py-6 rounded-lg h-full flex-1 items-center justify-center">
          <div className="relative rounded-full flex h-[200px] md:h-[300px] w-[200px] md:w-[300px]">
            <Image
              className="h-full w-full rounded-full"
              src={data?.group?.groupIcon || "/images/default-group-icon.png"}
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
              // onChange={handleGroupIconChange}
            />
          </div>

          <button className="bg-[var(--secondary)] h-10 w-40 font-semibold text-white rounded-lg mt-8">
            Update Group Icon
          </button>
        </div>

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
            className="bg-[var(--secondary)] h-10 w-24 text-white font-semibold rounded-lg"
          >
            Update
          </button>
        </form>
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
    </div>
  );
};

export default GroupInformation;
