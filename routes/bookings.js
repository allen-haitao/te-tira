const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - userId
 *         - hotelId
 *         - checkInDate
 *         - checkOutDate
 *         - totalPrice
 *       properties:
 *         bookingId:
 *           type: string
 *           description: The ID of the booking
 *         userId:
 *           type: string
 *           description: The ID of the user making the booking
 *         hotelId:
 *           type: string
 *           description: The ID of the hotel being booked
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: The check-in date for the booking
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: The check-out date for the booking
 *         totalPrice:
 *           type: number
 *           description: The total price for the booking
 *         createdAt:
 *           type: string
 *           description: The date and time when the booking was created
 *       example:
 *         bookingId: exampleBookingId
 *         userId: exampleUserId
 *         hotelId: exampleHotelId
 *         checkInDate: 2024-07-01
 *         checkOutDate: 2024-07-05
 *         totalPrice: 600
 *         createdAt: 2024-07-01T00:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The booking managing API
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *       400:
 *         description: Some error happened
 */
router.post('/', bookingController.createBooking);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get bookings for a user
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A list of bookings for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Some error happened
 */
router.get('/', bookingController.getUserBookings);

module.exports = router;