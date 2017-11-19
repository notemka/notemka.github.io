import Model from "../lib/model";

export default class MessageListModel extends Model {
  constructor() {
    super();
    this.listStatus = "inbox || starred";
  }

  filterMessages() {
    this.messages = this.getData() || [];

    return this.messages.filter(msg => {
      if (msg[this.listStatus]) {
        return msg;
      }
    });
  }

  returnMarkedMsgs() {
    const currentList = this.filterMessages();
    return currentList.filter((item) => {
      if (item.checked) { return item };
    });
  }

  uncheckAllMsgs() {
    return this.messages.filter(msg => {
      this.update(msg.id, { "checked": false });
    });
  }
}
