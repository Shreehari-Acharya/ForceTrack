import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email to the specified recipient using Resend.
 * @param {string} recipient - The email address of the recipient.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 * @throws {Error} - Throws an error if there is an issue sending the email.
 */
export async function sendEmail(recipient) {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: recipient,
            subject: "No submissions from past few days :(",
            html: `
        <h1>Hey there!</h1>
        <p>We noticed that you haven't made any submissions in the past few days. We hope everything is going well!</p>
        <p>If you have any questions or need assistance, feel free to reach out.</p>
        <p>Best regards,<br/>The TLE Team</p>
      `,
        });
        console.log(`Email sent to ${recipient} regarding inactivity.`);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error; 
    }
}