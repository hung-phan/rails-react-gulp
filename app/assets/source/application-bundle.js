require('6to5/polyfill');

let csp = require('js-csp');

var ch = csp.chan();

csp.go(function*() {
  var v;
  while((v = yield csp.take(ch)) !== csp.CLOSED) {
    console.log(v);
    yield csp.take(csp.timeout(300));
    yield csp.put(ch, 2);
  }
});

csp.go(function*() {
  var v;
  yield csp.put(ch, 1);
  while((v = yield csp.take(ch)) !== csp.CLOSED) {
    console.log(v);
    yield csp.take(csp.timeout(200));
    yield csp.put(ch, 3);
  }
});

csp.go(function*() {
  yield csp.take(csp.timeout(5000));
  ch.close();
});
