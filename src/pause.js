var logger = require('ot-logger');
var lastPause = Date.now();
var callbacks = [];

PauseDetector = {}

function runCheck () {
  var now = Date.now();
  var timeSinceLastCheck = now - lastPause;
  lastPause = now;

  if (timeSinceLastCheck > 50) {
    callbacks.forEach(function (callback) {
      callback(timeSinceLastCheck);
    });
  }
}

var timer;

PauseDetector.start = function() {
  timer = setInterval(runCheck, 25);
  timer.unref();
  logger.info("Detecting Node VM pauses");
}

PauseDetector.stop = function() {
  logger.info("Stop detecting Node VM pauses");
  clearInterval(timer);
}

PauseDetector.onPause = function(callback) {
  callbacks.push(callback);
}

module.exports = PauseDetector;

PauseDetector.onPause(function(ms) {
  logger.error("The Node runtime paused for %s ms! (+/- 25)", ms);
});

PauseDetector.start();
