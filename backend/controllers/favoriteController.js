const Favorite = require('../models/favorite');

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - userId
 *         - itemId
 *         - itemType
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         itemId:
 *           type: string
 *           description: The ID of the hotel or attraction
 *         itemType:
 *           type: string
 *           description: The type of the item (hotel or attraction)
 *       example:
 *         userId: exampleUserId
 *         itemId: exampleItemId
 *         itemType: hotel
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a hotel or attraction to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Favorite'
 *     responses:
 *       201:
 *         description: Item added to favorites successfully
 *       400:
 *         description: Some error happened
 */
exports.addFavorite = async (req, res) => {
    try {
        const { userId, itemId, itemType } = req.body;
        await Favorite.add(userId, itemId, itemType);
        res.status(201).send('Item added to favorites successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/**
 * @swagger
 * /favorites/{userId}:
 *   get:
 *     summary: Get favorites for a user
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of favorite items for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favorite'
 *       400:
 *         description: Some error happened
 */
exports.getFavoritesByUserId = async (req, res) => {
    try {
        const favorites = await Favorite.getByUserId(req.params.userId);
        res.send(favorites);
    } catch (err) {
        res.status(400).send(err.message);
    }
};