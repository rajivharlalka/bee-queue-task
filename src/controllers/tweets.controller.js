/* eslint-disable no-console */
// const httpStatus = require('http-status');
const { tweetService } = require('../services');
const catchAsync = require('../utils/catchAsync');
// const tweetQueue = require('../utils/Queue');

const getTweets = catchAsync(async (req, res) => {
  // eslint-disable-next-line no-console
  // console.log(req, res, 'Hello world');
  // const job = await tweetQueue.createJob({ message: req.user.email }).save();
  const job = await tweetService.createTask(req.user.email);
  console.log(job);
  res.status(200).send({ message: job });
});

module.exports = {
  getTweets,
};
