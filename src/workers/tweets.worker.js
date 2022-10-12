const axios = require('axios');
const config = require('../config/config');
const tweetQueue = require('../utils/Queue');

const searchHashtag = '#Bangalore';

const twitterSearchUrl = 'https://api.twitter.com/2/tweets/search/recent';
const params = { query: searchHashtag };
const headers = { Authorization: `Bearer ${config.bearer_token}` };

tweetQueue.on('ready', function () {
  tweetQueue.process(function (job, done) {
    axios
      .get(twitterSearchUrl, { params, headers })
      .then(function (response) {
        done(null, { tweets: response.data.data, taskId: job.id });
      })
      .catch(function (err) {
        done(err, null);
      });
  });
});
