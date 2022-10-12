const Queue = require('bee-queue');

// create a tweet Queue to send and process requests for tweets
const tweetQueue = new Queue('tweet');

module.exports = tweetQueue;
