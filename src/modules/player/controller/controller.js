export default class PlayerController {
	constructor(options) {
		if (!options) {
			throw "Model must be set";
		}
		this.model = options.model;
	}
}