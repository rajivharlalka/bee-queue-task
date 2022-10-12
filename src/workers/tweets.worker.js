const axios = require('axios');
const tweetQueue = require('../utils/Queue');

const twitterSearchUrl = 'https://api.twitter.com/2/tweets/search/recent';
const params = { query: '#Bangalore' };
const headers = { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` };

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

// tweetQueue.on('ready', function () {
//   tweetQueue.process(function (job, done) {
//     console.log('processing job ' + job.id);
//     setTimeout(function () {
//       done(null, job.data);
//     }, 2000);
//   });

//   console.log('processing jobs...');
// });
