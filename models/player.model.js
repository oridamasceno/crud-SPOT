const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const playerSchema = mongoose.Schema({

    id: {
        type: String,
        unique: true,
        default: () => uuidv4(), // UUIDV4 para o id. único
    },

    // player's info
    name: {
        type: String,
        required: [true, "Please enter the player's name"]
    },

    nickname: {
        type: String,
    },

    creationDate: {
        type: Date,
        required: [true, "Please enter the player's creation date"],
        default: Date.now,
    },

    // player's skills
    skills: {
        strength: { type: Number, min: 0, max: 10, default: 0, required: true },
        speed: { type: Number, min: 0, max: 10, default: 0, required: true },
        drible: { type: Number, min: 0, max: 10, default: 0 }
    },
},
    {
        timestamps: true,
    }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;