
let form = document.querySelector(".form");
let name = document.querySelector(".profile__title");
let input = document.querySelector(".form__full-name");
let description = document.querySelector(".profile__subtitle");
let descriptionInput = document.querySelector(".form__description");
let closeButton = document.querySelector('.form__close-btn');
let editButton = document.querySelector(".profile__edit-btn");
let submitForm = document.querySelector(".form__container");



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


closeButton.addEventListener('click', closeForm);
editButton.addEventListener('click', showForm);
submitForm.addEventListener('submit', saveButton);
