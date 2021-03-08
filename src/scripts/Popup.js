class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);

    // Maybe there's a better way to do this
    this._open = this._open.bind(this);
    this._setEventListeners = this._setEventListeners.bind(this);
    this._close = this._close.bind(this);
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

  _setEventListeners() {
    const closeButton = this.popup.querySelector(".popup__close-btn");
    closeButton.addEventListener("click", this.close);
    this.popup.addEventListener("click", this._closePopupOverlay);
  }

  _open() {
    this.popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _close() {
    this.popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;
