const taskStatusTypes = require('../config/tasks');
const tweetsTask = require('../models/task.model');
const tweetQueue = require('../utils/Queue');

/**
 * Create Task for Fetching Tweets
 * @returns {Promise<Task>}
 */
const createTask = async (user) => {
  const job = tweetQueue.createJob({ user_id: user });
  return job.save();
};

const saveTask = async (job) => {
  const task = await tweetsTask.create({ job_id: job.id, user_id: job.data.user_id, status: job.status });
  return task;
};

const updateTask = async (jobId, newTaskData) => {
  const task = await tweetsTask.findOne({ job_id: jobId });
  // eslint-disable-next-line no-param-reassign
  if (newTaskData.status === 'succeeded') newTaskData.time_taken = new Date().getTime() - new Date(task.createdAt).getTime();
  return task.updateOne(newTaskData);
};

const getTasks = async () => {
  const tasks = await tweetsTask.find();
  return { tasks };
};

const getCompletedTasks = async () => {
  const tasks = await tweetsTask.find({ status: taskStatusTypes.SUCCEEDED });
  return { tasks };
};

module.exports = { createTask, saveTask, getTasks, getCompletedTasks, updateTask };
