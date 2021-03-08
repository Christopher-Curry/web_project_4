import "../pages/index.css";

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const editButton = document.querySelector(".profile__edit-btn");
const addButton = document.querySelector(".profile__add-btn");

/* Profile DOM elements */
const profilePopupName = document.querySelector(".form__full-name");
const profilePopupDescription = document.querySelector(".form__description");

/* New Card DOM elements */
const newCardTitle = document.querySelector(".popup__title");
const newCardLink = document.querySelector(".popup__link");

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

// Set up form validation for editForm
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

// Set up form validation for addForm
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

const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__subtitle",
});

// Make image popup
const myNewPopupWithImage = new PopupWithImage(
  ".card-image-popup",
  ".image__popup",
  ".image__title"
);
myNewPopupWithImage.setEventListeners();

// Make edit profile popup
const editProfilePopup = new PopupWithForm(
  ".edit-profile-popup",
  (obj) => userInfo.setUserInfo(obj.full_name, obj.about_me),
  ".form__input"
);
editProfilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  profilePopupName.value = values.userName;
  profilePopupDescription.value = values.userJob;
  editProfilePopup.open();
});

// Make add card popup
const addCardPopup = new PopupWithForm(
  ".add-card-popup",
  (obj) => {
    const newCard = new Card(
      obj.link_title,
      obj.url_address,
      ".card",
      myNewPopupWithImage.open
    );
    const clone = newCard.createCard();
    cardSection.addItem(clone);
  },
  ".popup__input"
);
addCardPopup.setEventListeners();

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Set up section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = new Card(
        card.newTitle,
        card.url,
        ".card",
        myNewPopupWithImage.open
      );
      return newCard.createCard();
    },
  },
  ".elements__grid"
);
cardSection.renderItems();
