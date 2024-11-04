const Player = require('../models/player.model');

// get all players with basic and specific info
const getPlayers = async (req, res) => {
    const { page = 1, limit = 10, name, nickname, id } = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    const filter = {};
    if (name) {
        filter.name = new RegExp(name, 'i'); // insensitive to case
    }
    if (nickname) {
        filter.nickname = new RegExp(nickname, 'i');
    }
    // id search if specified
    if (id) {
        filter._id = id;
    }

    try {
        // get total number of players for the current filter
        const total = await Player.countDocuments(filter);

        // check if there are at least 10 players
        if (total < 10) {
            return res.status(400).json({ message: "Minimum of 10 players required." });
        }

        // search with filters, with pagination and selection of specific fields
        const players = await Player.find(filter)
            .limit(options.limit)
            .skip((options.page - 1) * options.limit)
            .select('id name nickname creationDate'); // select only the fields we want to return

        res.status(200).json({
            total,
            page: options.page,
            limit: options.limit,
            players,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a single player with all info
const getPlayer = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for player', error });
    }
};

// create a player
const createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update a player
const updatePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// delete a player
const deletePlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByIdAndDelete(id);

        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// rank players
const rankPlayers = async (req, res) => {
    try {
        const players = await Player.find(); // find all players

        // sort players based on their skill scores
        players.sort((a, b) => {
            const aSkills = a.skills || { strength: 0, speed: 0, drible: 0 };
            const bSkills = b.skills || { strength: 0, speed: 0, drible: 0 };

            const aSkillScore = aSkills.strength + aSkills.speed + aSkills.drible;
            const bSkillScore = bSkills.strength + bSkills.speed + bSkills.drible;

            return bSkillScore - aSkillScore; // descending order
        });

        res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ message: "Error searching for player", error });
    }
};


// division of players into teams
const divideTeams = async (req, res) => {
    const { playersPerTeam } = req.body; // the number of players per team

    if (!playersPerTeam || playersPerTeam <= 0) {
        return res.status(400).json({ message: "Please provide a valid number of players per team." });
    }

    try {
        const players = await Player.find();  // fetch all players

        if (players.length < 10) {
            return res.status(400).json({ message: "At least 10 players are required to form teams." });
        }

        // sort players based on skill combination, checking if skills exist
        players.sort((a, b) => {
            const aSkills = a.skills || {}; // default to an empty object if skills is undefined
            const bSkills = b.skills || {};

            const aSkillScore = (aSkills.strength || 0) + (aSkills.speed || 0) + (aSkills.drible || 0);
            const bSkillScore = (bSkills.strength || 0) + (bSkills.speed || 0) + (bSkills.drible || 0);

            return bSkillScore - aSkillScore; // sort in descending order of skill score
        });

        // divide players into teams
        const teams = [];
        for (let i = 0; i < players.length; i += playersPerTeam) {
            teams.push(players.slice(i, i + playersPerTeam));
        }

        res.status(200).json({ teams });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
    rankPlayers,
    divideTeams
};