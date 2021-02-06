const showInputError = (element, classNameForInput, classNameForSpan) => {
  console.log(element.validity);
  element.classList.add(classNameForInput);
  let errorMessage = document.getElementById(`${element.id}-error`);
  errorMessage.classList.remove(classNameForSpan);
};

const hideInputError = (element, classNameForInput, classNameForSpan) => {
  element.classList.remove(classNameForInput);
  let errorMessage = document.getElementById(`${element.id}-error`);
  errorMessage.classList.add(classNameForSpan);
};

const isValid = (element, classNameForInput, classNameForSpan) => {
  if (!element.validity.valid) {
    showInputError(element, classNameForInput, classNameForSpan);
  } else {
    hideInputError(element, classNameForInput, classNameForSpan);
  }
};

profilePopupName.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

profilePopupName.addEventListener("input", function (evt) {
  console.log(evt);
  isValid(
    profilePopupName,
    "form__full-name_error",
    "form__full-name_span_error"
  );
});

profilePopupDescription.addEventListener("input", function () {
  isValid(
    profilePopupDescription,
    "form__full-name_error",
    "form__full-name_span_error"
  );
});
