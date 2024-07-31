const Cart = require('../models/Cart');
const Hotel = require('../models/Hotel');

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - userId
 *         - hotelId
 *         - checkInDate
 *         - checkOutDate
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         hotelId:
 *           type: string
 *           description: The ID of the hotel to add to the cart
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: The check-in date
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: The check-out date
 *       example:
 *         userId: exampleUserId
 *         hotelId: exampleHotelId
 *         checkInDate: 2024-07-01
 *         checkOutDate: 2024-07-05
 * 
 *     Checkout:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *       example:
 *         userId: exampleUserId
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a hotel to the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Item added to cart
 *       400:
 *         description: Some error happened
 */
exports.addItem = async (req, res) => {
    try {
        const { userId, hotelId, checkInDate, checkOutDate } = req.body;
        const hotel = await Hotel.getById(hotelId);
        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }
        await Cart.addItem(userId, hotel, checkInDate, checkOutDate);
        res.send('Item added to cart');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/**
 * @swagger
 * /cart/remove:
 *   post:
 *     summary: Remove a hotel from the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemoveCartItem'
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       400:
 *         description: Some error happened
 */
exports.removeItem = async (req, res) => {
    try {
        const { userId, hotelId } = req.body;
        await Cart.removeItem(userId, hotelId);
        res.send('Item removed from cart');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Checkout'
 *     responses:
 *       200:
 *         description: Checkout successful
 *       400:
 *         description: Some error happened
 */
exports.checkout = async (req, res) => {
    try {
        const { userId } = req.body;
        await Cart.checkout(userId);
        res.send('Checkout successful');
    } catch (err) {
        res.status(400).send(err.message);
    }
};