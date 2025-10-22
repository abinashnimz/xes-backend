import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';

export default (app) => {
	expressLoader(app)
	mongooseLoader()
}