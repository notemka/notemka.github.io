export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, listener) {
    this.events[name] = this.events[name] || [];
    this.events[name].push(listener);
  }

  emit(name, data) {
    if(this.events[name]) {
      this.events[name].forEach(listener => listener(data));
    }
  }
}
