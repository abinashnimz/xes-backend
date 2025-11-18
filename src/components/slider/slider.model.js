import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const SliderSchema = new Schema(
	{
		name: String,
		imageDesktop: String,
		imageMobile: String,
		isDraft: { type: Boolean, default: true },
		redirectionLink: String,
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	{
		timestamps: true,
		collection: 'Slider'
	}
);

const Slider = model('Slider', SliderSchema);
export default Slider;