/*
 * @author Hung Quang Phan
 * 
 * Development config
 */
var config = require('./config.json');
var gulp   = require('gulp');
var del    = require('del');

gulp.task('development:clean', function () {
  // remove bundle.js file
  del([config.development.dest], function (err, paths) {
    console.log('Deleted files/folders:\n', paths.join('\n'));
  });
});

//gulp.task('development:build', ['development:clean'], function() {
//});
