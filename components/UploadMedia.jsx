"use client";

import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const MediaUpload = ({ onChange, onRemove, value }) => {
  const handleUpload = async (file) => {

    if (value.length >= 3) {
      toast.error("You can upload a maximum of 3 attachments.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      const uploadedFileUrl = data.secure_url;

      onChange(uploadedFileUrl);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div>
      <div className="mb-4 w-fit flex flex-wrap items-center justify-center gap-4 border p-3 rounded-[10px]">
        {/* Render Uploaded Media */}
        {value.map((url) => (
          <div
            key={url}
            className="relative rounded-[10px] w-[100px] h-[100px]"
          >
            {/* Remove Button */}
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-blue-500 hover:bg-blue-200 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {/* Show PDF or Image */}
            {url.endsWith(".pdf") ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gray-100 w-[100px] h-[100px] flex items-center justify-center">
                  PDF
                </div>
              </a>
            ) : (
              <Image
                src={url}
                alt="media"
                width={100}
                height={100}
                className="object-cover rounded-[10px] w-[100px] h-[100px]"
              />
            )}
          </div>
        ))}
        {/* Upload Button */}
        <Button
          type="button"
          className="w-[200px] h-[200px] bg-gray-100 text-black hover:bg-gray-50"
        >
          <label htmlFor="file-upload" className="cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            <input
              id="file-upload"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </Button>
      </div>
    </div>
  );
};

export default MediaUpload;
