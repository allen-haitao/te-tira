// listTables.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

console.log('AWS SDK configured with region:', AWS.config.region);
console.log('AWS SDK configured with endpoint:', AWS.config.endpoint);

const dynamodb = new AWS.DynamoDB();

const listTables = async () => {
    try {
        const result = await dynamodb.listTables().promise();
        console.log('Tables in DynamoDB:', result.TableNames);
    } catch (err) {
        console.error('Unable to list tables:', err);
    }
};

listTables();