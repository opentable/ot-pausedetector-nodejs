assert = require('assert');
logger = require('ot-logger');

logger.init({
  applicationName: "test",
  applicationVersion: "0"
});

var pause = require('../src/pause');
pause.init();

describe('PauseDetector', function() {
  it('should detect pauses', function(done) {
    var pauses = [];
    pause.onPause(function(ms) {
      pauses.push(ms);
    });

    assert.equal(pauses.length, 0);

    var now = Date.now();

    logger.info("Start 150ms pause");
    while (Date.now() - now < 150) { }
    logger.info("End 150ms pause");

    setTimeout(function() {
      assert.equal(pauses.length, 1);
      assert.ok(pauses[0] > 150 && pauses[0] < 200);

      now = Date.now();
      logger.info("Start 15ms pause");
      while (Date.now() - now < 15) { }
      logger.info("End 15ms pause");

      setTimeout(function() {
        assert.equal(pauses.length, 1);

        var now = Date.now();
        logger.info("Start 650ms pause");
        while (Date.now() - now < 650) { }
        logger.info("End 650ms pause");

        setTimeout(function() {
          assert.equal(pauses.length, 2);
          assert.ok(pauses[1] > 650 && pauses[1] < 700);

          done();
        }, 100);
      }, 100);
    }, 100);
  });
});
