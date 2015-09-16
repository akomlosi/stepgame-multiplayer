import BaseModel from '../../base/baseModel';
import _ from 'underscore';
export default class RoomModel extends BaseModel {
	constructor(config) {
		super(config);
		this._owner = config.owner;
		this._joinedMember = null;
	}

	getOwner() {
		return this._owner;
	}

	addMemberToRoom(member) {
		if (!_.isNull(this._joinedMember)) {
			throw 'Cannot add more member to this room';
		}
		this._joinedMember = member;
	}

	isJoinedMember(member) {
		return this._joinedMember === member;
	}

	isFreeRoom() {
		return this._joinedMember === null;
	}

	leaveRoom(member) {
		if (this._joinedMember !== member) {
			throw 'This is not a joined member';
		}
		this._joinedMember = null;
	}
}