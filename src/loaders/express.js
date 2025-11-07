import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'
import helmet from 'helmet'
// import geoip from 'geoip-lite'


import userRoute from "../components/user/user.route.js";
import gameRoute from "../components/game/game.route.js";
import sliderRoute from "../components/slider/slider.route.js";

export default (app) => {

	// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
	app.use(helmet())

	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors())

	// Middleware that transforms the raw string of req.body into json
	app.use(express.json({ limit: '5mb' }))

	// Middleware that transforms the query string into json
	app.use(express.urlencoded({ limit: '5mb', extended: true }))

	// Load API routes
	app.use('/v1/user', userRoute);
	app.use('/v1/game', gameRoute);
	app.use('/v1/slider', sliderRoute);

	// For testing backend is working or not
	app.get('/test', (req, res) => {
		res.send('XeSports backend connected successfully')
	})

	// for logger
	// app.set('buildLoggerObject', (module, type, req) => {
	// 	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	// 	const geo = geoip.lookup(ip)
	// 	return {
	// 		module,
	// 		type,
	// 		source: req.query?.source || 'website',
	// 		userAgent: req.get('User-Agent'),
	// 		ip,
	// 		location: {
	// 			country: geo?.country,
	// 			region: geo?.region,
	// 			city: geo?.city
	// 		}
	// 	}
	// })
}
