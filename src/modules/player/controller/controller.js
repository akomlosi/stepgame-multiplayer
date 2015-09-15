import BaseController from "../../base/baseController";
export default class PlayerController extends BaseController {
	constructor(options) {
		super();
		if (!options) {
			throw "Model must be set";
		}
		this.model = options.model;
	}
}