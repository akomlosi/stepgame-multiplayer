import _ from "underscore";
export default class BoardModel {
	constructor() {
		this._markedPositions = [];
		this._lastPosition = null;
	}

	setMarker(pos) {
		if (this._isValidSet(pos)) {
			this._markedPositions.push(pos);
			this._lastPosition = pos;
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
}