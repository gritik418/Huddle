"use client";
import SelectGroupAdmins from "@/components/SelectGroupAdmins/SelectGroupAdmins";
import SelectGroupMembers from "@/components/SelectGroupMembers/SelectGroupMembers";
import Spinner from "@/components/Spinner/Spinner";
import {
  CreateGroupApiResponse,
  useCreateGroupMutation,
} from "@/features/api/groupApi";
import groupSchema from "@/validators/groupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

type FormValues = {
  groupName: string;
  groupDescription: string;
};

const CreateGroup = (): JSX.Element => {
  const [adminsToBe, setAdminsToBe] = useState<Follower[]>([]);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [memberError, setMemberError] = useState<string>("");
  const [createGroup] = useCreateGroupMutation();
  const [groupIcon, setGroupIcon] = useState<File | null>(null);
  const [groupIconPreview, setGroupIconPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    defaultValues: {
      groupName: "",
      groupDescription: "",
    },
    resolver: zodResolver(groupSchema),
  });

  const handleCreateGroup = async (values: FormValues) => {
    if (selectedMembers.length < 2) {
      setMemberError("There must be at least two members.");
      toast.error("Select atleast two members.", {
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
    try {
      const formData = new FormData();

      formData.append("groupName", values.groupName);
      formData.append("groupDescription", values.groupDescription);
      if (groupIcon) formData.append("groupIcon", groupIcon);

      selectedAdmins.forEach((admin: string) => {
        formData.append("admins[]", admin);
      });

      selectedMembers.forEach((member: string) => {
        formData.append("members[]", member);
      });

      setLoading(true);
      const { data, error } = await createGroup(formData);
      setLoading(false);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as CreateGroupApiResponse;
        if (parsedError?.errors) {
          if (parsedError.errors?.groupName) {
            setError("groupName", {
              message: parsedError.errors.groupName,
            });
          }
          if (parsedError.errors?.groupDescription) {
            setError("groupDescription", {
              message: parsedError.errors.groupDescription,
            });
          }
          if (parsedError.errors?.members) {
            setMemberError(parsedError.errors.members);
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
        if (data.message) {
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
        setTimeout(() => {
          router.push("/chat");
        }, 1000);
      } else {
        if (data?.message) {
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
          return;
        }
      }
    } catch (error) {
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

  const handleGroupIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setGroupIcon(file);
      setGroupIconPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    setMemberError("");
    if (selectedMembers.length < 2) {
      setMemberError("There must be at least two members.");
    }
  }, [selectedMembers]);

  return (
    <form onSubmit={handleSubmit(handleCreateGroup)} className="p-3">
      <div className="flex items-center justify-center mt-8">
        <h1 className="text-3xl font-semibold">Create Group</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 container m-auto justify-evenly mt-14 gap-8 items-center">
        <div className="flex h-full flex-1 items-center justify-center">
          <div className="relative rounded-full flex h-[200px] md:h-[300px] w-[200px] md:w-[300px]">
            <Image
              className="h-full w-full rounded-full"
              src={groupIconPreview || "/images/default-group-icon.png"}
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
        </div>

        <div className="flex flex-col flex-1 w-full gap-4">
          <div className="flex gap-1 flex-col">
            <label htmlFor="groupName">Group Name</label>
            <input
              {...register("groupName")}
              type="text"
              className="border-2 p-2 rounded-lg"
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
          <div className="flex gap-1 flex-col">
            <label htmlFor="groupDescription">Group Description</label>
            <textarea
              {...register("groupDescription")}
              className="border-2 p-2 resize-none rounded-lg h-20"
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
        </div>
      </div>

      <SelectGroupMembers
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
        adminsToBe={adminsToBe}
        setAdminsToBe={setAdminsToBe}
      />

      <div className="container m-auto">
        {memberError ? (
          <span className="text-xs h-2 text-red-500">{memberError}</span>
        ) : (
          <span className="h-2 p-3 text-xs text-red-500"></span>
        )}
      </div>

      <SelectGroupAdmins
        selectedAdmins={selectedAdmins}
        setSelectedAdmins={setSelectedAdmins}
        adminsToBe={adminsToBe}
      />

      <div className="flex container justify-end my-8 m-auto w-full">
        <button
          type="submit"
          className="bg-[var(--secondary)] flex items-center justify-center text-white h-10 w-36 rounded-lg font-semibold"
        >
          {loading ? <Spinner variant={null} /> : "Create Group"}
        </button>
      </div>
    </form>
  );
};

export default CreateGroup;
