import "regenerator-runtime/runtime.js";
import "../pages/index.css";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import Api from "../scripts/Api.js";

const myID = "23eef59184749de87a828e68";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-7",
  authToken: "1df31a03-cf15-47ed-8f91-09c0cea642ae",
});

const editButton = document.querySelector(".profile__edit-btn");
const addButton = document.querySelector(".profile__add-btn");
const deleteConfirm = document.querySelector(".delete-confirm");
const profileAvatar = document.querySelector(".profile__avatar");

/* Profile DOM elements */
const profilePopupName = document.querySelector(".form__full-name");
const profilePopupDescription = document.querySelector(".form__description");

// Set up form validation for editForm
const editFormValidator = new FormValidator(
  {
    inputSelector: ".input",
    submitButtonSelector: ".save-btn",
    inactiveButtonClass: "save-btn_disabled",
    errorClass: "div-error_inactive",
  },
  document.querySelector(".form__container")
);
editFormValidator.enableValidation();

// Set up form validation for addForm
const addPopupValidator = new FormValidator(
  {
    inputSelector: ".input",
    submitButtonSelector: ".save-btn",
    inactiveButtonClass: "save-btn_disabled",
    errorClass: "div-error_inactive",
  },
  document.querySelector(".popup__container")
);

addPopupValidator.enableValidation();

const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__subtitle",
});

api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  profileAvatar.style.backgroundImage = `url(${res.avatar})`;
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
  (obj) => {
    api.editProfile(obj.full_name, obj.about_me).then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      editProfilePopup.close();
    });
  },
  ".input"
);
editProfilePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const values = userInfo.getUserInfo();
  profilePopupName.value = values.userName;
  profilePopupDescription.value = values.userJob;
  editProfilePopup.open();
});

// Make delete popup
const deletePopup = new PopupWithForm(
  ".delete-confirm",
  () => {
    const imageId = deleteConfirm.getAttribute("data-image-id");
    console.log(imageId);
    api.removeCard(imageId).then((res) => {
      console.log(res);
      if (res && res.message) {
        document.querySelector(`[data-card-id="${imageId}"]`).remove();
      }
      deletePopup.close();
    });
  },
  ".input"
);
deletePopup.setEventListeners();

profileAvatar.addEventListener("click", () => {
  profilePicture.open();
});
const profilePicture = new PopupWithForm(
  ".profile-picture",
  (obj) => {
    api.editProfileAvatar(obj.url_address).then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      profilePicture.close();
    });
  },
  ".input"
);
profilePicture.setEventListeners();

// Set up section
api.getCardList().then((cardData) => {
  const cardSection = new Section(
    {
      items: cardData,
      renderer: (card) => {
        const newCard = new Card(
          card,
          ".card",
          myNewPopupWithImage.open,
          (imageId) => {
            deleteConfirm.setAttribute("data-image-id", imageId);
            deletePopup.open();
          },
          myID,
          (id, heartNode) => {
            if (heartNode.classList.contains("elements__like-btn_active")) {
              api.removeLike(id).then((res) => {
                heartNode.classList.toggle("elements__like-btn_active");
                heartNode.nextElementSibling.textContent = res.likes.length;
              });
            } else {
              api.addLike(id).then((res) => {
                heartNode.classList.toggle("elements__like-btn_active");
                heartNode.nextElementSibling.textContent = res.likes.length;
              });
            }
          }
        );
        return newCard.createCard();
      },
    },
    ".elements__grid"
  );
  cardSection.renderItems();

  // Make add card popup
  const addCardPopup = new PopupWithForm(
    ".add-card-popup",
    (obj) => {
      api
        .addCard({ name: obj.link_title, link: obj.url_address })
        .then((card) => {
          const newCard = new Card(
            card,
            ".card",
            myNewPopupWithImage.open,
            (imageId) => {
              deleteConfirm.setAttribute("data-image-id", imageId);
              deletePopup.open();
            },
            myID,
            (id, heartNode) => {
              if (heartNode.classList.contains("elements__like-btn_active")) {
                api.removeLike(id).then((res) => {
                  heartNode.classList.toggle("elements__like-btn_active");
                  heartNode.nextElementSibling.textContent = res.likes.length;
                });
              } else {
                api.addLike(id).then((res) => {
                  heartNode.classList.toggle("elements__like-btn_active");
                  heartNode.nextElementSibling.textContent = res.likes.length;
                });
              }
            }
          );
          const clone = newCard.createCard();
          cardSection.addItem(clone);
          addCardPopup.close();
        });
    },
    ".input"
  );
  addCardPopup.setEventListeners();

  addButton.addEventListener("click", () => {
    addCardPopup.open();
  });
});
