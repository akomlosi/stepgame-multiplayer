var assert = chai.assert;

import BoardModel from "../../../src/modules/board/model/model";
import _ from "underscore";
import Events from "events";


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

suite('BoardModel tests', function() {
	setup(function() {
		this.boardModel = new BoardModel();
		this.noMoreSteps = false;
		this.onNoMoreSteps = function() {
			this.noMoreSteps = true;
		};
	});
	teardown(function() {
		this.boardModel.removeListener('no-more-steps', this.onNoMoreSteps.bind(this));
		delete this.boardModel;
	});
	test('free positions can be marked and should return true', function() {
		assert.isTrue(this.boardModel.setMarker([1, 1]));
	});
	test('non-free positions cannot be marked again', function() {
		this.boardModel.setMarker([1, 1]);
		this.boardModel.setMarker([3, 2]);
		assert.isFalse(this.boardModel.setMarker([1, 1]));
		assert.isFalse(this.boardModel.setMarker([3, 2]));
		// set to a free place should still work
		assert.isTrue(this.boardModel.setMarker([1, 3]));
	});
	test('only "horse-step" should be valid', function() {
		_.each(dataProviders.horseSteps(), function(step) {
			assert.isTrue(this.boardModel.setMarker(step));
		}.bind(this));
		assert.isFalse(this.boardModel.setMarker([1, 4]));
		assert.isFalse(this.boardModel.setMarker([10, 10]));
	});
	test('cannot step out of the board', function() {
		_.each(dataProviders.outOfBoardSteps(), function(step) {
			assert.isFalse(this.boardModel.setMarker(step));
		}.bind(this));
	});
	test('event fires when no more steps available', function() {
		this.boardModel.on('no-more-steps', this.onNoMoreSteps.bind(this));
		assert.isFalse(this.noMoreSteps);
		_.each(dataProviders.fullGameSteps(), function(step) {
			assert.isFalse(this.noMoreSteps);
			this.boardModel.setMarker(step);
		}.bind(this));
		assert.isTrue(this.noMoreSteps);
	});
	test('hasMoreSteps changes to false when no more steps available', function() {
		assert.isTrue(this.boardModel.hasMoreSteps());
		_.each(dataProviders.fullGameSteps(), function(step) {
			assert.isTrue(this.boardModel.hasMoreSteps());
			this.boardModel.setMarker(step);
		}.bind(this));
		assert.isFalse(this.boardModel.hasMoreSteps());
	});
});