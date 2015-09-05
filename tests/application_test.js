var assert = chai.assert;

import Application from "../src/Application.js";

suite('Application tests', function() {
	setup(function() {
		this.app = new Application();
	});
	test('Should be available in window', function() {
		assert.isTrue(window.app instanceof Application, 'it should be in the window scope as window.app');
	});

	test('should have a mediator', function() {
		assert.isFunction(this.app.mediator, 'it should be a function');
	});

	test('should create an application controller', function() {
		assert.isFunction(this.app.applicationController);
	});
});