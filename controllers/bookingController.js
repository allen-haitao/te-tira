const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  try {
    await Booking.create(req.body);
    res.status(201).send('Booking created successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.getByUserId(req.query.userId);
    res.send(bookings);
  } catch (err) {
    res.status(400).send(err.message);
  }
};