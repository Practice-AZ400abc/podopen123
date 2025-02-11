import { auth } from "@/app/firebase/firebaseAdminConfig";
import verifyToken from "@/utils/verifyToken";

export const POST = async (req) => {
    const admin = verifyToken(req);
    const body = await req.json();
    const { password } = body;

    if (!admin || admin.role !== "Admin") {
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        })
    }

    try {
        const adminRecord = auth.getUserByEmail(admin.email);

        await auth.updateUser(adminRecord.uid, { password });

        return new Response(JSON.stringify({ message: "Password updated successfully" }), {
            status: 200,
        })
    } catch (error) {
        console.error("Error resetting password:", error);
        return new Response(JSON.stringify({ message: "An error occured" }), {
            status: 500,
        });
    }
}