import { MaxHeap } from './maxheap.js';

const maxHeap = new MaxHeap();
const addBtn = document.querySelector('button.add-btn');
const extractBtn = document.querySelector('button.extract-btn');
const clearBtn = document.querySelector('button.clear-btn');
const input = document.querySelector('input.node-value');
const errorMsg = document.querySelector('p#error-msg');

addBtn.addEventListener('click', () => {
    addInput();
});

extractBtn.addEventListener('click', () => {
    maxHeap.extractMax();
});

clearBtn.addEventListener('click', () => {
    maxHeap.clear();
});

// keyboard enter event
document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addInput();
    }
})

function addInput() {
    const inputValue = parseInt(input.value);
    if (isNaN(inputValue)) {
        errorMsg.classList.add('active');
        return;
    } else {
        errorMsg.classList.remove('active');
    }
    maxHeap.add(inputValue);
    input.value = '';
}