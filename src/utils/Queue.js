const Queue = require('bee-queue');
const redis = require('redis');
const config = require('../config/config');

const sharedConfig = {
  redis: redis.createClient(config.redis),
};
// create a tweet Queue to send and process requests for tweets
const tweetQueue = new Queue('tweet', sharedConfig);

module.exports = tweetQueue;
