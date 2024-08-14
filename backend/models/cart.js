const dynamodb = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Cart = {
  async create(userId) {
    const cart = {
      cartId: uuidv4(),
      userId,
      items: [],
      totalPrice: 0,
      createdAt: new Date().toISOString(),
    };
    const params = {
      TableName: 'Carts',
      Item: cart,
    };
    return dynamodb.put(params).promise();
  },

  async getByUserId(userId) {
    const params = {
      TableName: 'Carts',
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const result = await dynamodb.query(params).promise();
    return result.Items[0];
  },

  async addItem(userId, hotel, checkInDate, checkOutDate) {
    cart = await this.getByUserId(userId);
    if (!cart) {
      cart = await this.create(userId)
      //throw new Error('Cart not found');
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    if (isNaN(nights) || nights <= 0) {
      throw new Error('Invalid check-in or check-out date');
    }

    const pricePerNight = parseFloat(hotel.price);
    if (isNaN(pricePerNight)) {
      throw new Error('Invalid price per night');
    }

    const cartItem = {
      hotelId: hotel.hotelId,
      name: hotel.name,
      location: hotel.location,
      pricePerNight: hotel.price,
      checkInDate,
      checkOutDate,
      nights,
      totalPrice: hotel.price * nights,
    };

    cart.items.push(cartItem);
    cart.totalPrice += cartItem.totalPrice;

    const params = {
      TableName: 'Carts',
      Item: cart,
    };
    return dynamodb.put(params).promise();
  },

  async removeItem(userId, hotelId) {
    const cart = await this.getByUserId(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.hotelId === hotelId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    const item = cart.items[itemIndex];
    cart.totalPrice -= item.totalPrice;
    cart.items.splice(itemIndex, 1);

    const params = {
      TableName: 'Carts',
      Item: cart,
    };
    return dynamodb.put(params).promise();
  },

  async checkout(userId) {
    const cart = await this.getByUserId(userId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    // Logic for processing payment and booking hotels goes here.
    //After payment, update the booking table.

    cart.items = [];
    cart.totalPrice = 0;
    const params = {
      TableName: 'Carts',
      Item: cart,
    };
    return dynamodb.put(params).promise();
  },
};

module.exports = Cart;