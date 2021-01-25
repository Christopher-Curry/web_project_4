const form = document.querySelector(".form");
const name = document.querySelector(".profile__title");
const nameInput = document.querySelector(".form__full-name");
const description = document.querySelector(".profile__subtitle");
const descriptionInput = document.querySelector(".form__description");
const closeFormButton = document.querySelector(".popup__close-btn_popup");
const editButton = document.querySelector(".profile__edit-btn");
const submitForm = document.querySelector(".form__container");
const profilePopup = document.querySelector(".profile-popup");
const closePopupButton = document.querySelector(".popup__close-btn");
const addButton = document.querySelector(".profile__add-btn");
const createCardButton = document.querySelector(".popup__create-btn");
const popupTitle = document.querySelector(".popup__title");
const urlLink = document.querySelector(".popup__link");
const elements = document.querySelector(".elements");
const image = document.querySelector(".image");
const imageCloseButton = document.querySelector(".popup__close-btn_form");
const cardsList = document.querySelector(".elements__grid");
const imageTitle = document.querySelector(".image__title");
const srcPicture = document.querySelector(".image__popup");

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

function createCard(newTitle, url) {
  const temp = document.querySelector(".card");
  const clone = temp.content.cloneNode(true);

  const title = clone.querySelector(".elements__title");
  const currentPicture = clone.querySelector(".elements__image");

  currentPicture.src = url;
  currentPicture.alt = newTitle;
  title.textContent = newTitle;

  const heart = clone
    .querySelector(".elements__like-btn")
    .addEventListener("click", function (evt) {
      evt.stopPropagation();
      evt.target.classList.toggle("elements__like-btn_active");
    });

  clone
    .querySelector(".elements__trash")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__group").remove();
    });

  clone
    .querySelector(".elements__image")
    .addEventListener("click", function (evt) {
      openPopup(image);

      imageTitle.textContent = newTitle;
      srcPicture.src = url;
    });

  return clone;
}

function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

for (let i = 0; i < initialCards.length; i++) {
  const currentCard = initialCards[i];
  const clone = createCard(currentCard.newTitle, currentCard.url);
  cardsList.prepend(clone);
}

function showForm() {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  openPopup(form);
}

function saveButton(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(form);
}

function createButton(evt) {
  evt.preventDefault();
  const newTitle = popupTitle.value;
  const url = urlLink.value;
  const clone = createCard(newTitle, url);
  cardsList.prepend(clone);
  closePopup(profilePopup);
}

editButton.addEventListener("click", () => showForm(form));
closePopupButton.addEventListener("click", () => closePopup(form));

addButton.addEventListener("click", () => openPopup(profilePopup));
closeFormButton.addEventListener("click", () => closePopup(profilePopup));

imageCloseButton.addEventListener("click", () => closePopup(image));
createCardButton.addEventListener("click", createButton);

submitForm.addEventListener("submit", saveButton);
