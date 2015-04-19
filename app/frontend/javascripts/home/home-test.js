let assert = require("assert");

describe('dummy test', () => {
  it('should show something', () => {
    assert.equal(-1, [1,2,3].indexOf(5));
    assert.equal(-1, [1,2,3].indexOf(0));
  });
});
