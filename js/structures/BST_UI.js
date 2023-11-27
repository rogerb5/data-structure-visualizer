import { Comparison, NodeBST, BinarySearchTree } from "./binarytree.js";

const bst = new BinarySearchTree();
const addNodeBtn = document.querySelector('button.add-node-btn');
const addInput = document.querySelector('input.add-input-val');
const deleteNodeBtn = document.querySelector('button.delete-node-btn');
const deleteInput = document.querySelector('input.delete-input-val');
const searchNodeBtn = document.querySelector('button.search-node-btn');
const searchInput = document.querySelector('input.search-input-val');
const searchminNodeBtn = document.querySelector('button.searchmin-node-btn');


// event listener for add button
addNodeBtn.addEventListener('click', function () {
    const addInputNumericValue = parseInt(document.querySelector('input.add-input-val').value);
    bst.Insert(addInputNumericValue);
    addInput.value = '';
})
searchNodeBtn.addEventListener('click', function () {
    const searchValue = parseInt(searchInput.value);
    const searchResult = bst.lookup(searchValue);

    if (searchResult) {
        bst.markNodeWithRedCircle(searchResult);
    } else {
        // Clear any previous red circles
        bst.clearRedCircle();
        errorMessageContainer.textContent = 'Node not found';
    }

    // Clear the search input
    searchInput.value = '';
});

searchminNodeBtn.addEventListener('click', function () {
    const minNode = bst.lookupMinNode(bst.root); //perform the lookup for the min. node in the bst 

    if(minNode) {
        bst.markNodeWithRedCircle(minNode);
    }
    else {
        bst.clearRedCircle();
        errorMessageContainer.textContent = "No minimum node found";
    }
});

