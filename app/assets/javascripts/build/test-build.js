(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/colorvisa/Desktop/workarea/working-on/testing-app/newapp/app/assets/source/test-build.js":[function(require,module,exports){
"use strict";

var Home = React.createClass({
  displayName: "Home",
  getInitialState: function getInitialState() {
    return {
      text: "Click Me!"
    };
  },
  clickMeUpdate: function clickMeUpdate(event) {
    this.setState({
      text: this.state.text.split("").reverse().join("")
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "ul",
          { className: "nav nav-pills pull-right" },
          React.createElement(
            "li",
            { className: "active" },
            React.createElement(
              "a",
              { href: "#" },
              "Home"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "About"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              "Contact"
            )
          )
        ),
        React.createElement(
          "h3",
          { className: "text-muted" },
          "ReactJs ",
          React.createElement("i", { className: "fa fa-cog fa-spin" })
        )
      ),
      React.createElement(
        "div",
        { className: "jumbotron" },
        React.createElement(
          "h1",
          null,
          "'Allo, 'Allo!"
        ),
        React.createElement(
          "p",
          { className: "lead" },
          "Always a pleasure scaffolding your apps."
        ),
        React.createElement(
          "p",
          null,
          React.createElement(
            "a",
            { className: "btn btn-lg btn-success", href: "#" },
            "Splendid!"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "row marketing" },
        React.createElement(
          "div",
          { className: "col-lg-6" },
          React.createElement(
            "h4",
            null,
            "HTML5 Boilerplate"
          ),
          React.createElement(
            "p",
            null,
            "HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites."
          ),
          React.createElement(
            "h4",
            null,
            "Bootstrap"
          ),
          React.createElement(
            "p",
            null,
            "Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development."
          ),
          React.createElement(
            "h4",
            null,
            "Modernizr"
          ),
          React.createElement(
            "p",
            null,
            "Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites."
          ),
          React.createElement(
            "h4",
            null,
            "ReactJs"
          ),
          React.createElement(
            "h1",
            { onClick: this.clickMeUpdate },
            this.state.text
          )
        ),
        React.createElement(
          "div",
          { className: "col-lg-6" },
          React.createElement(
            "h4",
            null,
            "RequireJs"
          ),
          React.createElement(
            "p",
            null,
            "RequireJS is a JavaScript file and module loader. It is optimized for in-browser use, but it can be used in other JavaScript environments, like Rhino and Node. Using a modular script loader like RequireJS will improve the speed and quality of your code."
          )
        )
      ),
      React.createElement(
        "div",
        { className: "footer" },
        React.createElement(
          "p",
          null,
          "♥ from the Yeoman team"
        )
      )
    );
  }
});

module.exports = Home;

},{}]},{},["/Users/colorvisa/Desktop/workarea/working-on/testing-app/newapp/app/assets/source/test-build.js"]);
