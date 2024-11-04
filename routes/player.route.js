const express = require("express")
const router = express.Router();
const { getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
    rankPlayers,
    divideTeams
} = require('../controllers/player.controller.js');


/**
 * @swagger
 * /api/players/rank:
 *   get:
 *     summary: Rank players by their skill score
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Returns a list of ranked players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       500:
 *         description: Server error
 */
router.get("/rank", rankPlayers);


/**
 * @swagger
 * /api/players:
 *   get:
 *     summary: List all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
router.get('/', getPlayers);


/**
 * @swagger
 * /api/players/{id}:
 *   get:
 *     summary: Search for a player by id
 *     tags: [Players]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The player id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found player data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Player not found
 */
router.get("/:id", getPlayer);


/**
 * @swagger
 * /api/players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Invalid request
 */
router.post("/", createPlayer);


/**
 * @swagger
 * /api/players/{id}:
 *   put:
 *     summary: Update an existing player
 *     tags: [Players]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The player id to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       404:
 *         description: Jogador não encontrado
 *       400:
 *         description: Requisição inválida
 */
// update a player
router.put("/:id", updatePlayer)


/**
 * @swagger
 * /api/players/{id}:
 *   delete:
 *     summary: Deletes a player
 *     tags: [Players]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The identifier of the player to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Player successfully deleted
 *       404:
 *         description: Player not found
 */
// delete a player
router.delete("/:id", deletePlayer);


/**
 * @swagger
 * /api/players/divide-teams:
 *   post:
 *     summary: "Divide Players into Teams"
 *     tags: [Players]
 *     description: |
 *       This endpoint allows you to divide players into teams based on their skills. You must specify the number of players per team in the request body. The division is designed to create balanced teams by evaluating each player's skill attributes, ensuring fairness in the allocation.
 *       
 *       **Requirements:**
 *       - At least 10 players must be registered to perform this operation.
 *       - The requested number of players per team must be a valid integer.
 * 
 *       Upon successful division, the response will include the generated teams and their respective players.
 *     operationId: "divideTeams"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playersPerTeam:
 *                 type: integer
 *                 format: int32
 *                 example: 5
 *                 description: "The number of players to include in each team."
 *     responses:
 *       200:
 *         description: "Teams successfully divided."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Player'
 *       400:
 *         description: "Bad Request - insufficient players or invalid input."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Minimum of 10 players required."
 *       500:
 *         description: "Internal Server Error."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error message"
 */
// divide by teams
router.post('/divide-teams', divideTeams);


// schemas examples
/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "2"
 *         name:
 *           type: string
 *           example: "chiquinho"
 *         nickname:
 *           type: string
 *           example: "chique"
 *         creationDate:
 *           type: string
 *           format: date-time
 *           example: "2024-03-11T03:00:00.000Z"
 */


module.exports = router;