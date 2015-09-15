var assert = chai.assert;

import RoomModel from "../../../src/modules/room/model/model";
import PlayerModel from "../../../src/modules/player/model/model";
suite('RoomModel tests', function() {
	setup(function() {
		this.roomModel = new RoomModel({
			owner : new PlayerModel('new player')
		});
	});
	teardown(function() {
		delete this.roomModel;
	});
	test('can create a room', function() {
	});
	test('can delete a room', function() {
	});
	test('can tell is a room exists or not', function() {
	});
	test('can join to a room', function() {
	});
	test('can tell if a member is already joined or not', function() {
	});
	test('can tell if a room is full or not', function() {
	});
	test('can leave a room', function() {});
});