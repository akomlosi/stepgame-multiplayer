var assert = chai.assert;

import PlayerController from "../../../src/modules/player/controller/controller";
import PlayerModel from "../../../src/modules/player/model/model";

suite('PlayerController tests', function() {
	setup(function(){
		this.playerController = new PlayerController({
			model: new PlayerModel('Skipper')
		});
	});
    test('must have a model', function() {
		assert.isTrue(this.playerController.model instanceof PlayerModel);
    });

	test('should throw an error if the model is missing', function(){
		assert.throws(function() {new PlayerController()}, "Model must be set");
	});
});