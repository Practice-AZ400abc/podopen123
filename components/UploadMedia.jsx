import { Plus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";

const UploadMedia = ({ formData, setFormData }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        console.log("Selected file:", file);

        // Upload file to Cloudinary
        try {
            setUploading(true);

            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("upload_preset", "lookvisa");
            uploadData.append("cloud_name", "dqayy79ql");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dqayy79ql/image/upload",
                {
                    method: "POST",
                    body: uploadData,
                }
            );

            const data = await response.json();

            if (data.secure_url) {
                console.log("Uploaded file URL:", data.secure_url);

                // Update formData state with the new URL
                setFormData((prev) => ({
                    ...prev,
                    images: [...(prev.images || []), data.secure_url],
                }));
            } else {
                console.error("Failed to upload image:", data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex">
            <div className="bg-gray-200 w-fit p-6 rounded-md">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-button"
                />
                <label htmlFor="upload-button" className="cursor-pointer flex items-center gap-2">
                    <Plus size={20} />
                    {uploading ? "Uploading..." : "Upload"}
                </label>
            </div>
            <div>
                {formData.images.length > 0 ? (
                    formData.images.map((image, index) => (
                        <Image
                            key={index}
                            className="object-cover rounded-md w-32 h-32"
                            src={image}
                            width={"100"}
                            height={"100"}
                            alt={`Preview ${index + 1}`}
                        />
                    ))
                ) : (
                    <p>No images to display</p>
                )}
            </div >
        </div>
    );
};

export default UploadMedia;
