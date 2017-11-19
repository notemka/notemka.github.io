import Controller from "../lib/controller";
import NewMessageView from "../views/newMessageView";
import { pagePath } from "../helpers/paths";

export default class NewMessageController extends Controller {
  constructor() {
    super();
    this.newMsgView = new NewMessageView();
    this.newMsgView.on("message:create", this.createNewMessage.bind(this));
  }

  createNewMessage(data) {
    this.addMessage(data.title, data.text);
    this.newMsgView.showNewMessageOnList();
  }
}
