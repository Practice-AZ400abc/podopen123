import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ fromEmail, to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${fromEmail}" <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error("Email delivery failed.");
  }
};

export const sendActionEmail = async (email, action, token) => {
  const baseUrl = process.env.APP_BASE_URL;
  const actionUrls = {
    verify: `${baseUrl}/verify-email?token=${token}`,
    reset: `${baseUrl}/reset-password?token=${token}`,
  };

  const actionDetails = {
    verify: {
      subject: "Verify Your Email Address",
      html: `
        <h1>Welcome!</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${actionUrls.verify}" style="padding: 10px; color: white; background-color: blue; text-decoration: none;">Verify Email</a>
        <p>If you didn’t request this, you can ignore it.</p>
      `,
    },
    reset: {
      subject: "Reset Your Password",
      html: `
        <h1>Password Reset</h1>
        <p>We received a request to reset your password. Click the link below to proceed:</p>
        <a href="${actionUrls.reset}" style="padding: 10px; color: white; background-color: red; text-decoration: none;">Reset Password</a>
        <p>If you didn’t request this, you can ignore it.</p>
      `,
    },
  };

  const { subject, html } = actionDetails[action];

  return await sendEmail({
    fromEmail: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
};
