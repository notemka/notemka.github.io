import $ from "jquery";

export default class Notifications {
  constructor(el) {
    this.notifyElement = el;
    this.setUpListeners();
  }

  setUpListeners() {
    this.notifyElement.on("click", this.hide.bind(this));
  }

  show(message) {
    this.notifyElement.text(message).addClass("notification--active");
    setTimeout(() => {
      this.hide();
    }, 3500);
  }

  hide() {
    this.notifyElement.removeClass("notification--active");
  }
}
