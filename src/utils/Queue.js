const Queue = require('bee-queue');

const tweetQueue = new Queue('tweet');

module.exports = tweetQueue;
