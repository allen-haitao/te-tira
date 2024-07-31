const dynamodb = require('../config/db');

const Hotel = {
  async search({ location, minPrice, maxPrice }) {
    const params = {
      TableName: 'Hotels',
      FilterExpression: '',
      ExpressionAttributeValues: {},
    };

    if (location) {
      params.FilterExpression += 'contains(#loc, :location)';
      params.ExpressionAttributeValues[':location'] = location;
      params.ExpressionAttributeNames = { '#loc': 'location' };
    }

    if (minPrice) {
      if (params.FilterExpression) params.FilterExpression += ' AND ';
      params.FilterExpression += 'pricePerNight >= :minPrice';
      params.ExpressionAttributeValues[':minPrice'] = parseFloat(minPrice);
    }

    if (maxPrice) {
      if (params.FilterExpression) params.FilterExpression += ' AND ';
      params.FilterExpression += 'pricePerNight <= :maxPrice';
      params.ExpressionAttributeValues[':maxPrice'] = parseFloat(maxPrice);
    }

    const result = await dynamodb.scan(params).promise();
    return result.Items;
  },

  async getAll() {
    const params = {
      TableName: 'Hotels',
    };
    const result = await dynamodb.scan(params).promise();
    return result.Items;
  },

  async getById(hotelId) {
    const params = {
      TableName: 'Hotels',
      Key: { hotelId },
    };
    const result = await dynamodb.get(params).promise();
    return result.Item;
  },
};

module.exports = Hotel;