class PagePath {
  constructor() {
    this.location = window.location;
  }

  currentPath() {
    return this.location.pathname.slice(1);
  }

  checkPath(path) {
    return this.location.pathname == path ? true : false;
  }

  isInbox() {
    return this.checkPath("/inbox");
  }

  isDraft() {
    return this.checkPath("/draft");
  }

  isStarred() {
    return this.checkPath("/starred");
  }

  isDeleted() {
    return this.checkPath("/deleted");
  }
}

const pagePath = new PagePath();
export { pagePath };
