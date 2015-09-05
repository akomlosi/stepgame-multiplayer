var assert = chai.assert;

import PlayerModel from "../../../src/modules/player/model/model";

suite('PlayerModel tests', function() {
    test('must be initialized with a name', function() {
        var playerModel = new PlayerModel('Kovalsky');
        assert.isTrue(playerModel.getName() === 'Kovalsky');
        var playerModel = new PlayerModel('Skipper');
        assert.isTrue(playerModel.getName() === 'Skipper');
    });

    test('should throw an error if it is initiated without name', function() {
        assert.throws(function() {new PlayerModel()}, 'Player name must be given!');
    });
});