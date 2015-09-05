import ApplicationController from "./ApplicationController";
import Events from "events";

export default class Application {
    constructor() {
        window.app = this;
        this.mediator = new Events.EventEmitter();
        this.controllers = {
        };
        this.applicationController = new ApplicationController(this.controllers);
    }
};