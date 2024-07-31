const dynamodb = require('../config/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const User = {
  async create(user) {
    user.userId = uuidv4()
    user.password = await bcrypt.hash(user.password, 10);
    const params = {
      TableName: 'Users',
      Item: user,
    };
    console.log(JSON.stringify(user, null, "\t"))
    return dynamodb.put(params).promise();
  },

  async getByEmail(email) {
    const params = {
      TableName: 'Users',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };
    const result = await dynamodb.query(params).promise();
    return result.Items[0];
  },
};

module.exports = User;