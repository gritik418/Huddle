import { Dialog, Portal, Textarea } from "@chakra-ui/react";
import React, { JSX, useRef, useState } from "react";
import AddStory from "../AddStory/AddStory";
import Image from "next/image";

const AddStoryModal = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);

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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger>
        <AddStory />
      </Dialog.Trigger>

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
                      className="h-52 rounded-md object-cover"
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
              />

              <div className="flex bg-[var(--secondary)] mt-8 p-2 text-white font-semibold rounded-lg">
                Share Story
              </div>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddStoryModal;
