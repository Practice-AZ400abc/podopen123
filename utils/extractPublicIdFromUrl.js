const extractPublicIdFromUrl = (url) => {
    try {
        const parts = url.split("/");

        const publicIdWithExtension = parts.pop();
        const publicId = publicIdWithExtension.split(".")[0]; 

        return publicId;
    } catch (error) {
        throw new Error("Invalid Cloudinary URL format");
    }
};

export default extractPublicIdFromUrl;
