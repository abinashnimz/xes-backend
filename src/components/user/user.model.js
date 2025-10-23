import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const UserSchema = new Schema({
    username: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: String,
    firstName: String,
    lastName: String,
    aboutMe: String,
    phone: String,
    country: String,
    countryCode: String,
    city: String,
    profileImage: String,
    coverImage: String,
    dob: Date,
    registeredVia: String,
    facebookSocial: Object,
    googleSocial: Object,
    steamSocial: Object,
    discordSocial: Object,
    gameIds: [{
        _id: false,
        game: { type: Schema.Types.ObjectId, ref: 'Game' },
        gameId: String,
        gameIgn: String
    }],
    currency: Object,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    metaData: Object,
    subscriptionStatus: Object,
    rewards: Object,
    friendList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    blocklist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isVerified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    accessList: { type: Schema.Types.ObjectId, ref: 'User' },
    isPrivate: { type: Boolean, default: false }
},
{
		timestamps: true,
		collection: 'User'
})

const User = model('User', UserSchema)
export default User