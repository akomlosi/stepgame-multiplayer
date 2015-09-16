var assert = chai.assert;

import RoomController from "../../../src/modules/room/controller/controller";
import RoomModel from "../../../src/modules/room/model/model";

var roomModelStub = {
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
			model : roomModelStub
		});
		this.roomModelStub = sinon.stub(roomModelStub);
		this.memberMock    = sinon.mock(memberMock);
	});
	teardown(function() {
		for (var method in roomModelStub) {
			roomModelStub[method].restore();
		}
		this.memberMock.restore();
		this.roomController.removeListener('member-has-joined', this.onMemberJoinedSpy);
		delete this.roomController;
	});
	test('can join to an existing room', function() {
		this.roomModelStub.isFreeRoom.returns(true);
		this.roomController.joinRoom(this.memberMock);
		this.roomModelStub.isJoinedMember.withArgs(this.memberMock).returns(true);
		assert.isTrue(this.roomController.isJoinedMember(this.memberMock));

	});
	test('cannot join to a room which is full already', function() {
		this.roomModelStub.isFreeRoom.returns(false);
		this.roomModelStub.isJoinedMember.returns(false);
		assert.throws(function () {
			this.roomController.joinRoom(this.memberMock);
		}.bind(this), 'Room is full')
	});
	test('Cannot join twice to the same room', function() {
		this.roomModelStub.isJoinedMember.withArgs(this.memberMock).returns(true);
		assert.throws(function() {
			this.roomController.joinRoom(this.memberMock);
		}.bind(this), 'Already joined to this room');
	});
	test('notifies if a member has joined', function() {
		this.roomModelStub.isJoinedMember.withArgs(this.memberMock).returns(false);
		this.roomModelStub.isFreeRoom.returns(true);
		this.roomController.on('member-has-joined', this.onMemberJoinedSpy);
		this.roomController.joinRoom(this.memberMock);
		assert.isTrue(this.onMemberJoinedSpy.calledOnce);

	});
	test('member joined notification sends the member who has been joined', function() {
		this.roomModelStub.isJoinedMember.withArgs(this.memberMock).returns(false);
		this.roomModelStub.isFreeRoom.returns(true);
		this.roomController.on('member-has-joined', this.onMemberJoinedSpy);
		this.roomController.joinRoom(this.memberMock);
		assert.isTrue(this.onMemberJoinedSpy.calledWith(this.memberMock));
	});
	test('can leave only that room you are already joined to', function() {
		this.roomModelStub.isJoinedMember.withArgs(this.memberMock).returns(false);
		assert.throw(function() {
			this.roomController.leaveRoom(this.memberMock);
		}.bind(this), 'This member is not joined to this room');
	});
	test('notifies if a member has left', function() {
		this.roomModelStub.isJoinedMember.returns(true);
		this.roomController.on('member-has-left', this.onMemberLeftSpy);
		this.roomController.leaveRoom(this.memberMock);
		assert.isTrue(this.onMemberLeftSpy.calledOnce);
	});
	test('member left notification sends the member who has been left', function() {
		this.roomModelStub.isJoinedMember.returns(true);
		this.roomController.on('member-has-left', this.onMemberLeftSpy);
		this.roomController.leaveRoom(this.memberMock);
		assert.isTrue(this.onMemberLeftSpy.calledWith(this.memberMock));
	});
});