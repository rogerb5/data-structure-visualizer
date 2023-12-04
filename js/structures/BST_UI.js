import { Comparison, NodeBST, BinarySearchTree } from "./binarytree.js";

const bst = new BinarySearchTree();
// const addNodeBtn = document.querySelector('button.add-node-btn');
// const addInput = document.querySelector('input.add-input-val');
const bstContainer = document.querySelector('.bst-container'); // Corrected selector
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
const cleartreeBtn = document.querySelector('.clear-node-btn');
const errorMessageContainer = document.getElementById('error-message'); 


// event listener for add button
// addNodeBtn.addEventListener('click', function () {
//     const addInputNumericValue = parseInt(document.querySelector('input.add-input-val').value);
//     bst.Insert(addInputNumericValue);
//     addInput.value = '';
// })
addNodeBtn.addEventListener('click', function () {
    const addInputNumericValue = parseInt(document.querySelector('input.add-input-val').value);
    bst.add(addInputNumericValue);
    addInput.value = '';
});
searchNodeBtn.addEventListener('click', function () {
    // Clear any previous red circles
    bst.clearRedCircle();

    const searchValue = parseInt(searchInput.value);
    const searchResult = bst.lookup(searchValue);

    if (searchResult) {
        bst.markNodeWithRedCircle(searchResult);

        // Set a timeout to clear the red circle after a certain amount of time (e.g., 2000 milliseconds)
        setTimeout(() => {
            bst.clearRedCircle();
        }, 2000);
    } else {
        // Clear any previous red circles
        bst.clearRedCircle();
        errorMessageContainer.textContent = 'Node not found';

        // Clear the error message after a certain amount of time (e.g., 2000 milliseconds)
        setTimeout(() => {
            errorMessageContainer.textContent = '';
        }, 2000);
    }

    // Clear the search input
    searchInput.value = '';
});


searchminNodeBtn.addEventListener('click', function () {
    bst.getminValue();
});

searchmaxNodeBtn.addEventListener('click', function() {
    bst.getmaxValue();
});

inordertraversalBtn.addEventListener('click', function () {
    // Clear any previous circles
    bst.clearRedCircle();
    bst.clearGreenCircle();

    // Get the nodes in inorder traversal order
    const nodesInOrder = [];
    const collectNodesInOrder = (data) => nodesInOrder.push(data);
    bst.inOrderTraverse(bst.root, collectNodesInOrder);

    // Create a function to be called during the inorder traversal with a delay
    const appendDataAndCreateGreenButtonWithDelay = (data, index) => {
        setTimeout(() => {
            // Create a circle for the current node
            const currentNode = bst.lookupNode(bst.root, data);
            if (currentNode) {
                bst.markNodeWithGreenCircle(currentNode);
            }

            // If it's the last node in the traversal, clear the circle after a delay
            if (index === nodesInOrder.length - 1) {
                setTimeout(() => {
                    bst.clearGreenCircle();
                }, 1000); // Adjust the delay as needed
            }
        }, index * 1000); // Adjust the delay between nodes as needed
    };

    // Start the inorder traversal from the root with a delay
    nodesInOrder.forEach((data, index) => appendDataAndCreateGreenButtonWithDelay(data, index));
});
postordertraversalBtn.addEventListener('click', function () {
    // Clear any previous circles
    bst.clearRedCircle();
    bst.clearGreenCircle();

    // Get the nodes in postorder traversal order
    const nodesPostOrder = [];
    const collectNodesPostOrder = (data) => nodesPostOrder.push(data);
    bst.postOrderTraverse(bst.root, collectNodesPostOrder);

    // Create a function to be called during the postorder traversal with a delay
    const appendDataAndCreateGreenButtonWithDelay = (data, index) => {
        setTimeout(() => {
            // Create a circle for the current node
            const currentNode = bst.lookupNode(bst.root, data);
            if (currentNode) {
                bst.markNodeWithGreenCircle(currentNode);
            }

            // If it's the last node in the traversal, clear the circle after a delay
            if (index === nodesPostOrder.length - 1) {
                setTimeout(() => {
                    bst.clearGreenCircle();
                }, 1000); // Adjust the delay as needed
            }
        }, index * 1000); // Adjust the delay between nodes as needed
    };

    // Start the postorder traversal from the root with a delay
    nodesPostOrder.forEach((data, index) => appendDataAndCreateGreenButtonWithDelay(data, index));
});
preordertraversalBtn.addEventListener('click', function () {
    // Clear any previous circles
    bst.clearRedCircle();
    bst.clearGreenCircle();

    // Get the nodes in postorder traversal order
    const nodesPreOrder = [];
    const collectNodesPreOrder = (data) => nodesPreOrder.push(data);
    bst.preOrderTraverse(bst.root, collectNodesPreOrder);

    // Create a function to be called during the postorder traversal with a delay
    const appendDataAndCreateGreenButtonWithDelay = (data, index) => {
        setTimeout(() => {
            // Create a circle for the current node
            const currentNode = bst.lookupNode(bst.root, data);
            if (currentNode) {
                bst.markNodeWithGreenCircle(currentNode);
            }

            // If it's the last node in the traversal, clear the circle after a delay
            if (index === nodesPreOrder.length - 1) {
                setTimeout(() => {
                    bst.clearGreenCircle();
                }, 1000); // Adjust the delay as needed
            }
        }, index * 1000); // Adjust the delay between nodes as needed
    };

    // Start the postorder traversal from the root with a delay
    nodesPreOrder.forEach((data, index) => appendDataAndCreateGreenButtonWithDelay(data, index));
});

// cleartreeBtn.addEventListener('click', function () {

//     // Clear any previous red or green circles
//     bst.clearRedCircle();
//     bst.clearGreenCircle();

//      // Clear the error message
//      errorMessageContainer.textContent = '';

//      // Clear the entire binary search tree
//      bst.clear();

//     // Clear the binary tree visualization
//     const container = document.querySelector('section.binarytree-container');
//     container.innerHTML = ''; // Remove all child elements
// });


