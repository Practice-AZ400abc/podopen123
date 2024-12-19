import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import jwt from 'jsonwebtoken'

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

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { email } = body;
        const user = verifyToken(req);

        if (!user) {
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

        if (targetUser.role === "Visa Sponsor") {
            console.log(body);
        }

        if (targetUser.role === "Visa Seeker") {
            const {
                avatarURL,
                websiteURL,
                companyName,
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

            targetUser.avatarURL = avatarURL;
            targetUser.websiteURL = websiteURL;
            targetUser.companyName = companyName;
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
            targetUser.comments = comments;
            targetUser.isPublic = isPublic || true;
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