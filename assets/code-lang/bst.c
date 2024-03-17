#include <stdio.h>
#include <stdlib.h>
struct Node* findMaxValueNode(struct Node* node);
struct Node { //Define a structure for the Node
    struct Node* left; //pointer to the left child node
    struct Node* right; //pointer to the right child node
    int data; //data stored in node
};

struct bst { //Define a structure for the Binary Search Tree
    struct Node* root; //pointer to the root node of the tree
};

struct Node* createNode(int newData) { //Define a function to create a new Node with the given data
    //allocate memory for a new node structure using malloc
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    //set the left and right pointers of the new node to NULL
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->data = newData; //set the data of the new node to the provided newData
    return newNode; //return the newly created node
}
struct bst* createBST() {
    //allocate memory for a new binary search tree
    struct bst* newBST = (struct bst*)malloc(sizeof(struct bst));
    // Initialize the root pointer of the new bst to NULL (indicating an empty tree)
    newBST->root = NULL;
    return newBST; //return the newly created bst
}
// Private method to recursively add a node with the given data to the bst
struct Node* add(struct Node* node, int data) {
    if(node == NULL) {
        return createNode(data); // If the current node is null, create a new node with the given data
    }
    else {
        if(data <= node->data) {
            node->left = add(node->left, data); // Recursively add to the left subtree
        }
        else {
            node->right = add(node->right, data); // Recursively add to the right subtree
        }
    }
    return node; // Return the modified node
}
void addData(struct bst* tree, int data) { // Public method to add a node with the given data to the bst
    tree->root = add(tree->root, data); // Call the private add method with the root and the given data
}

// Private method to recursively remove a node with the given data from the bst
struct Node* removeNode(struct Node* node, int data) {
    if(node == NULL) {
        return NULL; // Base case: If the current node is null, no change
    }
    if(data < node->data) {
        node->left = removeNode(node->left, data); // Recursively call remove on the left subtree
    }
    else if(data > node->data) {
        node->right = removeNode(node->right, data); // Recursively call remove on the right subtree
    }
    else {
        if(node->left == NULL && node->right == NULL) { // Case 1: Node with no children
            free(node); // Simply remove the node by freeing the memory
            return NULL;
        }
        else if(node->left == NULL) { // Case 2: Node with only a right child
            struct Node* temp = node->right;
            free(node);
            return temp;  // Replace the node with its right child
        }
        if(node->right == NULL) { // Case 3: Node with only a left child
            struct Node* temp = node->left;
            free(node);
            return temp;  // Replace the node with its left child
        }
        else { // Case 4: Node with two children
            struct Node* maxNode = findMaxValueNode(node->left); // Find the maximum value node in the left subtree
            node->data = maxNode->data; // Replace the current node's data with the maxNode's data
            // Recursively remove the maxNode from the left subtree
            node->left = removeNode(node->left, maxNode->data);
        }
    }
    return node;
}
void removeData(struct bst* tree, int data) { // Public method to remove a node with the given data from the bst
    tree->root = removeNode(tree->root, data); // Call the private remove method with the root and the given data
}

// Private method to find and return the node with the maximum value in the binary search tree
struct Node* findMaxValueNode(struct Node* node) {
    if(node == NULL) {
        return NULL; // Base case: If the current node is null, the tree is empty, return null
    }
    while(node->right != NULL) {
        node = node->right; // Traverse to the right child until the right child is null, which is the maximum value node
    }
    return node; // Return the node with the maximum value
}

void inOrderTraversal(struct Node* node) { // Private method for in-order traversal
    if(node != NULL) {
        inOrderTraversal(node->left);
        printf("%d ", node->data);
        inOrderTraversal(node->right);
    }
}

int main() {
    struct bst* binarySearchTree = createBST(); //create an instance of the bst struct

    //test the add method
    addData(binarySearchTree,50);
    addData(binarySearchTree,30);
    addData(binarySearchTree,70);

    //print the tree to verify the add operation
    printf("Binary Search Tree after adding elements: ");
    inOrderTraversal(binarySearchTree->root);

    //test the remove method
    removeData(binarySearchTree, 30);

    //print the tree to verify the remove operation
    printf("\nBinary Search Tree after removing 30: ");
    inOrderTraversal(binarySearchTree->root);
    return 0;
}