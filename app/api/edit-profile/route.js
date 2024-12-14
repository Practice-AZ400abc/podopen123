import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return new Response(JSON.stringify({ message: "Email is required." }), { status: 400 });
        }

        await connectToDB();

        const targetUser = await User.findOne({ email });
        if (!targetUser) {
            return new Response(JSON.stringify({ message: "User not found." }), { status: 404 });
        }

        if (targetUser.role === "Seeker") {
            const { avatarURL, companyName, websiteURL } = body;

            if (!avatarURL || !companyName || !websiteURL) {
                return new Response(
                    JSON.stringify({ message: "Avatar URL, company name, and website URL are required." }),
                    { status: 400 }
                );
            }

            targetUser.avatarURL = avatarURL;
            targetUser.companyName = companyName;
            targetUser.websiteURL = websiteURL;
            targetUser.completedProfile = true;

            await targetUser.save();
        }

        if (targetUser.role === "Investor") {
            console.log(body)
            const {
                avatarURL,
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