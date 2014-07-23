var logger = require('ot-logger');
var lastPause = Date.now();
var callbacks = [];

PauseDetector = {}

// Tick repeatedly.  If a VM pause happens, ticks
// will come dramatically late, and then we sound the alarm!
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

// Start detection
PauseDetector.start = function() {
  timer = setInterval(runCheck, 25);
  timer.unref();
  logger.info("Detecting Node VM pauses");
}

// Stop detection
PauseDetector.stop = function() {
  logger.info("Stop detecting Node VM pauses");
  clearInterval(timer);
}

// Register additional callbacks
PauseDetector.onPause = function(callback) {
  callbacks.push(callback);
}

module.exports = PauseDetector;

// By default, log an error on pause
PauseDetector.onPause(function(ms) {
  logger.error("The Node runtime paused for %s ms! (+/- 25)", ms);
});

// Start running on module include!
PauseDetector.start();
