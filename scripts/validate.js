const showInputError = (element, classNameForSpan) => {
  let errorMessage = document.getElementById(`${element.id}-error`);
  errorMessage.classList.remove(classNameForSpan);
  errorMessage.textContent = element.validationMessage;
};

const hideInputError = (element, classNameForSpan) => {
  let errorMessage = document.getElementById(`${element.id}-error`);
  errorMessage.classList.add(classNameForSpan);
};

const isValid = (element, classNameForSpan) => {
  if (!element.validity.valid) {
    showInputError(element, classNameForSpan);
  } else {
    hideInputError(element, classNameForSpan);
  }
};

profilePopupName.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

profilePopupName.addEventListener("input", function () {
  isValid(profilePopupName, "form__span_error");
  toggleButtonState(profilePopupForm, profilePopupCreateButton);
});

profilePopupDescription.addEventListener("input", function () {
  isValid(profilePopupDescription, "form__span_error");
  toggleButtonState(profilePopupForm, profilePopupCreateButton);
});

newCardTitle.addEventListener("input", function () {
  isValid(newCardTitle, "form__span_error");
  toggleButtonState(newCardForm, newCardCreateButton);
});

newCardLink.addEventListener("input", function () {
  isValid(newCardLink, "form__span_error");
  toggleButtonState(newCardForm, newCardCreateButton);
});
