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
    private Node findMaxValueNode(Node node) { // Private method to find and return the node with the maximum value in the binary search tree
        if(node == null) { // Base case: if the current node is null, the tree is empty, return null
            return null;
        }
        while(node.right != null) { // Traverse to the right child until the right child is null, which is the maximum value node
            node = node.right;
        }
        return node; // Return the node with the maximum value
    }
     private void inOrderTraversal(Node node) {
        if(node != null) {
            inOrderTraversal(node.left);
            System.out.print(node.data + " ");
            inOrderTraversal(node.right);
        }
    }
    public static void main(String[] args) {
        // Create an instance of the bst class
        bst binarySearchTree = new bst();

        // Test the add method
        binarySearchTree.add(50);
        binarySearchTree.add(30);
        binarySearchTree.add(70);

        // Print the tree to verify the add operation
        System.out.println("Binary Search Tree after adding elements:");
        binarySearchTree.inOrderTraversal(binarySearchTree.root);

        // Test the remove method
        binarySearchTree.remove(30);

        // Print the tree to verify the remove operation
        System.out.println("\nBinary Search Tree after removing 30:");
        binarySearchTree.inOrderTraversal(binarySearchTree.root);

    }
}