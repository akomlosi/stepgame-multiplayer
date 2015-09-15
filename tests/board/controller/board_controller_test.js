var assert = chai.assert;

import BoardController from "../../../src/modules/board/controller/controller";
import _ from "underscore";

var dataProviders = {
	horseSteps : function() {
		return [
			[1, 1],
			[3, 2],
			[1, 3],
			[2, 1]
		];
	},
	outOfBoardSteps : function() {
		return [
			[1, 11],
			[11, 1],
			[10, 13],
			[12, 10],
			[15, 15]
		];
	},
	fullGameSteps : function() {
		return [
			[2, 2],
			[3, 4],
			[4, 2],
			[2, 3],
			[4, 4],
			[3, 2],
			[1, 1]
		]
	}
};

var boardModelStub = {
	isEmptyField    : function() { return true; },
	setMarker       : function() {},
	getLastPosition : function() { return null; }
};

var testEventHandlers = {
	onNoMoreStep : function() {}
};

suite('BoardController tests', function() {
	setup(function() {
		this.testEventHandlerSpy = sinon.spy(testEventHandlers, 'onNoMoreStep');
		this.modelStub = sinon.stub(boardModelStub);
		this.boardController = new BoardController({
			model: boardModelStub
		});
	});
	teardown(function() {
		boardModelStub.isEmptyField.restore();
		boardModelStub.setMarker.restore();
		boardModelStub.getLastPosition.restore();
		this.testEventHandlerSpy.restore();
		this.boardController.removeListener('no-more-steps', this.testEventHandlerSpy);
		delete this.boardController;
	});
	test('free positions can be marked', function() {
		this.modelStub.isEmptyField.withArgs([1, 1]).returns(true);
		this.modelStub.getLastPosition.returns(null);
		assert.isTrue(this.boardController.setMarker([1, 1]));
	});
	test('non-free positions cannot be marked again', function() {
		this.modelStub.isEmptyField.withArgs([1, 1]).onCall(0).returns(true);
		this.modelStub.isEmptyField.withArgs([1, 1]).onCall(1).returns(false);
		this.modelStub.isEmptyField.withArgs([3, 2]).onCall(0).returns(true);
		this.modelStub.isEmptyField.withArgs([3, 2]).onCall(1).returns(false);
		this.modelStub.getLastPosition.returns([3, 2]);
		this.boardController.setMarker([1, 1]);
		assert.isFalse(this.boardController.setMarker([1, 1]));
		this.boardController.setMarker([3, 2]);
		assert.isFalse(this.boardController.setMarker([3, 2]));
		this.modelStub.isEmptyField.withArgs([1, 3]).returns(true);
		// set to a free place should still work
		assert.isTrue(this.boardController.setMarker([1, 3]));
	});
	test('only "horse-step" should be valid', function() {
		this.modelStub.getLastPosition.onFirstCall().returns(null);
		this.modelStub.getLastPosition.onSecondCall().returns(null);
		_.each(dataProviders.horseSteps(), function(step) {
			this.modelStub.isEmptyField.withArgs(step).returns(true);
			assert.isTrue(this.boardController.setMarker(step));
			this.modelStub.getLastPosition.returns(step);
		}.bind(this));
		assert.isFalse(this.boardController.setMarker([1, 4]));
		assert.isFalse(this.boardController.setMarker([10, 10]));
	});
	test('cannot step out of the board', function() {
		_.each(dataProviders.outOfBoardSteps(), function(step) {
			assert.isFalse(this.boardController.setMarker(step));
		}.bind(this));
	});
	test('event fires when no more steps available', function() {
		this.boardController.on('no-more-steps', this.testEventHandlerSpy.bind(this));
		this.modelStub.getLastPosition.returns([3, 2]);
		this.modelStub.isEmptyField.withArgs([1, 1]).onFirstCall().returns(true);
		this.modelStub.isEmptyField.returns(false);
		assert.isFalse(this.testEventHandlerSpy.calledOnce);
		this.boardController.setMarker([1, 1]);
		assert.isTrue(this.testEventHandlerSpy.calledOnce);
	});
	test('hasMoreSteps changes to false when no more steps available', function() {
		assert.isTrue(this.boardController.hasMoreSteps());
		this.modelStub.getLastPosition.returns([3, 2]);
		this.modelStub.isEmptyField.withArgs([1, 1]).onFirstCall().returns(true);
		this.modelStub.isEmptyField.returns(false);
		this.boardController.setMarker([1, 1]);
		assert.isFalse(this.boardController.hasMoreSteps());
	});
});