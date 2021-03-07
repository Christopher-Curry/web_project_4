import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(src, textContent) {
    super.open();
    console.log(src, textContent);
    let image = this.popup.querySelector(".image__popup");
    image.src = src;

    let title = this.popup.querySelector(".image__title");
    title.textContent = textContent;
  }
}

export default PopupWithImage;
