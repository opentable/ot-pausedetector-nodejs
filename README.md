Node.JS Pause Detector
======================

Node is single threaded.  Any CPU intensive tasks (including ones you don't know about, like GC)
may pause the application for an unbounded period.

This can cause huge issues, and shows up when you least expect it.

ot-pausedetector will not solve your pauses, but at least it makes you aware of them!

Basic Usage
-----------

    require("ot-pausedetector")

Yup!  That's it.  The module registers itself with the runtime on first inclusion, and by default will log
an ERROR level message when a pause of 50ms or greater happens.

Advanced Usage
--------------

    pause.stop();

Temporarily suspend pause detection.

    pause.start();

Resume pause detection.

    pause.onPause(function(pauseMs) {
      // Do something nifty
    });

Do something nifty when a pause happens.  Nifty something not included.
