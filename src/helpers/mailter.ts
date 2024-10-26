/* eslint-disable @typescript-eslint/no-unused-vars */

import nodemailer from "nodemailer";
import User from "@/models/userModel";
export const sendEmail = async ({email, emailType, userId}: {email: string, emailType: string, userId: string}) => {
   try {

        const token = crypto.randomUUID();

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        verifyToken: token,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                }
            );
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        forgotPasswordToken: token,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: parseInt(process.env.MAILTRAP_PORT || '2525', 10),
            secure: false, // Use TLS
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        const mailOptions = {
            from: "raghavsingla.college@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${token}
            </p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

   } catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
   }
};
