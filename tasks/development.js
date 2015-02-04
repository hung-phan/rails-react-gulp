/*
 * @author Hung Quang Phan
 *
 * Development config
 */

var config     = require('./config.json');
var del        = require('del');
var gulp       = require('gulp');
var gutil      = require('gulp-util');
var plumber    = require('gulp-plumber');

var sourcemaps = require('gulp-sourcemaps');
var to5ify     = require('6to5ify');
var debowerify = require('debowerify');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var watchify   = require('watchify');
var literalify = require('literalify').configure(config.browserify.transform.literalify);
var notifier   = require('node-notifier');

var errorHandlers = {
  browserifyErrorHandler: function (err) {
    notifier.notify({ message: 'Error: ' + err.message });
    gutil.log(gutil.colors.red('Error'), err.message);
  }
};

// main task
gulp.task('development:clean', function () {
  del([config.development.build], function (err, paths) {
    gutil.log(
      'Deleted files/folders:\n',
      gutil.colors.cyan(paths.join('\n'))
    );
  });
});

gulp.task('development:build', function() {
  var bundler = browserify(config.browserify.settings);

  bundler.add('./app/assets/javascripts/src/test-src.js');

  bundler.transform(to5ify);
  bundler.transform(literalify);

  var stream = bundler.bundle()
                 .on('error', errorHandlers.browserifyErrorHandler)
                 .pipe(source('test-src.js'))
                 .pipe(gulp.dest(config.development.build));

  return stream;
});
