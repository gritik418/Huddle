import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import PostMedia from "../PostMedia/PostMedia";
import PostOptions from "../PostOptions/PostOptions";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/user/userSlice";
import { Bounce, toast } from "react-toastify";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/features/api/postApi";
import { redirect } from "next/navigation";

type PropsType = {
  post: Post;
};

const Post = ({ post }: PropsType): JSX.Element => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const user: User | null = useSelector(selectUser);
  const [likes, setLikes] = useState<string[]>(post.likes);

  if (!user) {
    redirect("/login");
  }

  const handleLikePost = async () => {
    try {
      await likePost(post._id);
      if (!likes.includes(user?._id)) {
        setLikes((prev) => [...prev, user?._id]);
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

  const handleUnlikePost = async () => {
    try {
      await unlikePost(post._id);
      if (likes.includes(user?._id)) {
        setLikes(likes.filter((id: string) => id !== user?._id));
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
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex items-center border-b-[1px] border-gray-100 p-3 justify-between">
        <Link
          href={`/user/${post.userId.username}`}
          className="flex items-center gap-2"
        >
          <div className="flex h-12 w-12 rounded-full gap-2">
            <Image
              src={post.userId.profilePicture || "/images/default-profile.jpg"}
              alt="avtar"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>
              {post.userId.firstName} {post.userId.lastName}
            </p>

            <p className="text-xs font-semibold text-gray-500">
              @{post.userId.username}
            </p>
          </div>
        </Link>

        <PostOptions />
      </div>

      <div className="flex p-3">
        <p>{post.content}</p>
      </div>

      {post.mediaUrls && (
        <div className="flex p-3">
          <PostMedia postMedia={post.mediaUrls} />
        </div>
      )}

      <div className="flex p-3 gap-3">
        <div className="flex bg-gray-100 p-2 items-center gap-2  rounded-lg">
          {likes.includes(user?._id.toString()) ? (
            <AiFillLike
              onClick={handleUnlikePost}
              className="text-xl cursor-pointer text-red-400"
            />
          ) : (
            <AiOutlineLike
              onClick={handleLikePost}
              className="text-xl cursor-pointer text-red-400"
            />
          )}
          {likes.length > 1 && (
            <p className="text-xs text-gray-500">{likes.length} Likes</p>
          )}
        </div>

        <div className="flex bg-gray-100 cursor-pointer p-2 rounded-lg">
          <FaRegCommentDots className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Post;
