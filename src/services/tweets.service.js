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

const getTasks = async () => {
  return tweetsTask.find();
};

const getCompletedTasks = async () => {
  return tweetsTask.find({ status: taskStatusTypes.SUCCEEDED });
};

module.exports = { createTask, saveTask, getTasks, getCompletedTasks };
