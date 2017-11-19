import "../css/styles.css";
import "normalize.css";
import json from "../json/data.json";
import { storage } from "./helpers/storage";

import router from "page";
import MessageListController from "./controllers/messageListController";
import NavigationController from "./controllers/navigationController";
import NewMessageController from "./controllers/newMessageController";

if(!localStorage.length) {
  storage.set(json);
}

const listController = new MessageListController();

router.redirect("/", "/inbox");
router("/inbox", () => {
  listController.showInbox();
});
router("/starred", () => {
  listController.showStarred();
});
router("/draft", () => {
  listController.showDraft();
});
router("/deleted", () => {
  listController.showDeleted();
});
router();

new NavigationController();
new NewMessageController();
