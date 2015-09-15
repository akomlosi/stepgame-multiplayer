import _ from "underscore";
import BaseModel from "../../base/baseModel";
export default class BoardModel extends BaseModel {
	constructor() {
		super();
		this._markedPositions = [];
		this._lastPosition = null;
	}

	isEmptyField(pos) {
		return _.findIndex(this._markedPositions, pos) === -1;
	}

	setMarker(pos) {
		this._markedPositions.push(pos);
		this._lastPosition = pos;
	}

	getLastPosition() {
		return this._lastPosition;
	}
}