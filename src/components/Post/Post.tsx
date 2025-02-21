import Image from "next/image";
import { JSX } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import PostMedia from "../PostMedia/PostMedia";
import Link from "next/link";

type PropsType = {
  post: Post;
};

const Post = ({ post }: PropsType): JSX.Element => {
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

        <div className="flex cursor-pointer">
          <HiDotsVertical className="text-xl" />
        </div>
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

export default Post;
