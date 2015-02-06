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

var _ = require('lodash');
var transform  = require('vinyl-transform');
var source = require('vinyl-source-stream')
var watchify = require('watchify');

var literalify = require('literalify').configure(config.browserify.transform.literalify);

var errorsHandler = require('./errors-handler');

var through2 = require('through2');

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
  var browserified = through2.obj(function(file, enc, next) {
    browserify(file.path, {runtime: require.resolve('regenerator/runtime')})
      .on('error', errorsHandler.browserifyErrorHandler)
      .transform(to5ify)
      .transform(literalify)
      .bundle(function(err, res){
          file.contents = res;
          next(null, file);
      });
  });

  return gulp.src([config.development.src])
           .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
           .pipe(browserified)
           .pipe(gulp.dest(config.development.build));
});

gulp.task('scripts', function() {
  var browserified = transform(function(filename) {
    return browserify(filename, {runtime: require.resolve('regenerator/runtime')})
             .on('error', errorsHandler.browserifyErrorHandler)
             .transform(to5ify)
             .transform(literalify)
             .bundle()
  });

  var stream = gulp.src([config.development.src])
                 .pipe(plumber({ errorHandler: errorsHandler.browserifyErrorHandler }))
                 .pipe(browserified)
                 .pipe(gulp.dest(config.development.build));

  return stream;
});

gulp.task('development:watch', function() {
  gulp.watch(config.development.src, ['development:build']);
});
