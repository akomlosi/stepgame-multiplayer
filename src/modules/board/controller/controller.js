import _ from "underscore";
import BaseController from "../../base/baseController";
export default class BoardController extends BaseController {
	constructor(config) {
		super(config);
		this.model = config.model;
		this._hasMoreSteps = true;
	}

	hasMoreSteps() {
		return this._hasMoreSteps;
	}

	setMarker(pos) {
		if (this._isValidSet(pos)) {
			this.model.setMarker(pos);
			this._checkIsLastStep();
			return true;
		}
		return false;
	}

	_isValidSet(pos) {
		return this._isValidPosition(pos)
			&& this.model.isEmptyField(pos);
	}

	_isValidPosition(pos) {
		var x = pos[0], y = pos[1],
			lastPosition = this.model.getLastPosition(),
			isValid = false;
		if (_.isNull(lastPosition) && this._isOnBoard(x, y)) {
			return true;
		}
		isValid =
			this._isOnBoard(x, y) &&
			((x === lastPosition[0] - 1 &&
			y === lastPosition[1] + 2) ||
			(x === lastPosition[0] - 1 &&
			y === lastPosition[1] - 2) ||
			(x === lastPosition[0] + 1 &&
			y === lastPosition[1] - 2) ||
			(x === lastPosition[0] + 1 &&
			y === lastPosition[1] + 2) ||
			(y === lastPosition[1] - 1 &&
			x === lastPosition[0] + 2) ||
			(y === lastPosition[1] - 1 &&
			x === lastPosition[0] - 2) ||
			(y === lastPosition[1] + 1 &&
			x === lastPosition[0] - 2) ||
			(y === lastPosition[1] + 1 &&
			x === lastPosition[0] + 2));

		return isValid;
	}

	_isOnBoard(x, y) {
		return x >= 1 &&
			x <= 10 &&
			y >= 1 &&
			y <= 10;
	}

	_getPossibleFields() {
		var l = this.model.getLastPosition();
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
		if (_.isNull(this.model.getLastPosition())) {
			return false;
		}
		var _possibleFields = this._getPossibleFields(),
			hasField = false;
		_.each(_possibleFields, function(field) {
			if (this.model.isEmptyField(field) && this._isOnBoard(field[0], field[1])) {
				hasField = true;
			}
		}.bind(this));
		if (!hasField) {
			this._hasMoreSteps = false;
			this.emit('no-more-steps');
		}
	}
}