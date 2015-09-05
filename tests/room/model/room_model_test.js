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
	test('Room should have an owner', function() {
	});
});