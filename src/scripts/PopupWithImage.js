import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._imageSelector = imageSelector;
    this._titleSelector = titleSelector;
  }
  open(src, textContent) {
    super.open();
    console.log(src, textContent);
    let image = this.popup.querySelector(this._imageSelector);
    image.src = src;

    let title = this.popup.querySelector(this._titleSelector);
    title.textContent = textContent;
  }
}

export default PopupWithImage;
