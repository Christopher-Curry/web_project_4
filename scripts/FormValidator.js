import { toggleButtonState } from "./utils.js";

class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._formElement = formElement;
  }

  _showInputError(element, classNameForSpan) {
    const errorMessage = document.getElementById(`${element.id}-error`);
    errorMessage.classList.remove(classNameForSpan);
    errorMessage.textContent = element.validationMessage;
  }

  _hideInputError(element, classNameForSpan) {
    const errorMessage = document.getElementById(`${element.id}-error`);
    errorMessage.classList.add(classNameForSpan);
  }

  _isValid(element, classNameForSpan) {
    if (!element.validity.valid) {
      this._showInputError(element, classNameForSpan);
    } else {
      this._hideInputError(element, classNameForSpan);
    }
  }

  enableValidation() {
    const form = this._formElement;
    const submitButton = document.querySelector(this._submitButtonSelector);
    const allInputs = document.querySelectorAll(this._inputSelector);

    allInputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element, this._errorClass);
        toggleButtonState(form, submitButton, this._inactiveButtonClass);
      });
    });
  }
}

export { FormValidator };
