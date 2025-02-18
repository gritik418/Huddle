"use client";
import EditUserInfo from "@/components/EditUserInfo/EditUserInfo";
import { selectUser } from "@/features/user/userSlice";
import { Input, Textarea } from "@chakra-ui/react";
import { JSX, useState } from "react";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { GrEdit } from "react-icons/gr";

const Profile = (): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg p-3 mt-4 mb-6">
      <div className="flex p-3 justify-end">
        <div
          onClick={() => setAllowEdit(!allowEdit)}
          className="flex bg-gray-200 font-semibold cursor-pointer p-2 rounded-lg"
        >
          <CiEdit className="text-xl" />
        </div>
      </div>

      {allowEdit ? (
        <EditUserInfo />
      ) : (
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 justify-center flex-col gap-4 items-center">
          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="" className="ml-2">
              First Name
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none"
              readOnly
              value={user?.firstName}
            />
          </div>

          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="" className="ml-2">
              Last Name
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none"
              readOnly
              value={user?.lastName}
            />
          </div>

          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="" className="ml-2">
              Username
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none"
              readOnly
              value={user?.username}
            />
          </div>

          <div className="flex rounded-lg flex-col p-2 gap-1">
            <label htmlFor="" className="ml-2">
              Email
            </label>
            <Input
              className="bg-gray-100 p-2 rounded-lg outline-none"
              readOnly
              value={user?.email}
            />
          </div>

          <div className="flex md:col-span-2 rounded-lg flex-col p-2 gap-1">
            <label htmlFor="" className="ml-2">
              Bio
            </label>
            <Textarea
              className="bg-gray-100 p-2 resize-none rounded-lg outline-none"
              readOnly
              value={user?.bio}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
