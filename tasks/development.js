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
    rename        = require('gulp-rename'),
    plumber       = require('gulp-plumber'),
    transform     = require('vinyl-transform'),
    browserify    = require('browserify'),
    watchify      = require('watchify'),
    to5ify        = require('6to5ify'),
    debowerify    = require('debowerify'),
    literalify    = require('literalify').configure(config.browserify.transform.literalify),
    errorsHandler = require('./errors-handler');

// main task
gulp.task('development:clean', function () {
  del([config.development.build], function (err, paths) {
    gutil.log(
      'Deleted files/folders:\n',
      gutil.colors.cyan(paths.join('\n'))
    );
  });
});

gulp.task('development:build', ['development:clean'], function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {
              runtime: require.resolve('regenerator/runtime')
            });

    b.on('error', errorsHandler.browserifyErrorHandler);
    b.transform(to5ify);
    b.transform(debowerify);
    b.transform(literalify);

    return b.bundle();
  });

  var stream = gulp.src([config.development.src])
                 .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
                 .pipe(browserified)
                 .pipe(rename(function(path) {
                   path.basename = path.basename.replace(config.rename.before, config.rename.after);
                 }))
                 .pipe(gulp.dest(config.development.build));

  return stream;
});

