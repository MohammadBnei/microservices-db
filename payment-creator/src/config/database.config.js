import { createClient } from "redis";

// create redis client
const client = createClient({
    url: process.env.REDIS_URI,
});


(async () => {
    client.on('error', (err) => console.log('Redis Client Error', err));
    
    await client.connect();
})()

export default client;
