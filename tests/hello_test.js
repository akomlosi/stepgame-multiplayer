var assert = chai.assert;
mocha.setup('tdd');

suite('hello test with mocha', function(){
	test('should greet Roger', function(){
		assert.isTrue(hello('Roger') === 'hello Roger');
	});
});