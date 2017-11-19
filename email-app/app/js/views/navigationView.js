import $ from "jquery";
import View from "../lib/view";

export default class NavigationView extends View {
  constructor() {
    super();
    this.navLink = $(".header-nav__link");
    this.setUpListeners();
  }

  setUpListeners() {
    this.navLink.on("click", this.changeActiveLink.bind(this));
  }

  changeActiveLink(e) {
    const list = $(e.target).data("list");
    this.highlightActiveLink(list);
  }

  highlightActiveLink(list) {
    const activeClass = "header-nav__link--active";
    const link = $(`[data-list='${list}']`);
    link.addClass(activeClass).siblings().removeClass(activeClass);
  }
}
