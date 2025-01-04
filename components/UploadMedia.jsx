import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const MediaUpload = ({ onChange, onRemove, value, acceptedFormats }) => {
  const onUpload = (result) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 w-fit flex flex-wrap items-center justify-center gap-4 border p-3 rounded-[10px]">
        {value.map((url) => (
          <div key={url} className="relative rounded-[10px] w-[40px] h-[40px]">
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
            {acceptedFormats.includes("pdf") && url.endsWith(".pdf") ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="block">
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
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          resourceType={acceptedFormats.includes("pdf") ? "raw" : "image"}
          onUpload={onUpload}
        >
          {({ open }) => {
            return (
              <Button
                type="button"
                onClick={() => open()}
                className="w-[200px] h-[200px] bg-gray-100 text-black hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default MediaUpload;
