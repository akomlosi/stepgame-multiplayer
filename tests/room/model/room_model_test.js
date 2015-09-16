var assert = chai.assert;

import RoomModel from "../../../src/modules/room/model/model";
import PlayerModel from "../../../src/modules/player/model/model";

var RoomOwnerMock = {
	getName : function () { return 'Owner'; }
};
var PlayerMock = {
	getName : function() { return 'Kovalsky'; }
};
var PlayerMock2 = {
	getName : function() { return 'Skipper'; }
};

suite('RoomModel tests', function() {
	setup(function() {
		this.roomModel = new RoomModel({
			owner : RoomOwnerMock
		});
	});
	teardown(function() {
		delete this.roomModel;
	});
	test('room must have an owner', function() {
		assert.deepEqual(this.roomModel.getOwner(), RoomOwnerMock);
	});
	test('room name can be set', function() {

	});
	test('can join to a room', function() {
		assert.doesNotThrow(function() {this.roomModel.addMemberToRoom(PlayerMock);
		}.bind(this), 'Cannot add more member to this room');
		assert.throw(function() {this.roomModel.addMemberToRoom(PlayerMock);
		}.bind(this), 'Cannot add more member to this room');
	});
	test('can tell if a member is already joined or not', function() {
		assert.isFalse(this.roomModel.isJoinedMember(PlayerMock));
		this.roomModel.addMemberToRoom(PlayerMock);
		assert.isTrue(this.roomModel.isJoinedMember(PlayerMock));
	});
	test('can tell if a room is free or not', function() {
		assert.isTrue(this.roomModel.isFreeRoom());
		this.roomModel.addMemberToRoom(PlayerMock);
		assert.isFalse(this.roomModel.isFreeRoom());
	});
	test('can leave a room', function() {
		this.roomModel.addMemberToRoom(PlayerMock);
		this.roomModel.leaveRoom(PlayerMock);
		assert.isTrue(this.roomModel.isFreeRoom());
	});
	test('leave room can be called by a joined member only', function() {
		this.roomModel.addMemberToRoom(PlayerMock2);
		assert.throw(function() {
				this.roomModel.leaveRoom(PlayerMock);
			}.bind(this), 'This is not a joined member'
		);
	});
});