public class bst { //Define a public class named bst
    private Node root; //Declare a private instance variable "root" of type node

    private class Node { //Define a private inner class named "Node"
        Node left; //Declare a left child Node
        Node right; //Declare a right child Node
        int data; //Declare a data variable of type int

        public Node(int newData) { //Constructor for the Node class, initializes left, right, and data
            left = null;
            right = null;
            data = newData;
        }
    }

    public void binarySearchTree() { //constructor for the bst class, initializes the root to null
        root = null; //creates empty binary tree
    }

    public void add(int data) { //public method to add a node with the given data to the bst
        root = add(root, data); //call the private add method with the root and the given data
    }
    private Node add(Node node, int data) { //private method to recursively add a node with the given data to the bst
        if(node == null) { //checks if the current node is null
            node = new Node(data); //create a new node with the data if so
        }
        else {
            if(data <= node.data) { //if the data is less than or equal to the current node's data
                node.left = add(node.left, data); //recursively add to the left subtree
            }
            else { //if the data is greater
                node.right = add(node.right, data); //recursively add to the right subtree
            }
        }
        return node; //return the modified code
    }

    public void remove(int data) { //public method to remove a node with the given data to the bst
        root = remove(root, data); //call the private remove method with the root and the given data
    }

    private Node remove(Node node, int data) { // Private method to remove a node with the given data from the binary search tree
        if(node == null) { // Base case: if the current node is null, return null (no change)
            return null;
        }
        if(data < node.data) {  // If the data to be deleted is smaller than the root's data, then it lies in the left subtree
            node.left = remove(node.left, data);  // Recursively call remove on the left subtree
        }
        else if(data > node.data) {  // If the data to be deleted is greater than the root's data, then it lies in the right subtree
            node.right = remove(node.right, data);  // Recursively call remove on the right subtree
        }
        // If the data to be deleted is the same as the root's data,
        // then this is the node to be deleted
        else {
            if(node.left == null && node.right == null) { // Case 1: Node with no children
                return null; // Simply remove the node by returning null
            }
            if(node.left == null) { // Case 2: Node with only a right child
                return node.right; // Replace the node with its right child
            }
            else if(node.right == null) { // Case 3: Node with only a left child
                return node.left; // Replace the node with its left child
            }
            else {  // Case 4: Node with two children
                Node maxNode = findMaxValueNode(node.left);  // Find the maximum value node in the left subtree
                node.data = maxNode.data;  // Replace the current node's data with the maxNode's data
                node.left = remove(node.left, maxNode.data);  // Recursively remove the maxNode from the left subtree
            }

        }
        return node;
    }
    // Public method to initiate the search for a node with the specified data in the binary search tree
    public void search(int data) {
        // Call the private search method to perform the actual search, starting from the root
        Node result = search(root, data);

        // Process the search result
        if (result != null) {
            System.out.println("\nNode with data " + data + " found.");
        } else {
            System.out.println("Node with data " + data + " not found.");
        }
    }

    // Private method to recursively search for a node with the specified data in the binary search tree
    private Node search(Node node, int data) {
        // Base case: if the current node is null or contains the desired data, return the node
        if (node == null || node.data == data) {
            return node;
        } else if (data < node.data) {
            // If the desired data is smaller, recursively search in the left subtree
            return search(node.left, data);
        } else {
            // If the desired data is greater, recursively search in the right subtree
            return search(node.right, data);
        }
    }
    public int findMaxValue() throws IllegalStateException { // Public method to find and return the maximum value in the binary search tree
        if(root == null) { // If the tree is empty, throw an IllegalStateException
            throw new IllegalStateException("The binary search tree is empty.");
        }
        Node maxNode = findMaxValueNode(root);  // Call the private method starting from the root
        return maxNode.data; // Return the maximum value
    }
    private Node findMaxValueNode(Node node) { // Private method to find and return the node with the maximum value in the binary search tree
        if(node == null) { // Base case: if the current node is null, the tree is empty, return null
            return null;
        }
        while(node.right != null) { // Traverse to the right child until the right child is null, which is the maximum value node
            node = node.right;
        }
        return node; // Return the node with the maximum value
    }
    public int findMinValue() throws IllegalStateException { // Public method to find and return the minimum value in the binary search tree
        if(root == null) { // If the tree is empty, throw an IllegalStateException
            throw new IllegalStateException("The binary search tree is empty.");
        }
        Node minNode = findMinValueNode(root);  // Call the private method starting from the root
        return minNode.data; // Return the minimum value
    }
    private Node findMinValueNode(Node node) { // Private method to find and return the node with the minimum value in the binary search tree
        if(node == null) {  // Base case: if the current node is null, the tree is empty, return null
            return null;
        }
        while(node.left != null) { // Traverse to the left child until the left child is null, which is the minimum value node
            node = node.left;
        }
        return node; // Return the node with the minimum value
    }


    private void inOrderTraversal(Node node) {
        if(node != null) {
            inOrderTraversal(node.left);
            System.out.print(node.data + " ");
            inOrderTraversal(node.right);
        }
    }
    private void preOrderTraversal(Node node) {
        if (node != null) {
            System.out.print(node.data + " ");
            preOrderTraversal(node.left);
            preOrderTraversal(node.right);
        }
    }
    private void postOrderTraversal(Node node) {
        if (node != null) {
            postOrderTraversal(node.left);
            postOrderTraversal(node.right);
            System.out.print(node.data + " ");
        }
    }
    // Public method to clear the binary search tree
    public void clear() {
        root = clear(root);
    }

    // Private method to recursively clear the binary search tree
    private Node clear(Node node) {
        // Base case: if the current node is null, no need to do anything
        if (node == null) {
            return null;
        }

        // Recursively clear the left and right subtrees
        node.left = clear(node.left);
        node.right = clear(node.right);

        // Set the current node to null
        return null;
    }
    public static void main(String[] args) {
        // Create an instance of the bst class
        bst binarySearchTree = new bst();

        // Test the add method
        binarySearchTree.add(50);
        binarySearchTree.add(30);
        binarySearchTree.add(70);
        binarySearchTree.add(20);
        binarySearchTree.add(40);
        binarySearchTree.add(60);
        binarySearchTree.add(80);

        // Print the tree to verify the add operation
        System.out.println("Binary Search Tree after adding elements:");
        binarySearchTree.inOrderTraversal(binarySearchTree.root);

        // Test the remove method
        binarySearchTree.remove(30);

        // Print the tree to verify the remove operation
        System.out.println("\nBinary Search Tree after removing 30:");
        binarySearchTree.inOrderTraversal(binarySearchTree.root);

        //print the tree to verify traversals
        System.out.println("\nBinary Search tree using preorder traversal:");
        binarySearchTree.preOrderTraversal(binarySearchTree.root);

        System.out.println("\nBinary Search tree using postorder traversal:");
        binarySearchTree.postOrderTraversal(binarySearchTree.root);

        //search methods
        binarySearchTree.search(80);
        binarySearchTree.search(10);

        try {
            // Find and print the maximum value
            int maxValue = binarySearchTree.findMaxValue();
            System.out.println("Maximum value in the BST: " + maxValue);

            //Find the and print the minimum value
            int minValue = binarySearchTree.findMinValue();
            System.out.println("Minimum value in the BST: " + minValue);
        } catch (IllegalStateException e) {
            // Handle the exception (e.g., print an error message)
            System.out.println("Error: " + e.getMessage());
        }
        // Clear the binary search tree
        binarySearchTree.clear();

        // Print the tree after clearing
        System.out.println("Binary Search Tree after clearing:");
        binarySearchTree.inOrderTraversal(binarySearchTree.root); // Should print nothing
    }
}