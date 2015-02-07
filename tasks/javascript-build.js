/*
 * @author Hung Quang Phan
 *
 * Development config
 */

var _             = require('lodash'),
    config        = require('./config.json'),
    del           = require('del'),
    gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    plumber       = require('gulp-plumber'),
    changed       = require('gulp-changed'),
    transform     = require('vinyl-transform'),
    browserify    = require('browserify'),
    watchify      = require('watchify'),
    to5ify        = require('6to5ify'),
    debowerify    = require('debowerify'),
    literalify    = require('literalify').configure(config.browserify.transform.literalify),
    errorsHandler = require('./errors-handler');

// clean task
gulp.task('javascript:clean', function () {
  del([config.development.build], function (err, paths) {
    gutil.log(
      'Deleted files/folders:\n',
      gutil.colors.cyan(paths.join('\n'))
    );
  });
});

// watch task
gulp.task('javascript:dev', ['javascript:clean'], function () {
  var bundle,
      bundler,
      cached = {};

  bundler = function() {
    return transform(function(filename) {
      // cached
      if (cached[filename]) {
        return cached[filename].bundle();
      }

      var b = watchify(browserify(filename, _.extend({
                runtime: require.resolve('regenerator/runtime'),
                debug: true
              }, watchify.args)));

      b.on('time', function(time) {
        gutil.log(gutil.colors.green('Bundle'), filename + gutil.colors.magenta(' in ' + time + 'ms'));
      });
      b.on('error', errorsHandler.browserifyErrorHandler);
      b.on('update', bundle);
      b.transform(to5ify);
      b.transform(literalify);
      b.transform(debowerify);

      cached[filename] = b;

      return b.bundle();
    });
  };

  bundle = function() {
    var stream = gulp.src([config.development.src])
                   .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
                   .pipe(changed(config.development.build))
                   .pipe(bundler())
                   .pipe(gulp.dest(config.development.build));

    return stream;
  };

  return bundle();
});

// build task
gulp.task('javascript:build', ['javascript:clean'], function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {
              runtime: require.resolve('regenerator/runtime')
            });

    b.on('error', errorsHandler.browserifyErrorHandler);
    b.transform(to5ify);
    b.transform(literalify);
    b.transform(debowerify);

    return b.bundle();
  });

  var stream = gulp.src([config.production.src])
                 .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
                 .pipe(browserified)
                 .pipe(gulp.dest(config.production.build));

  return stream;
});
