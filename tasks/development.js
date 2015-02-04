/*
 * @author Hung Quang Phan
 * 
 * Development config
 */
var config = require('./config.json');
var gulp   = require('gulp');
var del    = require('del');
var gutil  = require('gulp-util');

gulp.task('development:clean', function () {
  del([config.development.build], function (err, paths) {
    gutil.log('Deleted files/folders:\n', gutil.colors.cyan(paths.join('\n')));
  });
});

gulp.task('development:build', ['development:clean'], function() {

});
