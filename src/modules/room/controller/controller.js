import _ from "underscore";
import BaseController from "../../base/baseController";
export default class RoomController extends BaseController {
	constructor(config) {
		super();
		this.name = config.name || 'room-' + new Date().getTime();
		this.model = config.model;
		this.model.setName(this.name);
	}

	getName() {
		return this.model.getName();
	}

	joinRoom(member) {
		if (this.model.isJoinedMember(member)) {
			throw 'Already joined to this room';
		}
		if (!this.model.isFreeRoom()) {
			throw 'Room is full';
		}
		this.model.addMemberToRoom(member);
		this.emit('member-has-joined', member);
	}

	leaveRoom(member) {
		if (this.model.isJoinedMember(member)) {
			this.model.leaveRoom(member);
			this.emit('member-has-left', member);
		}
		else {
			throw 'This member is not joined to this room';
		}
	}

	isJoinedMember(member) {
		return this.model.isJoinedMember(member);
	}
}