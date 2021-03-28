import "regenerator-runtime/runtime.js";
import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

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
    api
      .editProfile(obj.full_name, obj.about_me)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
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
    api
      .removeCard(imageId)
      .then((res) => {
        if (res && res.message) {
          document.querySelector(`[data-card-id="${imageId}"]`).remove();
        }
        deletePopup.close();
      })
      .catch((err) => {
        console.log(err);
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
    api
      .editProfileAvatar(obj.url_address)
      .then((res) => {
        profileAvatar.style.backgroundImage = `url(${res.avatar})`;
        profilePicture.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  ".input"
);
profilePicture.setEventListeners();

function makeCard(card, myID) {
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
        api
          .removeLike(id)
          .then((res) => {
            newCard.setLike(heartNode, res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            newCard.setLike(heartNode, res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return newCard.createCard();
}

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    profileAvatar.style.backgroundImage = `url(${res.avatar})`;

    // Set up section
    api
      .getCardList()
      .then((cardData) => {
        const cardSection = new Section(
          {
            items: cardData,
            renderer: (card) => makeCard(card, res._id),
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
                const clone = makeCard(card, res._id);
                cardSection.addItem(clone);
                addCardPopup.close();
              })
              .catch((err) => {
                console.log(err);
              });
          },
          ".input"
        );
        addCardPopup.setEventListeners();

        addButton.addEventListener("click", () => {
          addCardPopup.open();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
