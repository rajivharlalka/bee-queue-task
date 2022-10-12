const taskStatusTypes = require('../config/tasks');
const tweetsTask = require('../models/task.model');
const tweetQueue = require('../utils/Queue');

/**
 * Create Task for Fetching Tweets
 * @param {String} userId
 * @returns {Promise<Bee-Queue Task>}
 */
const createTask = async (user) => {
  const job = tweetQueue.createJob({ user_id: user });
  return job.save();
};

/**
 * Save a created task in database
 * @param {Object} job
 * @returns {Promise<tweetsTask>}
 */

const saveTask = async (job) => {
  const task = await tweetsTask.create({ job_id: job.id, user_id: job.data.user_id, status: job.status });
  return task;
};

/**
 * Update task, mainly status of task
 * @param {Id} jobId
 * @param {Object} newTaskData New Details to be updated
 * @returns {Promise<UpdateTask>}
 */
const updateTask = async (jobId, newTaskData) => {
  const task = await tweetsTask.findOne({ job_id: jobId });
  // eslint-disable-next-line no-param-reassign
  if (newTaskData.status === 'succeeded') newTaskData.time_taken = new Date().getTime() - new Date(task.createdAt).getTime();
  return task.updateOne(newTaskData);
};

/**
 * Query for all types of tasks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getTasks = async (filter, options) => {
  const tasks = await tweetsTask.paginate(filter, options);
  return { tasks };
};

const getCompletedTasks = async () => {
  const tasks = await tweetsTask.find({ status: taskStatusTypes.SUCCEEDED });
  return { tasks };
};

module.exports = { createTask, saveTask, getTasks, getCompletedTasks, updateTask };
