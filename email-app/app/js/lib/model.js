import EventEmitter from "../helpers/eventEmitter";
import { state } from "../helpers/storage";

export default class Model extends EventEmitter {
  constructor() {
    super();
    this.dataList = state;
  }

  getData() {
    return this.dataList;
  }

  get(id) {
    return this.dataList.find(item => item.id === id);
  }

  add(item) {
    this.dataList.push(item);
    this.emit("change", this.dataList);
    return item;
  }

  update(id, data) {
    const item = this.get(id);
    Object.keys(data).forEach(prop => item[prop] = data[prop])

    this.emit("change", this.dataList);
    return item;
  }

  remove(id) {
    const item = this.get(id);
    const index = this.dataList.findIndex(element => element.id === id);
    const status = item.deleted || item.draft;

    if (index > -1 && status) {
      this.dataList.splice(index, 1);
    }
    this.emit("change", this.dataList);
  }
}
