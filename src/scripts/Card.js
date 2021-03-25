import { data } from "autoprefixer";

class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleClickTrash,
    myID,
    handleClickHeart
  ) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleClickTrash = handleClickTrash;
    this._myID = myID;
    this._handleClickHeart = handleClickHeart;
  }

  _addHeartListener(clone) {
    clone
      .querySelector(".elements__like-btn")
      .addEventListener("click", (evt) => {
        evt.stopPropagation();
        this._handleClickHeart(this._data._id, evt.target);
      });
  }

  _removeCard(clone) {
    if (this._myID === this._data.owner._id) {
      clone
        .querySelector(".elements__trash")
        .addEventListener("click", (evt) => {
          this._handleClickTrash(this._data._id);
        });
    } else {
      clone.querySelector(".elements__trash").remove();
    }
  }

  _openImagePopup(clone) {
    clone.querySelector(".elements__image").addEventListener("click", () => {
      this._handleCardClick(this._data.link, this._data.name);
    });
  }

  createCard() {
    const temp = document.querySelector(this._cardSelector);

    const clone = temp.content.cloneNode(true);

    const elementsGroup = clone.querySelector(".elements__group");
    elementsGroup.setAttribute("data-card-id", this._data._id);
    const title = clone.querySelector(".elements__title");
    const currentPicture = clone.querySelector(".elements__image");
    const likeCount = clone.querySelector(".elements__counter");
    const heartNode = clone.querySelector(".elements__like-btn");
    // clone.setAttribute("data-card-id", this._data._id);

    if (this._data.likes.map((el) => el._id).includes(this._myID)) {
      heartNode.classList.toggle("elements__like-btn_active");
    }

    currentPicture.src = this._data.link;
    currentPicture.alt = this._data.name;
    title.textContent = this._data.name;
    likeCount.textContent = this._data.likes.length;

    this._addHeartListener(clone);

    this._removeCard(clone);

    this._openImagePopup(clone);

    return clone;
  }
}

export { Card };
