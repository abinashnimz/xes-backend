'use strict'
export default Object.freeze({
	MONGODB_URL: process.env.MONGODB_URI,
	APP_DEBUG: process.env.APP_DEBUG === 'true',
	PORT: process.env.PORT || 3009,
	RESPONSE: {
		ERROR: {
			STATUS: 500,
			MESSAGE: 'Internal server error'
		},
		BAD_REQUEST: {
			STATUS: 400,
		},
		OK: {
			STATUS: 200,
			MESSAGE: 'Success'
		},
		UNAUTHORIZED: {
			STATUS: 401,
		}
	},
	SALT_WORK_FACTOR: 12,
	JWT_SECRET: process.env.SECRET_KEY,
	SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
	SUPPORT_EMAIL_HEAD: process.env.SUPPORT_EMAIL_HEAD,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_KEY: process.env.SMTP_KEY,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_WEBSITE: process.env.SMTP_WEBSITE,
	BREVO_API_KEY: process.env.BREVO_API_KEY,
});