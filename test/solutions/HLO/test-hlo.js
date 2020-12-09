var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const hello = require('../../../lib/solutions/HLO/hello');

describe('HLO challenge: say Hello World', function() {
	it('should return Hello World', function() {
	    assert.equal(hello(), "Hello, World!");
	});
});