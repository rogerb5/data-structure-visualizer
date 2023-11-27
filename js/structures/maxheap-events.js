import { MaxHeap } from './maxheap.js';

const maxHeap = new MaxHeap();
const addBtn = document.querySelector('button.add-btn');
const extractBtn = document.querySelector('button.extract-btn');
const input = document.querySelector('input.node-value');

// Add button Event Listener 
addBtn.addEventListener('click', () => {
    const inputValue = parseInt(document.querySelector('input.node-value').value);
    maxHeap.add(inputValue);
    // maxHeap.createTreeLevels();
    input.value = '';
});