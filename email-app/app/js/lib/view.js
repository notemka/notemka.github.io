import EventEmitter from "../helpers/eventEmitter";

export default class View extends EventEmitter {
  constructor() {
    super();
  }

  render(template, data) {
    if (data) {
      return template(data);
    } else {
      return template;
    }
  }

  clear(el, actions) {
    el.html("");
    this.unsubscribe(actions || {});
  }

  subscribe(actions) {
    if (Object.keys(actions).length) {
      Object.keys(actions).forEach((item) => {
        let action = item.split(" ");
        $(action[0]).on(action[1], this.actions[item]);
      });
    }
  }

  unsubscribe(actions) {
    if (Object.keys(actions).length) {
      Object.keys(actions).forEach((item) => {
        let action = item.split(" ");
        $(action[0]).off(action[1], this.actions[item]);
      });
    }
  }
}
