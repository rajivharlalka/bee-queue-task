const express = require('express');
const auth = require('../../middlewares/auth');
const tweetsController = require('../../controllers/tweets.controller');

const router = express.Router();

router.route('/createTask').post(auth('createTasks'), tweetsController.getTweets);
router.route('/listTask').get(auth('listTasks'), tweetsController.listTasks);
router.route('/completedTasks').get(auth('listTasks'), tweetsController.completedTasks);

module.exports = router;
