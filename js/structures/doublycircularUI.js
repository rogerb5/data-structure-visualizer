import { Node, CircularDoublyLinkedList } from "./doublycircular.js";
const appendButton = document.querySelector('button.append-btn');
const appendInput = document.querySelector('input.append-input');

const prependButton = document.querySelector('button.prepend-btn');
const prependInput = document.querySelector('input.prepend-input');

const searchButton = document.querySelector('button.search-btn');
const searchInput = document.querySelector('input.search-input');

const removeButton = document.querySelector('button.remove-btn');

const doublyList = new CircularDoublyLinkedList();

const listContainer = document.querySelector('main.list-container');
const clearButton = document.querySelector('button.clear-btn');
const reverseButton = document.querySelector('button.reverse-btn');

// input validation function 
function isValidNumber(inputValue) {
    return !isNaN(parseFloat(inputValue)) && isFinite(inputValue);
}

// append button event listener
appendButton.addEventListener('click', () => {
    const appendData = parseInt(document.querySelector('input.append-input').value);
    if (isValidNumber(appendData)) {
        doublyList.append(appendData);
    } else {
        alert('Please enter a valid number!');
    }
    appendInput.value = '';
})

// prepend button event listener
prependButton.addEventListener('click', () => {
    const prependData = parseInt(document.querySelector('input.prepend-input').value);
    if (isValidNumber(prependData)) {
        doublyList.prepend(prependData);
    } else {
        alert('Please enter a valid number!');
    }
    prependInput.value = '';
});

searchButton.addEventListener('click', () => {
    const searchValue = parseInt(document.querySelector('input.search-input').value);
    doublyList.search(searchValue);
    searchInput.value = '';
})

// clear button event listener
clearButton.addEventListener('click', () => {
    doublyList.clear();
});

// reverse button event listener 
reverseButton.addEventListener('click', () => {
    doublyList.reverse();
});