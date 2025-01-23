import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ fromEmail, to, subject, html, attachments }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${fromEmail}" <${fromEmail}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error("Email delivery failed.");
  }
};

export const sendActionEmail = async (email, action, token, visaSponsorData) => {
  const baseUrl = process.env.APP_BASE_URL;
  const actionUrls = {
    verify: `${baseUrl}/verify-email?token=${token}`,
    reset: `${baseUrl}/reset-password?token=${token}`,
    listingCreated: `${baseUrl}/manage-listing`,
  };

  const actionDetails = {
    verify: {
      subject: "Lookvisa: Please Verify Your Email Address",
      html: `
      <div style="font-family: Arial, sans-serif; margin: 0 auto; padding: 20px; max-width: 600px; background-color: #022150">
       
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 20px; text-align: center; color: #ffffff;">
              <img src="cid:logo" alt="Lookvisa Logo" style="max-width: 150px; margin-bottom: 20px;" />
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Welcome to <span style="color: #60a5fa;">Lookvisa</span></h1>
              <p>Thanks for signing up!</p>
              <hr>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; width: 100%; ">
              <p style="color: white; font-weight: 600;">Before you continue please verify your email</p>

              <p style="margin: 10; color: white; text-size-adjust: 10px;">Click the link below to verify your email address:</p>
                <a href="${actionUrls.verify}" style="margin: 16px 0; color: #ffffff; 
               font-weight: 600; background-color: #3b82f6; padding: 10px 20px;margin-top: 20px; border-radius: 5px;">Verify Email</a>
                <p style="font-size: 16px; line-height: 1.6; color: white; margin-top: 50px;">Best regards, <br /> Lookvisa Team</p>
                <p style=" margin-top: 50px; color: white;">If you did not create an account using this address, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; text-align: center; color: #ffffff;">
              <p>If you have any questions, feel free to contact us at <a href="mailto:info@lookvisa.com" style="color: #3b82f6; text-decoration: none;">info@lookvisa.com</a></p>

             
              
            </td>
          </tr>
          <tr>
            <td style="background-color: #1e293b; padding: 10px 20px; text-align: center; color: #fff; font-size: 12px;">
              &copy; 2024 Lookvisa, All Rights Reserved
            </td>
          </tr>
        </table>
      </div>

      `,
      attachments: [
        {
          filename: "Lookvisa.png",
          path: path.resolve("./app/Lookvisa.png"),
          cid: "logo",
        },
      ],
    },
    reset: {
      subject: "LookVisa: Reset your password",
      html: `
         <div style="font-family: Arial, sans-serif; margin: 0 auto; padding: 20px; max-width: 600px; background-color: #022150">
       
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 20px; text-align: center; color: #ffffff;">
              <img src="cid:logo" alt="Lookvisa Logo" style="max-width: 150px; margin-bottom: 20px;" />
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;"> <span style="color: #60a5fa;">Lookvisa</span></h1>
              <p>Password Reset</p>
              <hr>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; width: 100%; text-align: center; ">
              <p style="color: white; font-weight: 600;">If you've lost your password or wish to reset it</p>

              <p style="margin: 10; color: white; text-size-adjust: 10px;">use the link below to get started</p>
              <a href="${actionUrls.reset}" style=" padding: 10px; color: white; background-color: #3b82f6; text-decoration: none;">Reset Password</a>
               
                <p style=" margin-top: 50px; color: white; line-height: 40px; text-align: 15px;">If you did not request a  password reset. You can safely ignore this email. Only a person with your email can reset this password</p>
            </td>
          </tr>
         
        </table>
      </div>
      `,
      attachments: [
        {
          filename: "Lookvisa.png",
          path: path.resolve("./app/Lookvisa.png"),
          cid: "logo",
        },
      ],
    },
    listingCreated: {
      subject: "Lookvisa: Your Listing Has Been Created Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; margin: 0 auto; padding: 20px; max-width: 600px; background-color: #022150">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; text-align: center; color: #ffffff;">
                <img src="cid:logo" alt="Lookvisa Logo" style="max-width: 150px; margin-bottom: 20px;" />
                <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Your Listing Has Been Created</h1>
                <p>Congratulations! Your new listing is live on Lookvisa.</p>
                <hr>
              </td>
            </tr>
            <tr>
             
            </tr>
            <tr>
              <td style="padding: 20px 30px; text-align: center; color: #ffffff;">
                <p>If you have any questions, feel free to contact us at <a href="mailto:info@lookvisa.com" style="color: #3b82f6; text-decoration: none;">info@lookvisa.com</a></p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #1e293b; padding: 10px 20px; text-align: center; color: #fff; font-size: 12px;">
                &copy; 2024 Lookvisa, All Rights Reserved
              </td>
            </tr>
          </table>
        </div>
      `,
      attachments: [
        {
          filename: "Lookvisa.png",
          path: path.resolve("./app/Lookvisa.png"),
          cid: "logo",
        },
      ],
    },
    contactedByVisaSponsor: {
      subject: "Lookvisa: Your profile was viewed by a visa sponsor",
      html: `Your profile was viewed by ${visaSponsorData.firstName} ${visaSponsorData.lastName} and they want to contact you, you can contact them through the following email: ${visaSponsorData.contactEmail}`,
      attachments: [
        {
          filename: "Lookvisa.png",
          path: path.resolve("./app/Lookvisa.png"),
          cid: "logo",
        },
      ],
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
