import { Comparison, NodeBST, BinarySearchTree } from "./binarytree.js";

const bst = new BinarySearchTree();
const addNodeBtn = document.querySelector('button.add-node-btn');
const addInput = document.querySelector('input.add-input-val');
const deleteNodeBtn = document.querySelector('button.delete-node-btn');
const deleteInput = document.querySelector('input.delete-input-val');

// event listener for add button
addNodeBtn.addEventListener('click', function () {
    const addInputNumericValue = parseInt(document.querySelector('input.add-input-val').value);
    bst.Insert(addInputNumericValue);
    addInput.value = '';
})