import { storage } from "../helpers/storage";
import Model from "./model";
import View from "./view";

export default class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.model.on("change", this.updateModel.bind(this));
  }

  updateModel(state) {
    storage.set(state);
  }

  addMessage(title, text) {
    return this.model.add({
      id: Date.now(),
      title,
      text,
      status: "draft",
      inbox: false,
      starred: false,
      deleted: false,
      draft: true,
      checked: false
    });
  }

  moveTo(item, propObj, status) {
    const newStatus = Array.isArray(status) ? status : [status];
    item["status"] = newStatus;
    this.model.update(item.id, propObj);
  }
}
