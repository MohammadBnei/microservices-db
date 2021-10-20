import redis from 'redis';

const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_URI
});

client.on('error', err => {
    console.log('Error ' + err);
});