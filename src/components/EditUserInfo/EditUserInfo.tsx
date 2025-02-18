import { selectUser } from "@/features/user/userSlice";
import { Input, Textarea } from "@chakra-ui/react";
import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditUserInfo = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);

  const { register } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      bio: user?.bio,
    },
  });

  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 justify-center flex-col gap-4 items-center">
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
      </div>

      <div className="flex my-6 md:col-span-2 items-center justify-center">
        <div className="flex bg-[var(--secondary)] text-white p-2 px-4 rounded-lg cursor-pointer font-bold">
          Update
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
