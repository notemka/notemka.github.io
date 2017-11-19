const LS = localStorage;

class Storage {
  constructor(name) {
    this.name = name;
  }

  get() {
    const localData = LS.getItem(this.name);
    return JSON.parse(localData);
  }

  set(data) {
    LS.setItem(this.name, JSON.stringify(data));
  }
}

const storage = new Storage("messages");
const state = storage.get() || undefined;
export { storage, Storage, state };
