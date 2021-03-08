import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmission) {
    super(popupSelector);
    this._formSubmission = formSubmission;
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
    super.setEventListeners();

    let submitButton = this.popup.querySelector("form");
    submitButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmission();
      this.close();
    });
  }

  close() {
    super.close();
    let form = this.popup.querySelector("form");
    form.reset();
  }
}

export default PopupWithForm;
