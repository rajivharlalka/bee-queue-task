const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const taskStatusTypes = require('../config/tasks');

const tweetsTaskSchema = mongoose.Schema(
  {
    job_id: {
      type: String,
      required: true,
      index: true,
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: [
        taskStatusTypes.CREATED,
        taskStatusTypes.ACTIVE,
        taskStatusTypes.WAITING,
        taskStatusTypes.DELAYED,
        taskStatusTypes.FAILED,
        taskStatusTypes.SUCCEEDED,
      ],
      required: true,
    },
    time_taken: {
      type: String,
    },
    tweets_fetched: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tweetsTaskSchema.plugin(toJSON);

// plugin to paginate data
tweetsTaskSchema.plugin(paginate);

/**
 * @typedef tweetsTask
 */
const tweetsTask = mongoose.model('TweetsTask', tweetsTaskSchema);

module.exports = tweetsTask;
