var assert = chai.assert;

import RoomController from "../../../src/modules/room/controller/controller";
import RoomModel from "../../../src/modules/room/model/model";

var roomModelMock = {
	setName : function() {},
	getName : function() { return 'room'; },
	addMemberToRoom : function() {},
	isJoinedMember : function() { return true; },
	isFreeRoom : function() { return true; },
	leaveRoom : function() {}
};

var testEventHandlers = {
	onMemberJoined : function() {},
	onMemberLeft : function() {}
};

var memberMock = {
	getName : function(){}
};
suite('RoomController tests', function() {
	setup(function() {
		this.onMemberJoinedSpy = sinon.spy(testEventHandlers.onMemberJoined);
		this.onMemberLeftSpy   = sinon.spy(testEventHandlers.onMemberLeft);
		this.roomController = new RoomController({
			model : roomModelMock
		});
		this.roomModelMock = sinon.mock(roomModelMock);
		this.memberMock    = sinon.mock(memberMock);
	});
	teardown(function() {
		this.roomModelMock.restore();
		this.memberMock.restore();
		this.roomController.removeListener('member-has-joined', this.onMemberJoinedSpy);
		delete this.roomController;
	});
	test('can join to an existing room', function() {
		this.roomModelMock.expects('isFreeRoom').once().returns(true);
		this.roomModelMock.expects('isJoinedMember').once().returns(false);
		this.roomController.joinRoom(this.memberMock);
		this.roomModelMock.expects('isJoinedMember').once().returns(true);
		assert.isTrue(this.roomController.isJoinedMember(this.memberMock));

	});
	test('cannot join to a room which is full already', function() {
		this.roomModelMock.expects('isFreeRoom').once().returns(false);
		this.roomModelMock.expects('isJoinedMember').once().returns(false);
		assert.throws(function () {
			this.roomController.joinRoom(this.memberMock);
		}.bind(this), 'Room is full')
	});
	test('Cannot join twice to the same room', function() {
		this.roomModelMock.expects('isJoinedMember').once().withArgs(this.memberMock).returns(true);
		assert.throws(function() {
			this.roomController.joinRoom(this.memberMock);
		}.bind(this), 'Already joined to this room');
	});
	test('notifies if a member has joined', function() {
		this.roomModelMock.expects('isJoinedMember').once().withArgs(this.memberMock).returns(false);
		this.roomController.on('member-has-joined', this.onMemberJoinedSpy);
		this.roomController.joinRoom(this.memberMock);
		assert.isTrue(this.onMemberJoinedSpy.calledOnce);

	});
	test('member joined notification sends the member who has been joined', function() {
		this.roomModelMock.expects('isJoinedMember').once().withArgs(this.memberMock).returns(false);
		this.roomController.on('member-has-joined', this.onMemberJoinedSpy);
		this.roomController.joinRoom(this.memberMock);
		assert.isTrue(this.onMemberJoinedSpy.calledWith(this.memberMock));
	});
	test('can leave only that room you are already joined to', function() {
		this.roomController.leaveRoom(this.memberMock);
		this.roomModelMock.expects('isJoinedMember').once().returns(false);
		assert.isFalse(this.roomController.isJoinedMember(this.memberMock));
		this.roomModelMock.expects('isJoinedMember').once().withArgs(this.memberMock).returns(false);
		assert.throw(function() {
			this.roomController.leaveRoom(this.memberMock);
		}.bind(this), 'This member is not joined to this room');
	});
	test('notifies if a member has left', function() {
		this.roomController.on('member-has-left', this.onMemberLeftSpy);
		this.roomController.leaveRoom(this.memberMock);
		assert.isTrue(this.onMemberLeftSpy.calledOnce);
	});
	test('member left notification sends the member who has been left', function() {
		this.roomController.on('member-has-left', this.onMemberLeftSpy);
		this.roomController.leaveRoom(this.memberMock);
		assert.isTrue(this.onMemberLeftSpy.calledWith(this.memberMock));
	});
});