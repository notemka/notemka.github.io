import $ from "jquery";
import View from "../lib/view";
import Notifications from "../shared/notifications";
import router from "page";

export default class NewMessageView extends View {
  constructor() {
    super();
    this.form = $(".form");
    this.closeBtn = this.form.find(".form__link");
    this.fields = this.form.find(".form__field");
    this.notification = new Notifications($(".notification"));
    this.setUpListeners();
  }

  setUpListeners() {
    this.closeBtn.on("click", this.closeForm.bind(this));
    this.form.on("submit", this.saveNewMessage.bind(this));
  }

  showForm() {
    this.form.addClass("form--active");
  }

  hideForm() {
    this.form.removeClass("form--active");
  }

  closeForm(e) {
    e.preventDefault();
    this.hideForm();
  }

  checkFields() {
    const newMsg = {}
    Array.from(this.fields).forEach(field => {
      let value = $(field).val();
      let name = $(field).attr("name");
      if(!value.length) {
        return false;
      } else {
        return newMsg[name] = value;
      }
    });
    return newMsg;
  }

  saveNewMessage(e) {
    e.preventDefault();
    let data = this.checkFields();
    this.emit("message:create", data);
    this.form[0].reset();
  }

  showNewMessageOnList() {
    this.notification.show("Added new message!");
    router("/draft");
  }
}
