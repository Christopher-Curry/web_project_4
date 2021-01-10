
let form = document.querySelector(".form")
let name = document.querySelector(".profile__title")
let input = document.querySelector(".form__full-name")
let description = document.querySelector(".profile__subtitle")
let descriptionInput = document.querySelector(".form__description")


function showForm() {
    form.classList.add("form_active")
    input.value = name.textContent
    descriptionInput.value = description.textContent
}

function closeForm() {
    form.classList.remove("form_active")
}

function saveButton() {
    name.textContent = input.value
    description.textContent = descriptionInput.value
    form.classList.remove("form_active")
    return false;
}