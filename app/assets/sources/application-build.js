require('babel/polyfill');

let csp = require('js-csp');
let $ = require('jquery');

function listen(el, type) {
  var ch = csp.chan();
  el.addEventListener(type, function(e) {
    console.time("listen-event");
    csp.putAsync(ch, e);
  });
  return ch;
}

$(document).ready(() => {
  csp.go(function*() {
    var el = document.getElementById('ui');
    var ch = listen(el, 'mousemove');
    while(true) {
      var e = yield csp.take(ch);
      console.timeEnd("listen-event");
      el.innerHTML = ((e.layerX || e.clientX) + ', ' +
                      (e.layerY || e.clientY));
    }
  });
})