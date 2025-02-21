"use client";
import { AddPostApiResponse, useAddPostMutation } from "@/features/api/postApi";
import postSchema, { PostData } from "@/validators/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";
import { IoIosCloseCircle } from "react-icons/io";
import MentionsMenu from "../MentionsMenu/MentionsMenu";
import Spinner from "../Spinner/Spinner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Bounce, toast } from "react-toastify";

interface BlobFile extends Blob {
  readonly name: string;
  readonly lastModified: number;
  readonly lastModifiedDate: Date;
}

const AddPost = () => {
  const [selectedMentions, setSelectedMentions] = useState<string[]>([]);
  const [mediaPreview, setMediaPreview] = useState<string[]>([]);
  const [addPost] = useAddPostMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
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

      formData.append("content", values.content);
      if (values.location) formData.append("location", values.location);

      if (selectedMentions && selectedMentions.length > 0) {
        selectedMentions.forEach((mention) => {
          formData.append("mentions", mention);
        });
      }

      if (values.media && values.media instanceof FileList) {
        Array.from(values.media).forEach((file, index) => {
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
    if (files) {
      setValue("media", files);
      Object.values(files).map((file: File) =>
        setMediaPreview((prev) => [...prev, URL.createObjectURL(file)])
      );
    }
  };

  const handleClearMedia = (): void => {
    setValue("media", undefined);
    setMediaPreview([]);
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-full">
          <Image
            src={
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
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
            className="bg-gray-100 flex-1 min-h-24 resize-none p-2 px-4 outline-none rounded-lg placeholder:font-semibold"
            placeholder="What's happening?"
            {...register("content")}
          />

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
              >
                <IoIosCloseCircle />
              </span>
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
                disabled={isSubmitting}
                type="submit"
                className="w-20 h-10 flex items-center justify-center bg-[var(--secondary)] text-lg font-bold rounded-lg text-white"
              >
                {isSubmitting ? <Spinner variant={null} /> : "Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
