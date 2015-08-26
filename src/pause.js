(function() {
'use strict';
var logger;
var checkMs = 10;
var maxPauseMs = 50;

var lastPause;
var callbacks = [];

var PauseDetector = {};

// Tick repeatedly.  If a VM pause happens, ticks
// will come dramatically late, and then we sound the alarm!
function runCheck () {
  var now = Date.now();
  var timeSinceLastCheck = now - lastPause;
  lastPause = now;

  if (timeSinceLastCheck > maxPauseMs) {
    callbacks.forEach(function (callback) {
      callback(timeSinceLastCheck);
    });
  }
}

var timer;

// Start detection
PauseDetector.resume = function() {
  timer = setInterval(runCheck, checkMs);
  timer.unref();
  lastPause = Date.now();
  logger.info("Detecting Node VM pauses.  Checking every " + checkMs + "ms for pauses of at least " + maxPauseMs + "ms");
};

// Stop detection
PauseDetector.stop = function() {
  logger.info("Stop detecting Node VM pauses");
  clearInterval(timer);
};

// Register additional callbacks
PauseDetector.onPause = function(callback) {
  callbacks.push(callback);
};

// By default, log an error on pause
PauseDetector.onPause(function(ms) {
  logger.error("The Node runtime paused for " + ms + "ms! (+/- " + checkMs + ")", {pauselengthMs: ms});
});

// Configure and start
PauseDetector.init = function(options) {
  if (!options) {options = {};}

  if (options.logger) {
    logger = options.logger;
  } else {
    logger = require('ot-logger');
  }

  if (options.checkMs) {
    checkMs = options.checkMs;
  }
  if (options.maxPauseMs) {
    maxPauseMs = options.maxPauseMs;
  }

  PauseDetector.resume();
};

module.exports = PauseDetector;

})();
