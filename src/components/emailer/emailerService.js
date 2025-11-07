import nodemailer from 'nodemailer';
import constant from '../../constant.js';



// export const sendEmailVerificationMail = (username, token, email) => {
// 	ejs.renderFile(`${__dirname}/templates/playtonia-mail-new.ejs`, {
// 		username,
// 		verificationLink: `${process.env.FRONTEND_URL}verify/email?token=${token}`
// 	}, (err, html) => {
// 		if (!err) {
// 			sendMail({
// 				to: email,
// 				subject: 'Verify your email address.',
// 				html
// 			})
// 		}
// 	})
// }


export const sendEmailVerificationMail = (username, token, email) => {

    console.log("sendEmailVerificationMail working");
    const verificationLink = `${process.env.FRONTEND_URL}/verify/email?token=${token}`

    const html = `
    <p>Hi ${username},</p>
    <p>Thank you for registering XeSports Platform. Please verify your email by clicking the link below:</p>
    <p><a href="${verificationLink}" target="_blank">Verify Email</a></p>
    <p>If you did not create this account, please ignore this email.</p>
  `

    sendMail({
        to: email,
        subject: 'Verify your email address',
        html
    })
}



export const sendMail = (mailObject, index) => {
    console.log("sendEmail working");
    console.log(`smtp website: ${constant.SMTP_WEBSITE}`);
    console.log(`support email: ${constant.SUPPORT_EMAIL}`);
    console.log(`smtp host: ${constant.SMTP_HOST}`);
    console.log(`smtp port: ${constant.SMTP_PORT}`);
    console.log(`smtp user: ${constant.SMTP_USER}`);
    console.log(`smtp key: ${constant.SMTP_KEY}`);
    console.log(`Email HEAD: ${constant.SUPPORT_EMAIL_HEAD}`);


    const transporter = nodemailer.createTransport({
        name: constant.SMTP_WEBSITE,
        host: constant.SMTP_HOST,
        port: constant.SMTP_PORT,
        secure: false,
        auth: {
            user: constant.SMTP_USER,
            pass: constant.SMTP_KEY
        }
    })
    const mailOptions = {
        from: `${constant.SUPPORT_EMAIL_HEAD} ${constant.SUPPORT_EMAIL}`,
        ...mailObject
    }
    // eslint-disable-next-line no-unused-vars
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('mail error', index, info, error)
        }
        else {
            console.log('email send successfully', index)
        }
    })
}


/* 

During user registration, an email verification link is sent with a frontend URL prefix instead of directly linking to a backend API route to improve user experience, security, and flow control.

Here's why the frontend URL is used in the verification link, even though the actual verification logic happens via backend API:

User Experience: When users click the verification link in their email, they land on a friendly frontend page (website or app) that shows verification status, instructions, or any UI feedback. This is smoother and more user-friendly than hitting a raw backend API endpoint and seeing a bare response.

Frontend-Backend Separation: The frontend extracts the verification parameters (like user ID, token, signature) from the URL query string and then calls the backend API securely to perform the actual verification of the user’s email. This keeps presentation concerns separate from business logic.

Security and State Management: The backend’s verification API is protected (e.g., signed URLs, throttle limits) and expects validation tokens. By routing through the frontend, you can also trigger additional frontend actions like login, user session updates, or redirections after backend confirmation.

Better Control: The frontend can handle invalid tokens, expired links, or errors more gracefully by showing custom messages or retry options instead of exposing raw backend API responses to the user.

Consistent URL Structure for Users: Users see your application's domain in the link, making it more trustworthy and consistent, rather than exposing backend server URLs that might change or be less user-friendly.

In summary, the email contains a verification URL pointing to the frontend app, which then calls the backend API route to verify the email programmatically. This approach is common in modern web apps to provide a smooth, secure, and user-friendly verification flow



*/
