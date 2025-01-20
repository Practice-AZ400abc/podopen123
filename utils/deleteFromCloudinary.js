import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.api.delete_resources([publicId]);
        return result;
    } catch (error) {
        throw new Error(`Cloudinary deletion failed: ${error.message}`);
    }
};

export default deleteFromCloudinary;
