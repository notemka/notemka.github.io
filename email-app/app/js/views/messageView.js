import $ from "jquery";
import View from "../lib/view";
import messageTemplate from "../../templates/partials/message.pug";
import Notifications from "../shared/notifications";
import { pagePath } from "../helpers/paths";

export default class MessageView extends View {
  constructor(msg) {
    super();
    this.data = msg;
    this.init();
  }

  init() {
    new Promise((resolve, reject) => {
      if (Object.keys(this.data).length > 0) {
        resolve(() => { return this.renderMsg(this.data) });
      } else {
        reject(console.error("Message not render!"));
      }
    })
    .then((result) => {
      this.item = this.data;
      this.msg = $(`[data-id=${this.data.id}]`);
      this.msgText = this.msg.find(".msg-item__text");
      this.actionLink = this.msg.find(".msg-link");
      this.msgToggleLink = this.msg.find(".msg-link--toggle");
      this.msgStarIcon = this.msg.find(".msg-link--star");
      this.msgCheckbox = this.msg.find(".msg-item__checkbox");
      this.notification = new Notifications($(".notification"));
    })
    .then((result) => { this.setUpListeners() })
    .catch((error) => { throw `Error: ${error}` });
  }

  renderMsg() {
    return this.render(messageTemplate, this.data);
  }

  setUpListeners() {
    this.actionLink.on("click", this.msgActions.bind(this));
    this.msgCheckbox.on("change", this.toggleCheckbox.bind(this));
  }

  msgActions(e) {
    e.preventDefault();
    const link = $(e.target);

    if (link.hasClass("msg-link--toggle")) {
      this.toggleMessage();
    }
    if (link.hasClass("msg-link--star")) {
      this.emit("message:star", this.item);

      if (pagePath.isStarred() && this.item.starred) {
        this.removeItem();
      }
      this.markCurrentMsg();
    }
    if (link.hasClass("msg-link--remove")) {
      this.emit("message:delete", this.item);
      this.removeItem();
    }
    if (link.hasClass("msg-link--back")) {
      this.emit("message:inbox", this.item);
      this.removeItem();
    }
  }

  toggleMessage() {
    this.msgText.stop(true, true).slideToggle();
    this.msgToggleLink.toggleClass("msg-link--open");
  }

  markCurrentMsg() {
    this.msgStarIcon.toggleClass("msg-link--marked");
  }

  toggleCheckbox() {
    this.emit("message:check", this.item);
  }

  notify(text) {
    this.notification.show(text);
  }

  removeItem() {
    this.msg.remove();
  }
}
