const { promisify } = require('util')
const redis = require("redis")

const client = redis.createClient({
    port: process.env.REDIS_PORT,
    url: process.env.REDIS_URL
})

client.on('error', (err) => {
    console.log(err)
})

const getAsync = promisify(client.get).bind(client)

module.exports = {
    client,
    getAsync
}