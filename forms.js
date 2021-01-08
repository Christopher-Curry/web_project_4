function showForm() {
    let form = document.querySelector(".form");
    form.style.display = "block";
    let name = document.querySelector(".profile__title");
    let input = document.querySelector("#fullName");
    input.value = name.textContent
    let description = document.querySelector(".profile__subtitle");
    let descriptionInput = document.querySelector("#description");
    descriptionInput.value = description.textContent
}

function closeForm() {
    let close = document.querySelector(".form")
    close.style.display = "none";
}

function saveButton() {
    let input = document.querySelector("#fullName");
    let name = document.querySelector(".profile__title");
    name.textContent = input.value
    let descriptionInput = document.querySelector("#description");
    let description = document.querySelector(".profile__subtitle");
    description.textContent = descriptionInput.value
    let close = document.querySelector(".form")
    close.style.display = "none";
    return false;
}