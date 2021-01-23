let form = document.querySelector(".form");
let name = document.querySelector(".profile__title");
let input = document.querySelector(".form__full-name");
let description = document.querySelector(".profile__subtitle");
let descriptionInput = document.querySelector(".form__description");
let closeButton = document.querySelector(".form__close-btn");
let editButton = document.querySelector(".profile__edit-btn");
let submitForm = document.querySelector(".form__container");
let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close-btn");
let addButton = document.querySelector(".profile__add-btn");
let createCard = document.querySelector(".popup__create-btn");
let popupTitle = document.querySelector(".popup__title");
let urlLink = document.querySelector(".popup__link");
let elements = document.querySelector(".elements");

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

function elementImages(newTitle, url) {
  let temp = document.querySelector(".card");
  let clone = temp.content.cloneNode(true);

  let title = clone.querySelector(".elements__title");
  let image = clone.querySelector(".elements__image");

  image.src = url;
  title.textContent = newTitle;

  let heart = clone
    .querySelector(".elements__like-btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like-btn_active");
    });

  let list = document.querySelector(".elements__grid");
  let child = list.prepend(clone);

  let allCards = document.querySelectorAll(".elements__group");
  let firstCard = allCards[0];
  let lastTrash = firstCard
    .querySelector(".elements__trash")
    .addEventListener("click", function (evt) {
      firstCard.remove();
      console.log("clicked");
    });
}

for (let i = 0; i < initialCards.length; i++) {
  let currentCard = initialCards[i];
  elementImages(currentCard.newTitle, currentCard.url);
}

function showForm() {
  input.value = name.textContent;
  descriptionInput.value = description.textContent;
  form.classList.add("form_active");
}

function closeForm() {
  form.classList.remove("form_active");
}

function saveButton(evt) {
  evt.preventDefault();
  name.textContent = input.value;
  description.textContent = descriptionInput.value;
  closeForm();
}

function showPopup() {
  popup.classList.add("popup_active");
}

function endPopup() {
  popup.classList.remove("popup_active");
}

function createButton(evt) {
  evt.preventDefault();
  let newTitle = popupTitle.value;
  let url = urlLink.value;
  elementImages(newTitle, url);
  endPopup();
}

createCard.addEventListener("click", createButton);
addButton.addEventListener("click", showPopup);
closePopup.addEventListener("click", endPopup);
closeButton.addEventListener("click", closeForm);
editButton.addEventListener("click", showForm);
submitForm.addEventListener("submit", saveButton);
