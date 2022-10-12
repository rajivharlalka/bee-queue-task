const express = require('express');
const auth = require('../../middlewares/auth');
const tweetsController = require('../../controllers/tweets.controller');

const router = express.Router();

router.route('/createTask').post(auth('createTasks'), tweetsController.getTweets);

module.exports = router;
