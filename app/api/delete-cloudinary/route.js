import deleteFromCloudinary from "@/utils/deleteFromCloudinary";

export const DELETE = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const publicId = searchParams.get("publicId");

        if (!publicId) {
            return new Response(JSON.stringify({ message: "Public ID is required" }), {
                status: 400,
            });
        }

        const result = await deleteFromCloudinary(publicId);

        return new Response(JSON.stringify({ message: "Deleted from Cloudinary", result }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
        });
    }
};
