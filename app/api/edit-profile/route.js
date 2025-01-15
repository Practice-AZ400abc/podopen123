import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import verifyToken from "@/utils/verifyToken";
import extractPublicIdFromUrl from "@/utils/extractPublicIdFromUrl";
import deleteFromCloudinary from "@/utils/deleteFromCloudinary";

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

        if (targetUser.avatarURL) {
            try {
                await deleteFromCloudinary(extractPublicIdFromUrl(targetUser.avatarURL));
            } catch (error) {
                console.error("Error deleting previous avatar from Cloudinary:", error);
            }
        }

        if (targetUser.role === "Visa Sponsor") {
            const {
                avatarURL,
                companyName,
                firstName,
                lastName,
                phone,
                telegram,
                whatsapp,
                contactEmail,
                countryLocation,
                investmentRole,
            } = body;

            targetUser.avatarURL = avatarURL;
            targetUser.companyName = companyName;
            targetUser.firstName = firstName;
            targetUser.lastName = lastName;
            targetUser.phone = phone;
            targetUser.telegram = telegram;
            targetUser.whatsapp = whatsapp;
            targetUser.contactEmail = contactEmail;
            targetUser.countryLocation = countryLocation;
            targetUser.investmentRole = investmentRole;
            targetUser.completedProfile = true;

            await targetUser.save();
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
                contactEmail,
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
            targetUser.dualCitizenship = dualCitizenship;
            targetUser.netWorth = netWorth;
            targetUser.liquidAssets = liquidAssets;
            targetUser.telegram = telegram;
            targetUser.whatsapp = whatsapp;
            targetUser.contactEmail = contactEmail;
            targetUser.phone = phone;
            targetUser.industryToInvest = industryToInvest;
            targetUser.investmentAmount = investmentAmount;
            targetUser.countriesForVisa = countriesForVisa;
            targetUser.relocationTimeframe = relocationTimeframe;
            targetUser.relocationCountry = relocationCountry;
            targetUser.canProvideLiquidityEvidence = canProvideLiquidityEvidence;
            targetUser.instagram = instagram;
            targetUser.linkedin = linkedin;
            targetUser.comments = comments;
            targetUser.isPublic = isPublic;
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