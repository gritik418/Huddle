import { selectUser } from "@/features/user/userSlice";
import Image from "next/image";
import { JSX } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";
import PostMedia from "../PostMedia/PostMedia";
import ProfilePostOptions from "../ProfilePostOptions/ProfilePostOptions";

type PropsType = {
  post: Post;
};

const ProfilePost = ({ post }: PropsType): JSX.Element => {
  const user: User | null = useSelector(selectUser);

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
        <div className="flex bg-gray-100 cursor-pointer p-2 rounded-lg">
          <AiFillLike className="text-xl text-red-400" />
        </div>
        <div className="flex bg-gray-100 cursor-pointer p-2 rounded-lg">
          <FaRegCommentDots className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
