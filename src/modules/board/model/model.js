import _ from "underscore";
import BaseModel from "../../base/baseModel";
export default class BoardModel extends BaseModel {
	constructor() {
		super();
		this._markedPositions = [];
		this._lastPosition = null;
		this._hasMoreSteps = true;
	}

	hasMoreSteps() {
		return this._hasMoreSteps;
	}

	setMarker(pos) {
		if (this._isValidSet(pos)) {
			this._markedPositions.push(pos);
			this._lastPosition = pos;
			this._checkIsLastStep();
			return true;
		}
		return false;
	}

	_isValidSet(pos) {
		return this._isValidPosition(pos)
			&& this._isEmptyField(pos);
	}

	_isEmptyField(pos) {
		return _.findIndex(this._markedPositions, pos) === -1;
	}

	_isValidPosition(pos) {
		var x = pos[0], y = pos[1],
			isValid = false;
		if (_.isNull(this._lastPosition) && this._isOnBoard(x, y)) {
			return true;
		}
		isValid =
			this._isOnBoard(x, y) &&
			((x === this._lastPosition[0] - 1 &&
			y === this._lastPosition[1] + 2) ||
			(x === this._lastPosition[0] - 1 &&
			y === this._lastPosition[1] - 2) ||
			(x === this._lastPosition[0] + 1 &&
			y === this._lastPosition[1] - 2) ||
			(x === this._lastPosition[0] + 1 &&
			y === this._lastPosition[1] + 2) ||
			(y === this._lastPosition[1] - 1 &&
			x === this._lastPosition[0] + 2) ||
			(y === this._lastPosition[1] - 1 &&
			x === this._lastPosition[0] - 2) ||
			(y === this._lastPosition[1] + 1 &&
			x === this._lastPosition[0] - 2) ||
			(y === this._lastPosition[1] + 1 &&
			x === this._lastPosition[0] + 2));

		return isValid;
	}

	_isOnBoard(x, y) {
		return x >= 1 &&
		x <= 10 &&
		y >= 1 &&
		y <= 10;
	}

	_getPossibleFields() {
		var l = this._lastPosition;
		return [
			[l[0] - 1, l[1] + 2],
			[l[0] - 1, l[1] - 2],
			[l[0] + 1, l[1] + 2],
			[l[0] + 1, l[1] - 2],
			[l[0] - 2, l[1] + 1],
			[l[0] - 2, l[1] - 1],
			[l[0] + 2, l[1] + 1],
			[l[0] + 2, l[1] - 1]
		]
	}

	_checkIsLastStep() {
		var _possibleFields = this._getPossibleFields(),
			hasField = false;
		_.each(_possibleFields, function(field) {
			if (this._isEmptyField([field[0], field[1]]) && this._isOnBoard(field[0], field[1])) {
				hasField = true;
			}
		}.bind(this));
		if (!hasField) {
			this._hasMoreSteps = false;
			this.emit('no-more-steps');
		}
	}
}