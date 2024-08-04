const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    const user = await User.getByEmail(req.body.email);
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};