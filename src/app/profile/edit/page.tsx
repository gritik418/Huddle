"use client";
import Spinner from "../../../components/Spinner/Spinner";
import {
  UpdateUserApiResponse,
  useUpdateUserMutation,
} from "../../../features/api/userApi";
import { selectUser } from "../../../features/user/userSlice";
import updateUserSchema from "../../../validators/updateUserSchema";
import { Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";

type FormValues = {
  firstName: string;
  lastName?: string;
  username: string;
  bio?: string;
  coverImage?: File | undefined;
  profilePicture?: File | undefined;
};

const EditUserInfo = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const [updateUser] = useUpdateUserMutation();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      bio: user?.bio,
      coverImage: undefined,
      profilePicture: undefined,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const handleUpdateUser = async (userData: FormValues): Promise<void> => {
    try {
      const formData = new FormData();
      if (userData.coverImage)
        formData.append("coverImage", userData?.coverImage);
      if (userData.profilePicture)
        formData.append("profilePicture", userData.profilePicture);

      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData?.lastName || "");
      formData.append("username", userData.username);
      formData.append("bio", userData?.bio || "");

      const { data, error } = await updateUser(formData);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as UpdateUserApiResponse;

        if (parsedError?.errors) {
          if (parsedError.errors?.firstName) {
            setError("firstName", {
              message: parsedError.errors.firstName,
            });
          }
          if (parsedError.errors?.lastName) {
            setError("lastName", {
              message: parsedError.errors.lastName,
            });
          }
          if (parsedError.errors?.username) {
            setError("username", {
              message: parsedError.errors.username,
            });
          }
          if (parsedError.errors?.bio) {
            setError("bio", {
              message: parsedError.errors.bio,
            });
          }
          if (parsedError.errors?.profilePicture) {
            setError("profilePicture", {
              message: parsedError.errors.profilePicture,
            });
          }
          if (parsedError.errors?.coverImage) {
            setError("coverImage", {
              message: parsedError.errors.coverImage,
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
      } else {
        if (data?.message)
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

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setValue("coverImage", file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white rounded-lg p-3 mb-6">
      <form onSubmit={handleSubmit(handleUpdateUser)} className="flex flex-col">
        <div className="relative">
          <Image
            src={
              coverImagePreview ||
              user?.coverImage ||
              "https://images.unsplash.com/photo-1615196534055-7aa534f6836b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdmVyJTIwcGhvdG98ZW58MHx8MHx8fDA%3D"
            }
            alt="cover-image"
            height={300}
            width={800}
            className="w-full max-h-[260px] object-cover rounded-lg"
          />
          <label
            htmlFor="coverImage"
            className="absolute bg-gray-50 cursor-pointer p-1 px-2 rounded-lg text-xl top-2 right-2"
          >
            <HiPhoto />
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            multiple={false}
            className="hidden"
            {...register("coverImage")}
            onChange={handleCoverImageChange}
          />
          <div className="flex absolute left-1/2 -translate-x-1/2 md:translate-x-0 top-1/2 md:left-16 translate-y-1/3 rounded-full h-[180px] w-[180px] border-8 border-white">
            <div className="flex relative rounded-full">
              <Image
                src={
                  profileImagePreview ||
                  user?.profilePicture ||
                  "/images/default-profile.jpg"
                }
                alt="profile"
                height={200}
                className="rounded-full object-cover"
                width={200}
              />
              <label
                htmlFor="avatar"
                className="flex cursor-pointer items-center justify-center text-white absolute bottom-1 right-1 h-10 w-10 bg-[var(--secondary)] rounded-full"
              >
                <FaCamera />
              </label>
              <input
                id="avatar"
                accept="image/*"
                type="file"
                multiple={false}
                {...register("profilePicture")}
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 justify-center flex-col gap-4 pt-44">
          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="firstName" className="ml-2">
              First Name
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none border-2"
              {...register("firstName")}
              id="firstName"
              placeholder="First Name"
            />
            {errors.firstName && touchedFields.firstName ? (
              <span className="text-xs text-red-400 h-2 font-semibold">
                {" "}
                {errors.firstName.message}
              </span>
            ) : (
              <span className="h-2"></span>
            )}
          </div>

          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="lastName" className="ml-2">
              Last Name
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none border-2"
              {...register("lastName")}
              id="lastName"
              placeholder="Last Name"
            />
            {errors.lastName && touchedFields.lastName ? (
              <span className="text-xs text-red-400 h-2 font-semibold">
                {" "}
                {errors.lastName.message}
              </span>
            ) : (
              <span className="h-2"></span>
            )}
          </div>

          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="username" className="ml-2">
              Username
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none border-2"
              {...register("username")}
              id="username"
              placeholder="Username"
            />
            {errors.username && touchedFields.username ? (
              <span className="text-xs text-red-400 h-2 font-semibold">
                {" "}
                {errors.username.message}
              </span>
            ) : (
              <span className="h-2"></span>
            )}
          </div>

          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label className="ml-2">Email</label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none border-2"
              readOnly
              value={user?.email}
            />
          </div>

          <div className="flex md:col-span-2 rounded-lg flex-col p-2 gap-1">
            <label htmlFor="bio" className="ml-2">
              Bio
            </label>
            <Textarea
              className="bg-gray-100 p-2 resize-none rounded-lg outline-none border-2"
              {...register("bio")}
              id="bio"
              placeholder="A few words about you..."
            />
            {errors.bio && touchedFields.bio ? (
              <span className="text-xs text-red-400 h-2 font-semibold">
                {" "}
                {errors.bio.message}
              </span>
            ) : (
              <span className="h-2"></span>
            )}
          </div>
        </div>

        <div className="flex my-6 md:col-span-2 items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-24 h-10 items-center justify-center bg-[var(--secondary)] text-white rounded-lg cursor-pointer font-bold"
          >
            {isSubmitting ? <Spinner variant={null} /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
