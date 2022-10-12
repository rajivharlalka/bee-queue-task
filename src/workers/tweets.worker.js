const tweetQueue = require('../utils/Queue');

tweetQueue.process(function (job, done) {
  return done(null, 'Completed');
});
