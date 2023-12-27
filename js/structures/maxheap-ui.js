import { MaxHeap } from './maxheap.js';

const maxHeap = new MaxHeap();
const addBtn = document.querySelector('button.add-btn');
const extractBtn = document.querySelector('button.extract-btn');
const clearBtn = document.querySelector('button.clear-btn');
const arrayBtn = document.querySelector('button.array-btn');
const maxHeapContainer = document.querySelector('div.maxheap-container');
const openBtn = document.querySelector('button.open-btn');
const closeBtn = document.querySelector('button.close-btn');

const modal = document.querySelector('section.modal');

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

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

arrayBtn.addEventListener('click', () => {
    maxHeapContainer.classList.toggle('array-version');
    if (!maxHeapContainer.classList.contains('array-version')) {
        arrayBtn.innerHTML = `Toggle Array`;
    } else {
        arrayBtn.innerHTML = `Toggle Heap`;
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addInput();
    }
})

function addInput() {
    const inputValue = parseInt(input.value);
    if (isNaN(inputValue)) {
        errorMsg.classList.add('active');
        setTimeout(() => {
            console.log('hihi')
            errorMsg.classList.remove('active');
        }, 3000);
        return;
    } else {
        errorMsg.classList.remove('active');
    }
    maxHeap.add(inputValue);
    input.value = '';
}