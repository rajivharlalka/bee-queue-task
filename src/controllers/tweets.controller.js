const httpStatus = require('http-status');
const { tweetService } = require('../services');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');

const getTweets = catchAsync(async (req, res) => {
  const job = await tweetService.createTask(req.user.id);
  await tweetService.saveTask(job);

  job.on('succeeded', async (result) => {
    const newTaskData = { tweets_fetched: result.length, status: 'succeeded' };
    await tweetService.updateTask(job.id, newTaskData);
    res.status(httpStatus.OK).send(result);
  });

  job.on('failed', async () => {
    const newTaskData = { status: 'failed' };
    await tweetService.updateTask(job.id, newTaskData);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Could not process request' });
  });
});

const listTasks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['job_id', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const tasks = await tweetService.getTasks(filter, options);
  res.status(httpStatus.OK).send(tasks);
});

const completedTasks = catchAsync(async (req, res) => {
  const tasks = await tweetService.getCompletedTasks('succeeded');
  res.status(httpStatus.OK).send(tasks);
});

module.exports = {
  getTweets,
  listTasks,
  completedTasks,
};
