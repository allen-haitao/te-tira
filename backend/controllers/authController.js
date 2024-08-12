const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *       400:
 *         description: Some error happened
 */
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Some error happened
 */
exports.login = async (req, res) => {
  try {
    // Validate request
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    // Get user by email
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // Sign the token with an expiration time (e.g., 1 hour)
    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Set token expiration time
    );

    // Send the token to the client
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal server error');
  }
};