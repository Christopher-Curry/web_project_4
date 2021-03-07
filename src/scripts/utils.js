export const imagePopup = document.querySelector(".image");

export function onCloseEscape(evt) {
  const popup = document.querySelector(".popup_active");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", onCloseEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", onCloseEscape);
}
