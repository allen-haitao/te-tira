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
 * /cart:
 *   get:
 *     summary: Get cart for a user
 *     tags: [cart]
 *     parameters:
 *         required: false
 *     responses:
 *       200:
 *         description: A lcart for the user
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Some error happened
 */
exports.getCartByUserId = async (req, res) => {
    try {
        // Get the userId from the auth middleware
        const userId = req.userId;

        // Get the user's cart from the database
        const cart = await Cart.getByUserId(userId);

        res.status(200).send(cart);
    } catch (err) {
        console.error('Error fetching cart:', err);
        res.status(400).send(err.message);
    }
};

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
        const { hotelId, checkInDate, checkOutDate } = req.body;
        // Get the userId from the auth middleware
        const userId = req.userId;
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
        const { hotelId } = req.body;
        // Get the userId from the auth middleware
        const userId = req.userId;
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
        // Get the userId from the auth middleware
        const userId = req.userId;
        await Cart.checkout(userId);
        res.send('Checkout successful');
    } catch (err) {
        res.status(400).send(err.message);
    }
};