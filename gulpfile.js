'use strict';

// Include gulp
var gulp = require('gulp');

var scripts = ['lib/*.js'];
var tests = ['test/*.js'];
var coverage = 'coverage/';
var mochaOpts = {};
var coverageThresholds = {
    statements: 77,
    branches: 60,
    functions: 83,
    lines: 80
  };

require('../ot-gulp-release-tasks/index')(gulp, scripts, tests, mochaOpts, coverageThresholds);