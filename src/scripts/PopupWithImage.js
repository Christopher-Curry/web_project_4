import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;

    this.open = this.open.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }

  open(src, textContent) {
    super.open();
    const image = this.popup.querySelector(this._imageSelector);
    image.src = src;

    const title = this.popup.querySelector(this._titleSelector);
    title.textContent = textContent;
  }
}

export default PopupWithImage;
