const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

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
 * tags:
 *   name: Cart
 *   description: The cart managing API
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a hotel to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
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
router.post('/add', authMiddleware, cartController.addItem);

/**
 * @swagger
 * /cart/remove:
 *   post:
 *     summary: Remove a hotel from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
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
router.post('/remove', authMiddleware, cartController.removeItem);

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
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
router.post('/checkout', authMiddleware, cartController.checkout);

module.exports = router;