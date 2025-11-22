import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const GamingFiestaSchema = new Schema({
    username: String,
    email: String,
    fullName: String,
    country: String,
    gameName: String,
    leaderboard: {
      type: [
        {
          week: Number,
          played: { type: Number, default: 0 },
          totalScore: { type: Number, default: 0 },
        },
      ],
      default: [
        { week: 1, played: 0, totalScore: 0 },
        { week: 2, played: 0, totalScore: 0 },
        { week: 3, played: 0, totalScore: 0 },
      ],
    }
},
    {
        timestamps: true,
        collection: 'Gamingfiesta'
});

const GamingFiesta = model('Gamingfiesta', GamingFiestaSchema);
export default GamingFiesta;