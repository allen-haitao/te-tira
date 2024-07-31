/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the hotel
 *         location:
 *           type: string
 *           description: The location of the hotel
 *     
*/
/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: The hotels managing API
 */

const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

/**
 * @swagger
 * /hotel:
 *   get:
 *     summary: get all hotels
 *     tags: [Hotel]
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: Some error happened
 */
router.get('/', hotelController.getAllHotels);
/**
 * @swagger
 * /hotel/search:
 *   post:
 *     summary: searh  hotels
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: Some error happened
 */
router.get('/search', hotelController.searchHotels); // Search endpoint
/**
 * @swagger
 * /hotel/{hotelid}:
 *   post:
 *     summary: get  hotel by id
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: success
 *       400:
 *         description: Some error happened
 */
router.get('/:id', hotelController.getHotelById);

module.exports = router;