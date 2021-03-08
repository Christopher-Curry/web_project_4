import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  setEventListeners() {
    super._setEventListeners();
  }

  close() {
    super._close();
  }

  open(src, textContent) {
    super._open();
    let image = this.popup.querySelector(this._imageSelector);
    image.src = src;

    let title = this.popup.querySelector(this._titleSelector);
    title.textContent = textContent;
  }
}

export default PopupWithImage;
