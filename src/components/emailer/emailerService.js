import brevo from "@getbrevo/brevo";
import constant from "../../constant.js";


const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  constant.BREVO_API_KEY
);

/**
 * Send generic email using Brevo API
**/
export const sendMail = async (mailObject) => {
  try {
    console.log("📨 sendEmail working (via Brevo API)");

    const emailData = {
      sender: {
        email: constant.SUPPORT_EMAIL, // e.g., support@xesports.pro
        name: constant.SUPPORT_EMAIL_HEAD || "XeSports Team"
      },
      to: [{ email: mailObject.to }],
      subject: mailObject.subject,
      htmlContent: mailObject.html
    };

    const result = await apiInstance.sendTransacEmail(emailData);
    console.log(`sendMail Result: ${result}`);
    console.log("✅ Email sent successfully:", result.messageId || result);
    return true;
  } catch (error) {
    console.error("❌ Brevo mail error:", error.response?.text || error);
    return false;
  }
};

/**
 * Send verification email
 */
export const sendEmailVerificationMail = async (username, token, email) => {
  console.log("📧 sendEmailVerificationMail working");

  const verificationLink = `${process.env.FRONTEND_URL}/verify/email?token=${token}`;
  const html = `
    <p>Hi ${username},</p>
    <p>Thank you for registering on XeSports Platform. Please verify your email by clicking below:</p>
    <p><a href="${verificationLink}" target="_blank">Verify Email</a></p>
    <p>If you did not create this account, please ignore this email.</p>
  `;

  await sendMail({
    to: email,
    subject: "Verify your email address",
    html
  });
};

export const sendPasswordRecoveryMail = async (username, token, email) => {
  console.log("📧 sendPasswordRecoveryMail working");

  const verificationLink = `${process.env.FRONTEND_URL}/reset/password?token=${token}`;
  const html = `
    <p>Hi ${username},</p>
    <p>Please click the below link to reset your Password:</p>
    <p><a href="${verificationLink}" target="_blank">Verify Email</a></p>
    <p>If you did not create this account, please ignore this email.</p>
  `;

  await sendMail({
    to: email,
    subject: "XESPORTS - Reset Your Password",
    html
  });
};