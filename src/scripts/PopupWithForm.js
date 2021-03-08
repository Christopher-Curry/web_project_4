import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmission) {
    super(popupSelector);
    this._formSubmission = formSubmission;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super._setEventListeners();

    let submitButton = this.popup.querySelector("form");
    submitButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmission();
      this.close();
    });
  }

  open() {
    super._open();
  }

  close() {
    super._close();
    let form = this.popup.querySelector("form");
    form.reset();
  }
}

export default PopupWithForm;
