"use client";
import { AddPostApiResponse, useAddPostMutation } from "@/features/api/postApi";
import { selectUser } from "@/features/user/userSlice";
import postSchema, { PostData } from "@/validators/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import MentionsMenu from "../MentionsMenu/MentionsMenu";
import Spinner from "../Spinner/Spinner";

const AddPost = () => {
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [addPost] = useAddPostMutation();
  const user: User | null = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { isSubmitting, errors, isValid, isValidating },
  } = useForm<PostData>({
    defaultValues: {
      content: "",
      location: "",
      media: undefined,
    },
    resolver: zodResolver(postSchema),
  });

  const handleAddPost = async (values: PostData) => {
    try {
      const formData = new FormData();

      if (values.content) formData.append("content", values.content);
      if (values.location) formData.append("location", values.location);

      if (
        selectedMentions &&
        Array.isArray(selectedMentions) &&
        selectedMentions.length > 0
      ) {
        selectedMentions.forEach((mention) => {
          formData.append("mentions[]", mention);
        });
      }

      if (hashtags && hashtags.length > 0) {
        hashtags.forEach((hashtag) => {
          formData.append("hashtags[]", hashtag);
        });
      }

      if (values.media && values.media instanceof FileList) {
        Array.from(values.media).forEach((file) => {
          const typedFile = file as File;
          formData.append("media", typedFile);
        });
      }

      const { data, error } = await addPost(formData);

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as AddPostApiResponse;

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
        reset();
        setMediaPreview([]);
        setSelectedMentions([]);
        setHashtags([]);

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

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    clearErrors();
    if (files) {
      setValue("media", files);
      setMediaPreview((prev) => [
        ...prev,
        ...Object.values(files).map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleClearMedia = (): void => {
    setValue("media", undefined);
    setMediaPreview([]);
  };

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const words = inputValue.split(" ");

    const validHashtags = words
      .map((word) => word.trim())
      .filter((word) => word.startsWith("#") && word.length > 1)
      .map((word) => {
        return word.replace(/[^A-Za-z0-9_#]/g, "");
      });
    setHashtags(validHashtags);
  };

  const handleRemoveHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter((tag) => tag !== hashtag));
  };

  useEffect(() => {
    return () => {
      mediaPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaPreview]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-full">
          <Image
            src={user?.profilePicture || "/images/default-profile.jpg"}
            alt="avatar"
            height={40}
            width={40}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <form
          onSubmit={handleSubmit(handleAddPost)}
          className="flex flex-1 flex-col"
        >
          <textarea
            className="bg-gray-100 rounded-b-none flex-1 min-h-24 resize-none p-2 px-4 outline-none rounded-lg placeholder:font-semibold"
            placeholder="What's happening?"
            {...register("content")}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a hashtag (e.g. #Travel)"
              className="bg-gray-100 text-xs text-gray-500 p-2 rounded-lg w-full outline-none rounded-t-none"
              onChange={handleHashtagChange}
            />
          </div>

          {mediaPreview.length > 0 && (
            <div className="flex my-3">
              <div className="flex gap-2">
                {mediaPreview.map((preview: string) => {
                  return (
                    <Image
                      key={preview}
                      src={preview}
                      alt="preview"
                      height={60}
                      width={60}
                      className="rounded-lg"
                    />
                  );
                })}
              </div>

              <span
                onClick={handleClearMedia}
                className="flex text-xl h-max ml-3 cursor-pointer"
                title="Clear Media"
                aria-label="Clear Media"
              >
                <IoIosCloseCircle />
              </span>
            </div>
          )}

          {hashtags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {hashtags.map((hashtag) => (
                <div
                  key={hashtag}
                  className="flex items-center bg-blue-500 text-white p-1 rounded-lg"
                >
                  <span className="text-xs">{hashtag}</span>
                  <span
                    onClick={() => handleRemoveHashtag(hashtag)}
                    className="ml-2 text-xs cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex mt-2 justify-between items-center">
            <div className="flex gap-3">
              <MentionsMenu
                selectedMentions={selectedMentions}
                setSelectedMentions={setSelectedMentions}
              />

              <label
                htmlFor="media"
                className="flex relative bg-gray-100 cursor-pointer p-2 rounded-lg"
              >
                <GrAttachment />
                {mediaPreview.length > 0 && (
                  <span className="absolute bg-blue-500 text-white -top-1 -right-1 h-4 w-4 rounded-full flex text-[10px] items-center justify-center">
                    {mediaPreview.length}
                  </span>
                )}
              </label>
              <input
                type="file"
                multiple={true}
                id="media"
                className="hidden"
                onChange={handleMediaChange}
              />
            </div>

            <div className="flex">
              <button
                disabled={!isValid || isSubmitting || isValidating}
                type="submit"
                className="w-20 h-10 disabled:bg-gray-400 flex items-center justify-center bg-[var(--secondary)] text-lg font-bold rounded-lg text-white"
              >
                {isSubmitting ? <Spinner variant={null} /> : "Post"}
              </button>
            </div>
          </div>

          {errors.content && (
            <p className="text-red-500 text-xs mt-2">
              {errors.content.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPost;
