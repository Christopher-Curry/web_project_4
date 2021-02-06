const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__subtitle");
const editButton = document.querySelector(".profile__edit-btn");
const addButton = document.querySelector(".profile__add-btn");
const cardsList = document.querySelector(".elements__grid");
const elements = document.querySelector(".elements");

/* Profile DOM elements */
const profilePopup = document.querySelector(".form");
const profilePopupName = document.querySelector(".form__full-name");
const profilePopupDescription = document.querySelector(".form__description");
const profilePopupForm = document.querySelector(".form__container");
const profilePopupCloseButton = document.querySelector(".popup__close-btn");

/* New Card DOM elements */
const newCardPopup = document.querySelector(".profile-popup");
const newCardTitle = document.querySelector(".popup__title");
const newCardLink = document.querySelector(".popup__link");
const newCardCreateButton = document.querySelector(".popup__create-btn");
const newCardCloseButton = document.querySelector(".popup__close-btn_popup");

/* Image Popup DOM elements */
const imagePopup = document.querySelector(".image");
const imagePopupCloseButton = document.querySelector(".popup__close-btn_form");
const imagePopupTitle = document.querySelector(".image__title");
const imagePopupSrc = document.querySelector(".image__popup");

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
      openPopup(imagePopup);

      imagePopupTitle.textContent = newTitle;
      imagePopupSrc.src = url;
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
  profilePopupName.value = name.textContent;
  profilePopupDescription.value = description.textContent;
  openPopup(profilePopup);
}

function saveButton(evt) {
  evt.preventDefault();
  name.textContent = profilePopupName.value;
  description.textContent = profilePopupDescription.value;
  closePopup(profilePopup);
}

function createButton(evt) {
  evt.preventDefault();
  const newTitle = newCardTitle.value;
  const url = newCardLink.value;
  const clone = createCard(newTitle, url);
  cardsList.prepend(clone);
  closePopup(newCardPopup);
}

document.body.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(profilePopup);
    closePopup(newCardPopup);
    closePopup(imagePopup);
  }
});

imagePopup.addEventListener("click", function (evt) {
  let clickedDomElement = evt.target;
  if (clickedDomElement.classList.contains("image")) {
    closePopup(imagePopup);
  }
});

newCardPopup.addEventListener("click", function (evt) {
  let clickedDomElement = evt.target;
  if (clickedDomElement.classList.contains("profile-popup")) {
    closePopup(newCardPopup);
  }
});

profilePopup.addEventListener("click", function (evt) {
  let clickedDomElement = evt.target;
  if (clickedDomElement.classList.contains("form")) {
    closePopup(profilePopup);
  }
});

editButton.addEventListener("click", () => showForm(profilePopup));
profilePopupCloseButton.addEventListener("click", () =>
  closePopup(profilePopup)
);

addButton.addEventListener("click", () => openPopup(newCardPopup));
newCardCloseButton.addEventListener("click", () => closePopup(newCardPopup));
imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));
newCardCreateButton.addEventListener("click", createButton);

profilePopupForm.addEventListener("submit", saveButton);
