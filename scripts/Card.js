class Card {
  constructor(newTitle, url, cardSelector) {
    this._newTitle = newTitle;
    this._url = url;
    this._cardSelector = cardSelector;
  }

  _addHeartListener(clone) {
    clone
      .querySelector(".elements__like-btn")
      .addEventListener("click", function (evt) {
        evt.stopPropagation();
        evt.target.classList.toggle("elements__like-btn_active");
      });
  }

  _removeCard(clone) {
    clone
      .querySelector(".elements__trash")
      .addEventListener("click", function (evt) {
        evt.target.closest(".elements__group").remove();
      });
  }

  _openImagePopup(clone) {
    clone
      .querySelector(".elements__image")
      .addEventListener("click", function (evt) {
        openPopup(imagePopup);

        imagePopupTitle.textContent = this._newTitle;
        imagePopupSrc.src = this._url;
      });
  }

  createCard() {
    const temp = document.querySelector(this._cardSelector);
    const clone = temp.content.cloneNode(true);

    const title = clone.querySelector(".elements__title");
    const currentPicture = clone.querySelector(".elements__image");

    currentPicture.src = this._url;
    currentPicture.alt = this._newTitle;
    title.textContent = this._newTitle;

    this._addHeartListener(clone);

    this._removeCard(clone);

    this._openImagePopup(clone);

    return clone;
  }
}

export { Card };
