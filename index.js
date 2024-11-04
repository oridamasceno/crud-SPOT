require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const setupSwagger = require('./config/swagger.js');
const playerRoute = require("./routes/player.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

// swagger config
setupSwagger(app);

// routes
app.use("/api/players", playerRoute);

app.get('/', (req, res) => {
    res.send("Server is on!");
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to the database!");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection failed!", error);
    });