/*
 * @author Hung Quang Phan
 *
 * Development config
 */

var config        = require('./config.json');
var del           = require('del');
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var plumber       = require('gulp-plumber');

var to5ify        = require('6to5ify');
var debowerify    = require('debowerify');
var browserify    = require('browserify');

var _             = require('lodash');
var transform     = require('vinyl-transform');
var watchify      = require('watchify');
var literalify    = require('literalify').configure(config.browserify.transform.literalify);
var errorsHandler = require('./errors-handler');

// main task
gulp.task('development:clean', function () {
  del([config.development.build], function (err, paths) {
    gutil.log(
      'Deleted files/folders:\n',
      gutil.colors.cyan(paths.join('\n'))
    );
  });
});

gulp.task('development:watch', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {
              runtime: require.resolve('regenerator/runtime'),
              debug: true
            });

    b.on('error', errorsHandler.browserifyErrorHandler);
    b.transform(to5ify);
    b.transform(literalify);

    return b.bundle();
  });

  var stream = gulp.src([config.development.src])
                 .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
                 .pipe(browserified)
                 .pipe(gulp.dest(config.development.build));

  return stream;
});

gulp.task('development:build', ['development:clean'], function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {
              runtime: require.resolve('regenerator/runtime')
            });

    b.on('error', errorsHandler.browserifyErrorHandler);
    b.transform(to5ify);
    b.transform(literalify);

    return b.bundle();
  });

  var stream = gulp.src([config.development.src])
                 .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
                 .pipe(browserified)
                 .pipe(gulp.dest(config.development.build));

  return stream;
});
