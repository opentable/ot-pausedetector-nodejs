'use strict';
var assert = require('assert');

var log = function(msg) {
  console.log(msg);
};

var logger = {
  debug: log,
  info: log,
  warn: log,
  error: log
};

var pause = require('../src/pause');
pause.init({
  logger: logger
});

describe('PauseDetector', function() {
  it('should detect pauses', function(done) {
    var pauses = [];
    pause.onPause(function(ms) {
      pauses.push(ms);
    });

    assert.equal(pauses.length, 0);

    var now = Date.now();

    logger.info("Start 150ms pause");
    /* jshint ignore:start */
    while (Date.now() - now < 150) { }
    logger.info("End 150ms pause");
    /* jshint ignore:end */
    setTimeout(function() {
      assert.equal(pauses.length, 1);
      assert.ok(pauses[0] > 150 && pauses[0] < 200);

      now = Date.now();
      logger.info("Start 15ms pause");
      /* jshint ignore:start */
      while (Date.now() - now < 15) { }
      logger.info("End 15ms pause");
      /* jshint ignore:end */
      setTimeout(function() {
        assert.equal(pauses.length, 1);

        var now = Date.now();
        logger.info("Start 650ms pause");
        /* jshint ignore:start */
        while (Date.now() - now < 650) { }
        logger.info("End 650ms pause");
        /* jshint ignore:end */
        setTimeout(function() {
          assert.equal(pauses.length, 2);
          assert.ok(pauses[1] > 650 && pauses[1] < 700);

          done();
        }, 100);
      }, 100);
    }, 100);
  });
});
