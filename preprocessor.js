'use strict';

var config        = require('./tasks/config.json'),
    browserify    = require('browserify'),
    watchify      = require('watchify'),
    to5ify        = require('6to5ify'),
    debowerify    = require('debowerify'),
    literalify    = require('literalify').configure(config.browserify.transform.literalify),
    notifier      = require('node-notifier');

module.exports = {
  process: function(src) {
    console.log(src);
    //return browserify({
      //runtime: require.resolve('regenerator/runtime')
    //})
    //.on('error', function(err) {
      //notifier.notify({ message: 'Error: ' + err.message });
      //this.emit('end');
    //})
    //.transform(to5ify)
    //.transform(literalify)
    //.transform(debowerify)
    //.bundle();
    return src;
  }
};
