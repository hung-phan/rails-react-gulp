require('6to5/polyfill');

let csp = require('js-csp');
let $ = require('jquery');

function listen(el, type) {
  var ch = csp.chan();
  el.addEventListener(type, function(e) {
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
      el.innerHTML = ((e.layerX || e.clientX) + ', ' +
                      (e.layerY || e.clientY));
    }
  });
})
