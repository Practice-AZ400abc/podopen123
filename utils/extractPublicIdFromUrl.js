const extractPublicIdFromUrl = (url) => {
    try {
        const parts = url.split("/");
        const publicIdWithExtension = parts.slice(-1)[0];
        const publicId = publicIdWithExtension.split(".")[0];
        const folderPath = parts.slice(parts.indexOf("upload") + 1, -1).join("/");
        return folderPath ? `${folderPath}/${publicId}` : publicId;
    } catch (error) {
        throw new Error("Invalid Cloudinary URL");
    }
};

export default extractPublicIdFromUrl;