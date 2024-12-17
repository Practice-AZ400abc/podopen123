import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

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

        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return null;
    }
};

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { email } = body;
        const decodedToken = verifyToken(req);
        const user = decodedToken.user;

        if (!decodedToken) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        if (user.email !== email) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        if (!email) {
            return new Response(JSON.stringify({ message: "Email is required." }), { status: 400 });
        }

        await connectToDB();

        const targetUser = await User.findOne({ email });
        if (!targetUser) {
            return new Response(JSON.stringify({ message: "User not found." }), { status: 404 });
        }

        if (targetUser.role === "Visa Sponsoer") {
            console.log(body);
        }

        if (targetUser.role === "Visa Seeker") {
            const {
                avatarURL,
                websiteURL,
                cmopanyName,
                firstName,
                lastName,
                countryOfBirth,
                nationality,
                dualCitizenship,
                netWorth,
                liquidAssets,
                telegram,
                whatsapp,
                phone,
                industryToInvest,
                investmentAmount,
                countriesForVisa,
                relocationTimeframe,
                relocationCountry,
                canProvideLiquidityEvidence,
                instagram,
                linkedin,
                comments,
                isPublic,
            } = body;

            if (!firstName || !lastName || !netWorth || !investmentAmount || !industryToInvest || !countriesForVisa?.length) {
                return new Response(
                    JSON.stringify({
                        message: "Required fields are missing: first name, last name, net worth, investment amount, industry, or countries.",
                    }),
                    { status: 400 }
                );
            }

            // Update user profile fields
            targetUser.avatarURL = avatarURL || targetUser.avatarURL;
            targetUser.websiteURL = websiteURL;
            targetUser.companyName = cmopanyName;
            targetUser.firstName = firstName;
            targetUser.lastName = lastName;
            targetUser.countryOfBirth = countryOfBirth;
            targetUser.nationality = nationality;
            targetUser.dualCitizenship = dualCitizenship || false;
            targetUser.netWorth = netWorth;
            targetUser.liquidAssets = liquidAssets;
            targetUser.telegram = telegram;
            targetUser.whatsapp = whatsapp;
            targetUser.phone = phone;
            targetUser.industryToInvest = industryToInvest;
            targetUser.investmentAmount = investmentAmount;
            targetUser.countriesForVisa = countriesForVisa;
            targetUser.relocationTimeframe = relocationTimeframe;
            targetUser.relocationCountry = relocationCountry;
            targetUser.canProvideLiquidityEvidence = canProvideLiquidityEvidence || false;
            targetUser.instagram = instagram;
            targetUser.linkedin = linkedin;
            targetUser.comments = comments || "";
            targetUser.isPublic = isPublic || false;
            targetUser.completedProfile = true;

            await targetUser.save();
        }

        return new Response(
            JSON.stringify({ message: "Profile updated successfully.", user: targetUser }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(
            JSON.stringify({ message: "An error occurred while updating the profile." }),
            { status: 500 }
        );
    }
};