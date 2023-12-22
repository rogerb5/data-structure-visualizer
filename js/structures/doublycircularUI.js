import { Node, CircularDoublyLinkedList } from "./doublycircular.js";
const appendButton = document.querySelector('button.append-btn');
const appendInput = document.querySelector('input.append-input');

const prependButton = document.querySelector('button.prepend-btn');
const prependInput = document.querySelector('input.prepend-input');

const searchButton = document.querySelector('button.search-btn');
const searchInput = document.querySelector('input.search-input');

const removeButton = document.querySelector('button.remove-btn');
const removeInput = document.querySelector('input.remove-input');

const clearButton = document.querySelector('button.clear-btn');
const reverseButton = document.querySelector('button.reverse-btn');
const alertSection = document.querySelector('section.alert-section');

const doublyList = new CircularDoublyLinkedList();

// create modal button and modal pop up animation

function isValidNumber(inputValue) {
    return !isNaN(parseFloat(inputValue)) && isFinite(inputValue);
}

appendButton.addEventListener('click', () => {
    const appendData = parseInt(document.querySelector('input.append-input').value);
    if (isValidNumber(appendData)) {
        doublyList.append(appendData);
        alertSection.classList.remove('active');
    } else {
        alertSection.classList.add('active');
    }
    appendInput.value = '';
});

prependButton.addEventListener('click', () => {
    const prependData = parseInt(document.querySelector('input.prepend-input').value);
    if (isValidNumber(prependData)) {
        doublyList.prepend(prependData);
        alertSection.classList.remove('active');
    } else {
        alertSection.classList.add('active');
    }
    prependInput.value = '';
});

removeButton.addEventListener('click', () => {
    const removeData = parseInt(document.querySelector('input.remove-input').value);
    if (isValidNumber(removeData)) {
        doublyList.removeNodesByValue(removeData);
        alertSection.classList.remove('active');
    } else {
        alertSection.classList.add('active');
    }
    removeInput.value = '';
});

searchButton.addEventListener('click', () => {
    const searchData = parseInt(document.querySelector('input.search-input').value);
    if (isValidNumber(searchData)) {
        doublyList.search(searchData);
        alertSection.classList.remove('active');
    } else {
        alertSection.classList.add('active');
    }
    searchInput.value = '';
});

clearButton.addEventListener('click', () => {
    doublyList.clear();
});

reverseButton.addEventListener('click', () => {
    doublyList.reverse();
});