class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);

    this.open = this.open.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.close = this.close.bind(this);
    this._closePopupOverlay = this._closePopupOverlay.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(this.popup);
    }
  }

  _closePopupOverlay(evt) {
    const clickedDomElement = evt.target;
    if (clickedDomElement.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close-btn");
    closeButton.addEventListener("click", this.close);
    this.popup.addEventListener("click", this._closePopupOverlay);
  }

  open() {
    this.popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;
