class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;

    this._formElement = formElement;
  }

  _showInputError(element, classNameForSpan) {
    const errorMessage = this._formElement.querySelector(
      `#${element.id}-error`
    );
    errorMessage.classList.remove(classNameForSpan);
    errorMessage.textContent = element.validationMessage;
  }

  _hideInputError(element, classNameForSpan) {
    const errorMessage = this._formElement.querySelector(
      `#${element.id}-error`
    );
    errorMessage.classList.add(classNameForSpan);
  }

  _isValid(element, classNameForSpan) {
    if (!element.validity.valid) {
      this._showInputError(element, classNameForSpan);
    } else {
      this._hideInputError(element, classNameForSpan);
    }
  }

  toggleButtonState(form, buttonElement, inactiveButtonClass) {
    if (!form.checkValidity()) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  enableValidation() {
    const form = this._formElement;
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    const allInputs = this._formElement.querySelectorAll(this._inputSelector);
    // Resets the form when you close it
    this._formElement.addEventListener("reset", () => {
      allInputs.forEach((inputElement) => {
        this._hideInputError(inputElement, this._errorClass);
        this.toggleButtonState(form, submitButton, this._inactiveButtonClass);
      });
    });

    allInputs.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element, this._errorClass);
        this.toggleButtonState(form, submitButton, this._inactiveButtonClass);
      });
    });
  }
}

export { FormValidator };
