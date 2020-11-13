const { promisify } = require('util')
const redis = require("redis")

const client = redis.createClient({ port: process.env.REDIS_PORT })

client.on('error', (err) => {
    console.log(err)
})

const getAsync = promisify(client.get).bind(client)

module.exports = {
    client,
    getAsync
}