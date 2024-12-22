import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const verifyToken = (req) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            throw new Error("No authorization header");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("No token provided");
        }

        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return null;
    }
};

export default verifyToken;
