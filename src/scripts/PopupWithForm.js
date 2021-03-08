import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmission) {
    super(popupSelector);
    this.formSubmission = formSubmission;
  }
  _getInputValues() {
    // to do
  }

  setEventListeners() {
    super.setEventListeners();

    let submitButton = this.popup.querySelector("form");
    submitButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.formSubmission();
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