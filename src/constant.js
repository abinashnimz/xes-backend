'use strict'
export default Object.freeze({
	MONGODB_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/xesports-api-services-test',
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
	JWT_SECRET: 'kgb7axy7rn0wux15axgx4anysereym20o7ia22fnx8e56lseym5reslv0oj5k1rzeeg',
});