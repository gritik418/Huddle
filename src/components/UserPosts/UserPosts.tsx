import { useGetPostsByUserQuery } from "@/features/api/userApi";
import { JSX } from "react";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import Image from "next/image";
import Post from "../Post/Post";

const UserPosts = ({ user }: { user: User }): JSX.Element => {
  const { isLoading, error, data } = useGetPostsByUserQuery(user._id);

  function renderContent() {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-3 items-center justify-center h-full w-full">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      );
    }

    if (error || !data?.posts || data.posts.length === 0) {
      return (
        <div className="flex items-center p-8 flex-col justify-center h-full">
          <Image
            src={"/images/no-posts.png"}
            alt="No post"
            height={180}
            width={180}
          />
          <p className="text-lg">The user hasn't posted anything yet.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {data.posts.map((post: Post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    );
  }
  return (
    <div className="min-h-56 p-3 rounded-lg shadow-md ring-offset-1 bg-gray-50 w-full">
      {renderContent()}
    </div>
  );
};

export default UserPosts;
