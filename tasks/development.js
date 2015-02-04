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
var es6ify     = require('es6ify');
var browserify = require('browserify');

gulp.task('development:clean', function () {
  del([config.development.build], function (err, paths) {
    gutil.log('Deleted files/folders:\n', gutil.colors.cyan(paths.join('\n')));
  });
});

gulp.task('development:build', function() {
  var stream = gulp.src(config.development.src)
                 .pipe(plumber())
                 .pipe(plumber.stop())
                 .pipe(gulp.dest(config.development.build))

  return stream;
});
