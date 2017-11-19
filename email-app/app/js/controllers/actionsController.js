import Controller from "../lib/controller";

export default class ActionsController extends Controller {
  constructor(listModel, actionsView) {
    super();
    this.msgListModel = listModel;
    this.actionsView = actionsView;

    this.actionsView.on("actions:moveMarkedMsgs", this.moveMarkedList.bind(this));
  }

  moveMarkedList(action) {
    const checkedMsgs = this.msgListModel.returnMarkedMsgs()
    this.actionsView.moveMessages(checkedMsgs, action);
  }
}
