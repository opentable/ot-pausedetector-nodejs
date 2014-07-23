assert = require('assert')
logger = require('ot-logger')

logger.init({
  applicationName: "test",
  applicationVersion: "0"
});

pause = require('../src/pause')

describe('PauseDetector', function() {
  it('should detect pauses', function(done) {
    var pauses = [];
    pause.onPause(function(ms) {
      pauses.push(ms);
    });

    assert.equal(pauses.length, 0);

    var now = Date.now();
    while (Date.now() - now < 150) { }

    setTimeout(function() {
      assert.equal(pauses.length, 1);
      assert.ok(pauses[0] > 150 && pauses[0] < 200);

      now = Date.now();
      while (Date.now() - now < 25) { }

      setTimeout(function() {
        assert.equal(pauses.length, 1);

        var now = Date.now();
        while (Date.now() - now < 650) { }

        setTimeout(function() {
          assert.equal(pauses.length, 2);
          assert.ok(pauses[1] > 650 && pauses[1] < 700);

          done();
        }, 100);
      }, 100);
    }, 100);
  });
});
