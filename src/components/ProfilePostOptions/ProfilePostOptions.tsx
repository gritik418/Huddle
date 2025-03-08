import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MdCommentsDisabled } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { PostApiResponse, useRemovePostMutation } from "@/features/api/postApi";
import { Bounce, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const ProfilePostOptions = ({ postId }: { postId: string }) => {
  const [removePost] = useRemovePostMutation();

  const handleRemovePost = async () => {
    try {
      const { data, error } = await removePost(postId);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as PostApiResponse;

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer">
          <HiDotsVertical className="text-xl" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleRemovePost}
            className="cursor-pointer"
          >
            <FaRegTrashAlt className="text-xs" /> Remove Post
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <MdCommentsDisabled className="text-xs" /> Disable Comments
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilePostOptions;
