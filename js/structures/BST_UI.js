import {NodeBST, BinarySearchTree } from "./binarytree.js";

const bst = new BinarySearchTree();
//const bstContainer = document.querySelector('.bst-container'); 
const addNodeBtn = document.querySelector('.add-node-btn');
const addInput = document.querySelector('input.add-input-val');

const deleteNodeBtn = document.querySelector('button.delete-node-btn');
const deleteInput = document.querySelector('input.delete-input-val');

const searchNodeBtn = document.querySelector('button.search-node-btn');
const searchInput = document.querySelector('input.search-input-val');
const searchminNodeBtn = document.querySelector('button.searchmin-node-btn');
const searchmaxNodeBtn = document.querySelector('button.searchmax-node-btn');

const inordertraversalBtn = document.querySelector('.inorder-node-btn');
const postordertraversalBtn = document.querySelector('.postorder-node-btn');
const preordertraversalBtn = document.querySelector('.preorder-node-btn');

const cleartreeBtn = document.querySelector('.clear-btn');
const errorMessageContainer = document.getElementById('error-message'); 

addNodeBtn.addEventListener('click', function () {
    errorMessageContainer.textContent = '';
    const addInputNumericValue = parseInt(document.querySelector('input.add-input-val').value);
    if(!isNaN(addInputNumericValue)) {
        bst.add(addInputNumericValue);
        addInput.value = '';
    }
    else { 
        errorMessageContainer.textContent = 'Please enter a valid numeric value.';
    }
});

//Update the existing event listener for the delete button
deleteNodeBtn.addEventListener('click', function () {
    errorMessageContainer.textContent = '';
    const deleteInputValue = parseInt(deleteInput.value);
    if (!isNaN(deleteInputValue)) {
        bst.Remove(deleteInputValue);
        deleteInput.value = '';
        bst.updateDOM(); // Make sure to update the DOM after removing a node
    } else {
        errorMessageContainer.textContent = 'Please enter a valid numeric value.';
    }
});


searchNodeBtn.addEventListener('click', function () {
    errorMessageContainer.textContent = '';
    const searchInputValue = parseInt(document.querySelector('input.search-input-val').value);
    const isNodeInTree = bst.contains(searchInputValue); // holds boolean
    console.log(isNodeInTree);

    if (isNodeInTree) {
        bst.highlightNode(searchInputValue);
    }

    searchInput.value = '';
});



searchminNodeBtn.addEventListener('click', function () {
    errorMessageContainer.textContent = '';
    bst.getminValue();
});

searchmaxNodeBtn.addEventListener('click', function() {
    errorMessageContainer.textContent = '';
    bst.getmaxValue();
});

inordertraversalBtn.addEventListener('click', async function () {
    errorMessageContainer.textContent = '';
    await bst.inOrderTraverse(bst.root);
});
postordertraversalBtn.addEventListener('click', async function () {
    errorMessageContainer.textContent = '';
    await bst.postOrderTraverse(bst.root);
});
preordertraversalBtn.addEventListener('click', async function () {
    errorMessageContainer.textContent = '';
    await bst.preOrderTraverse(bst.root);
});

cleartreeBtn.addEventListener('click', function () {

     // Clear the error message
     errorMessageContainer.textContent = '';

     // Clear the entire binary search tree
     bst.clear();
});

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
// Add event listeners after the functions are defined
document.querySelector('.openbtn').addEventListener('click', openNav);
document.querySelector('.closebtn').addEventListener('click', closeNav);