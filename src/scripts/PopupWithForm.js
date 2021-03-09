import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmission, inputClassSelector) {
    super(popupSelector);
    this._formSubmission = formSubmission;
    this._inputClassSelector = inputClassSelector;
    this.close = this.close.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
  }
  _getInputValues() {
    this._inputList = this.popup.querySelectorAll(this._inputClassSelector);

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    const submitForm = this.popup.querySelector("form");
    submitForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmission(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    const form = this.popup.querySelector("form");
    form.reset();
  }
}

export default PopupWithForm;
