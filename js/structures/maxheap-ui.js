import { MaxHeap } from './maxheap.js';

const maxHeap = new MaxHeap();
const addBtn = document.querySelector('button.add-btn');
const extractBtn = document.querySelector('button.extract-btn');
const clearBtn = document.querySelector('button.clear-btn');
const input = document.querySelector('input.node-value');

addBtn.addEventListener('click', () => {
    const inputValue = parseInt(input.value);
    if (isNaN(inputValue)) {
        alert('Please enter a valid number!');
        return;
    }
    maxHeap.add(inputValue);
    input.value = '';
});

extractBtn.addEventListener('click', () => {
    maxHeap.extractMax();
});

clearBtn.addEventListener('click', () => {
    maxHeap.clear();
});