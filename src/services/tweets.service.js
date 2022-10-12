/* eslint-disable no-console */
// const httpStatus = require('http-status');
const tweetQueue = require('../utils/Queue');

/**
 * Create Task for Fetching Tweets
 * @returns {Promise<Task>}
 */
const createTask = async (user) => {
  // eslint-disable-next-line no-console
  const job = tweetQueue.createJob({ user });
  return job.save();
};

module.exports = { createTask };
