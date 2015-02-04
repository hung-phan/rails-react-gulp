//= require jquery
//= require jquery_ujs
//= require superagent/superagent
//= require lodash
//= require react
//= require react-router

'use strict'

// component
//let csp  = require('js-csp');
let Home = require('components/home');

$(document).ready(function() {
  // define routing
  let routes = (
    <ReactRouter.Route name='main_page' path='/' handler={Home}></ReactRouter.Route>
  );

  ReactRouter.run(routes, ReactRouter.HashLocation, function(Handler) {
    React.render(React.createFactory(Handler)(), document.getElementById('routing-component'))
  });
});
