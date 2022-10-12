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

tweetsTaskSchema.plugin(paginate);

/**
 * @typedef Token
 */
const tweetsTask = mongoose.model('tweetsTask', tweetsTaskSchema);

module.exports = tweetsTask;
