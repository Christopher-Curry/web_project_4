import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  imagePopup,
  toggleButtonState,
} from "./utils.js";

const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__subtitle");
const editButton = document.querySelector(".profile__edit-btn");
const addButton = document.querySelector(".profile__add-btn");
const cardsList = document.querySelector(".elements__grid");

/* Profile DOM elements */
const profilePopup = document.querySelector(".form");
const profilePopupName = document.querySelector(".form__full-name");
const profilePopupDescription = document.querySelector(".form__description");
const profilePopupForm = document.querySelector(".form__container");
const profilePopupCreateButton = document.querySelector(".form__save-btn");
const profilePopupCloseButton = document.querySelector(".popup__close-btn");

/* New Card DOM elements */
const newCardPopup = document.querySelector(".profile-popup");
const newCardTitle = document.querySelector(".popup__title");
const newCardLink = document.querySelector(".popup__link");
const newCardCloseButton = document.querySelector(".popup__close-btn_popup");

/* Image Popup DOM elements */

const imagePopupCloseButton = document.querySelector(".popup__close-btn_form");

const initialCards = [
  {
    newTitle: "Yosemite Valley",
    url: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    newTitle: "Lake Louise",
    url: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    newTitle: "Bald Mountains",
    url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    newTitle: "Latemar",
    url: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    newTitle: "Vanoise National Park",
    url: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    newTitle: "Lago di Braies",
    url: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

for (let i = 0; i < initialCards.length; i++) {
  const currentCard = initialCards[i];
  const newCard = new Card(currentCard.newTitle, currentCard.url, ".card");
  const clone = newCard.createCard();
  cardsList.prepend(clone);
}

const editFormValidator = new FormValidator(
  {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-btn",
    inactiveButtonClass: "profile-popup__create-btn_disabled",
    inputErrorClass: ".form__error",
    errorClass: "div-error_inactive",
  },
  document.querySelector(".form__container")
);
editFormValidator.enableValidation();

const addPopupValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__create-btn",
    inactiveButtonClass: "profile-popup__create-btn_disabled",
    inputErrorClass: "profile-popup__error",
    errorClass: "div-error_inactive",
  },
  document.querySelector(".popup__container")
);

addPopupValidator.enableValidation();

function showProfilePopupForm() {
  profilePopupName.value = name.textContent;
  profilePopupDescription.value = description.textContent;
  toggleButtonState(profilePopupForm, profilePopupCreateButton);
  openPopup(profilePopup);
}

function handleEditProfileForm(evt) {
  evt.preventDefault();
  name.textContent = profilePopupName.value;
  description.textContent = profilePopupDescription.value;
  closePopup(profilePopup);
}

function handleAddCardForm(evt) {
  evt.preventDefault();
  const newTitle = newCardTitle.value;
  const url = newCardLink.value;
  const newCard = new Card(newTitle, url, ".card");
  const clone = newCard.createCard();
  cardsList.prepend(clone);
  closePopup(newCardPopup);
}

function closePopupOverlay(evt, thisPopup) {
  const clickedDomElement = evt.target;
  if (clickedDomElement.classList.contains("popup")) {
    closePopup(thisPopup);
  }
}

imagePopup.addEventListener("click", (evt) =>
  closePopupOverlay(evt, imagePopup)
);
newCardPopup.addEventListener("click", (evt) =>
  closePopupOverlay(evt, newCardPopup)
);
profilePopup.addEventListener("click", (evt) =>
  closePopupOverlay(evt, profilePopup)
);

editButton.addEventListener("click", () => showProfilePopupForm(profilePopup));
profilePopupCloseButton.addEventListener("click", () =>
  closePopup(profilePopup)
);

addButton.addEventListener("click", () => openPopup(newCardPopup));
newCardCloseButton.addEventListener("click", () => closePopup(newCardPopup));
imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));
newCardPopup.addEventListener("submit", handleAddCardForm);

profilePopupForm.addEventListener("submit", handleEditProfileForm);
