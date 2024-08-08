const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: The favorites managing API
 */

router.post('/', favoriteController.addFavorite);
router.get('/:userId', favoriteController.getFavoritesByUserId);

module.exports = router;