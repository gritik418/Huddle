import { selectUser } from "../../features/user/userSlice";
import Image from "next/image";
import { JSX, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import PostMedia from "../PostMedia/PostMedia";
import ProfilePostOptions from "../ProfilePostOptions/ProfilePostOptions";
import { Bounce, toast } from "react-toastify";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../features/api/postApi";
import { redirect } from "next/navigation";

type PropsType = {
  post: Post;
};

const ProfilePost = ({ post }: PropsType): JSX.Element => {
  const user: User | null = useSelector(selectUser);
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
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
    <div className="bg-white shadow-lg border-t-2 border-gray-100 overflow-hidden rounded-lg">
      <div className="flex bg-gray-100 p-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 rounded-full gap-2">
            <Image
              src={user?.profilePicture || "/images/default-profile.jpg"}
              alt="avtar"
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs font-semibold text-gray-500">
              @{user?.username}
            </p>
          </div>
        </div>

        <ProfilePostOptions postId={post._id} />
      </div>

      <div className="flex p-3">
        <p>{post.content}</p>
      </div>

      {post.mediaUrls && (
        <div className="flex">
          <PostMedia postMedia={post.mediaUrls} />
        </div>
      )}

      <div className="flex mt-2 p-3 gap-3">
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
      </div>
    </div>
  );
};

export default ProfilePost;
