'use strict';

// Include gulp
var gulp = require('gulp');

var scripts = ['src/*.js'];
var tests = ['test/*.js'];
var coverage = 'coverage/';
var mochaOpts = {};
var coverageThresholds = {
    statements: 84,
    branches: 60,
    functions: 87,
    lines: 86
  };

require('../ot-gulp-release-tasks/index')(gulp, scripts, tests, mochaOpts, coverageThresholds);