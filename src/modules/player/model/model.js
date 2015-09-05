export default class PlayerModel {
	constructor(name) {
		if (!name) {
			throw 'Player name must be given!';
		}
		this._name = name;
	}

	getName() {
		return this._name;
	}
}