import {
  StoryApiResponse,
  useAddToStoryMutation,
} from "../../features/api/storyApi";
import { Dialog, Portal, Textarea } from "@chakra-ui/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import React, { JSX, useRef, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

type AddStoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddStoryModal = ({
  isOpen,
  onClose,
}: AddStoryModalProps): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [storyMedia, setStoryMedia] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [addStory] = useAddToStoryMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
      setStoryMedia(file);

      if (file.type.startsWith("image")) {
        setFileType("image");
      } else if (file.type.startsWith("video")) {
        setFileType("video");
      } else {
        setFileType(null);
        setFilePreview(null);
      }
    }
  };

  const handleAddToStory = async (): Promise<void> => {
    try {
      if (!storyMedia) {
        toast.error("Please upload an image or video.", {
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
      const formData: FormData = new FormData();
      formData.append("storyMedia", storyMedia);
      formData.append("caption", caption);

      setLoading(true);
      const { data, error } = await addStory(formData);
      setLoading(false);

      reset();
      onClose();

      if (error) {
        const errorResponse = error as FetchBaseQueryError;
        const parsedError = errorResponse?.data as StoryApiResponse;

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
      } else if (data) {
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
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.", {
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const reset = () => {
    setFilePreview(null);
    setFileType(null);
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          reset();
          onClose();
        }
      }}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="max-w-[400px] w-full rounded-2xl shadow-xl bg-white p-2">
            <Dialog.Body className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Add a Story
              </h2>

              <div
                onClick={triggerFileInput}
                className="border-2 w-full border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-400 transition-colors flex justify-center items-center min-h-[180px] bg-gray-50 overflow-hidden"
              >
                {filePreview ? (
                  fileType === "image" ? (
                    <Image
                      src={filePreview}
                      alt="Preview"
                      height={210}
                      width={210}
                      className="h-52 w-full rounded-md object-cover"
                    />
                  ) : fileType === "video" ? (
                    <video
                      src={filePreview}
                      controls
                      className="h-52 rounded-md"
                    />
                  ) : (
                    <p className="text-red-500">Unsupported file type</p>
                  )
                ) : (
                  <div>
                    <p className="text-gray-500">Click to upload</p>
                    <p className="text-sm text-gray-400">Image or Video</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <Textarea
                placeholder="Write a caption..."
                className="w-full resize-none mt-6 p-2 outline-none bg-gray-100"
                rows={3}
                onChange={(e) => setCaption(e.target.value)}
              />

              <button
                disabled={!storyMedia}
                onClick={handleAddToStory}
                className="flex disabled:bg-gray-400 cursor-pointer bg-[var(--secondary)] mt-8 h-10 w-24 items-center justify-center text-white font-semibold rounded-lg"
              >
                {loading ? <Spinner variant={null} /> : "Share Story"}
              </button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddStoryModal;
