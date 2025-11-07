import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const GameSchema = new Schema(
	{
		name: String,
		shortName: { type: String, unique: true },
		gameIdTag: String,
		isIdRequired: Boolean,
		gameIgnTag: String,
		isIgnRequired: Boolean,
		allowedModes: [
            {
                type : String,
                enum : ['duelTeam', 'duelSolo', 'battleRoyaleSolo', 'battleRoyaleTeam'],
                required : true
            }
        ],
		isTeamCreationAllowed: Boolean,
		maxTeamMemberCount: Number,
		thumbnail: String,
		backgroundImage: String,
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	{
		timestamps: true,
		collection: 'Game'
	}
)

const Game = model('Game', GameSchema)
export default Game