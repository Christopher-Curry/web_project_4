class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    for (let i = 0; i < this._initialArray.length; i++) {
      let curVal = this._initialArray[i];
      let element = this._renderer(curVal);
      this.addItem(element);
    }
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
