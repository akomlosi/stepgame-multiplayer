var assert = chai.assert;

import BoardModel from "../../../src/modules/board/model/model";
import _ from "underscore";

var dataProviders = {};

suite('BoardModel tests', function() {
	setup(function() {
		this.boardModel = new BoardModel();
	});
	teardown(function() {
		delete this.boardModel;
	});
	test('can tell if a position is free or not', function() {
		assert.isTrue(this.boardModel.isEmptyField([1, 1]));
		assert.isTrue(this.boardModel.isEmptyField([3, 2]));
		this.boardModel.setMarker([1, 1]);
		assert.isFalse(this.boardModel.isEmptyField([1, 1]));
	});
	test('can mark a field if it is still empty', function() {
		this.boardModel.setMarker([1, 1]);
		assert.isFalse(this.boardModel.isEmptyField([1, 1]));
	});
	test('can return the last step (position)', function() {
		assert.isNull(this.boardModel.getLastPosition());
		this.boardModel.setMarker([1, 1]);
		assert.deepEqual(this.boardModel.getLastPosition(), [1, 1]);
		this.boardModel.setMarker([3, 2]);
		assert.deepEqual(this.boardModel.getLastPosition(), [3, 2]);
	});
});