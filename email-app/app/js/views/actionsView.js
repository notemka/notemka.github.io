import $ from "jquery";
import View from "../lib/view";

export default class ActionsView extends View {
  constructor() {
    super();
    this.actions = $(".actions");
    this.button = this.actions.find(".button");
    this.mainCheckbox = this.actions.find(".actions__checkbox");
    this.setUpListeners();
  }

  setUpListeners() {
    this.button.on("click", this.buttonActions.bind(this));
    this.mainCheckbox.on("change", this.checkAllMsgs.bind(this));
  }

  buttonActions(e) {
    e.preventDefault();
    const btn = $(e.target);
    const action = btn.data("action");

    if (action === "new") {
      this.showForm();
    }
    else {
      this.emit("actions:moveMarkedMsgs", action);
    }
  }

  moveMessages(msgs, action) {
    msgs.forEach(msg => {
      if (action === "starred") {
        this.emit("message:star", msg);
      } else {
        this.emit("message:delete", msg);
      }
    });
  }

  showForm() {
    this.emit("form:toggle");
  }

  checkAllMsgs() {
    const isChecked = this.mainCheckbox.is(":checked");
    this.emit("actions:changeCheckboxes", isChecked);
  }
}
