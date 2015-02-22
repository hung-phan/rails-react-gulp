// __tests__/sum-test.js
jest.dontMock('../app/assets/sources/sum-build');

describe('sum', function() {
 it('adds 1 + 2 to equal 3', function() {
   var sum = require('../app/assets/sources/sum-build');
   expect(sum(1, 2)).toBe(3);
 });
});
