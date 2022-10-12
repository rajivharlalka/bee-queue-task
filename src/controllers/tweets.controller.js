/* eslint-disable no-console */
// const httpStatus = require('http-status');
const { tweetService } = require('../services');
const catchAsync = require('../utils/catchAsync');
// const tweetQueue = require('../utils/Queue');

const getTweets = catchAsync(async (req, res) => {
  const job = await tweetService.createTask(req.user.id);
  await tweetService.saveTask(job);
  res.status(200).send({ message: job });
});

const listTasks = catchAsync(async (req, res) => {
  const tasks = await tweetService.getTasks();
  res.status(200).send({ message: tasks });
});

const completedTasks = catchAsync(async (req, res) => {
  const tasks = await tweetService.getCompletedTasks('SUCCEEDED');
  res.status(200).send({ message: tasks });
});

module.exports = {
  getTweets,
  listTasks,
  completedTasks,
};
