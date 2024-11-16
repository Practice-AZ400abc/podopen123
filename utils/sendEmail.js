import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '@/models/user';
import { connectToDB } from '@/utils/database';
import dotenv from 'dotenv'
dotenv.config()

export async function sendEmail({ email, userId, emailType }) {
    try {
        await connectToDB();
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

        const updateField =
            emailType === 'verify'
                ? { emailVerificationToken: hashedToken, emailVerificationTokenExpires: tokenExpiry }
                : { passwordResetToken: hashedToken, passwordResetTokenExpires: tokenExpiry };

        await User.findByIdAndUpdate(userId, updateField);

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

        const url =
            emailType === 'verify'
                ? `${process.env.BASE_URL}/auth/verify-email?token=${hashedToken}`
                : `${process.env.BASE_URL}/auth/reset-password?token=${hashedToken}`;

        const subject =
            emailType === 'verify' ? 'Verify Your Email' : 'Reset Your Password';

        const html =
            emailType === 'verify'
                ? `<p>Please click the link below to verify your email:</p><a href="${url}">Verify Email</a>`
                : `<p>Please click the link below to reset your password:</p><a href="${url}">Reset Password</a>`;

        await transporter.sendMail({
            from: "looksvisa",
            to: email,
            subject,
            html,
        });

        console.log(`${emailType} email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}
