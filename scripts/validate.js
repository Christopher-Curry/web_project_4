const showInputError = (element, classNameForSpan) => {
  const errorMessage = document.getElementById(`${element.id}-error`);
  errorMessage.classList.remove(classNameForSpan);
  errorMessage.textContent = element.validationMessage;
};

const hideInputError = (element, classNameForSpan) => {
  const errorMessage = document.getElementById(`${element.id}-error`);
  errorMessage.classList.add(classNameForSpan);
};

const isValid = (element, classNameForSpan) => {
  if (!element.validity.valid) {
    showInputError(element, classNameForSpan);
  } else {
    hideInputError(element, classNameForSpan);
  }
};

function toggleButtonState(form, buttonElement, inactiveButtonClass) {
  if (!form.checkValidity()) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

toggleButtonState(
  newCardForm,
  newCardCreateButton,
  "profile-popup__create-btn_disabled"
);

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const form = document.querySelector(formSelector);
  const submitButton = document.querySelector(submitButtonSelector);
  const allInputs = document.querySelectorAll(inputSelector);

  allInputs.forEach((element) => {
    element.addEventListener("input", function () {
      isValid(element, errorClass);
      toggleButtonState(form, submitButton, inactiveButtonClass);
    });
  });
}

enableValidation({
  formSelector: ".form__container",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  inactiveButtonClass: "profile-popup__create-btn_disabled",
  inputErrorClass: ".form__error",
  errorClass: "div-error_inactive",
});

enableValidation({
  formSelector: ".popup__container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__create-btn",
  inactiveButtonClass: "profile-popup__create-btn_disabled",
  inputErrorClass: "profile-popup__error",
  errorClass: "div-error_inactive",
});
