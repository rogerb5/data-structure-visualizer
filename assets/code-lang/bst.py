# Define a class representing a Node in the binary search tree
class Node:
    # Constructor to initialize a Node with data, left, and right attributes
    def __init__(self, data):
        self.data = data  # Initialize the data attribute with the given data value
        self.left = None  # Initialize the left child as None
        self.right = None  # Initialize the right child as None


# Define a class representing a Binary Search Tree (BST)
class BST:
    # Constructor to initialize the BST with a root attribute
    def __init__(self):
        self.root = None  # Initialize the root as None

    # Public method to add a node with the given data to the BST
    def add(self, data):
        self.root = self._add(self.root, data)  # Call the private _add method with the root and the given data

    def _add(self, node, data):  # Private method to recursively add a node with the given data to the BST
        if node is None:  # Check if the current node is None
            return Node(data)  # Create a new node with the given data if the current node is None
        else:
            # If the data is less than or equal to the current node's data, recursively add to the left subtree
            if data <= node.data:
                node.left = self._add(node.left, data)
            else:
                node.right = self._add(node.right, data)  # If the data is greater, recursively add to the right subtree
        return node

    def remove(self, data):  # Public method to remove a node with the given data from the BST
        self.root = self._remove(self.root, data)  # Call the private _remove method with the root and the given data

    def _remove(self, node, data):  # Private method to recursively remove a node with the given data from the BST
        if node is None:  # Check if the current node is None
            return None  # Base case: if the current node is None, return None (no change)
        # If the data to be deleted is smaller than the root's data, recursively call _remove on the left subtree
        elif data < node.data:
            node.left = self._remove(node.left, data)
        # If the data to be deleted is greater than the root's data, recursively call _remove on the right subtree
        elif data > node.data:
            node.right = self._remove(node.right, data)
        else:
            # If the data to be deleted is the same as the root's data, handle different cases
            if node.left is None and node.right is None:
                return None  # Case 1: Node with no children, simply remove the node by returning None
            elif node.left is None:
                return node.right  # Case 2: Node with only a right child, replace the node with its right child
            elif node.right is None:
                return node.left  # Case 3: Node with only a left child, replace the node with its left child
            else:
                # Case 4: Node with two children, find the maximum value node in the left subtree
                max_node = self._find_max_value_node(node.left)
                node.data = max_node.data  # Replace the current node's data with the max_node's data
                # Recursively remove the max_node from the left subtree
                node.left = self._remove(node.left, max_node.data)
        return node

    @staticmethod
    def _find_max_value_node(node):  # Private method to find and return the node with the maximum value in the BST
        if node is None:  # Base case: if the current node is None, the tree is empty, return None
            return None
        # Traverse to the right child until the right child is None, which is the maximum value node
        while node.right is not None:
            node = node.right
        return node

    def _in_order_traversal(self, node):  # Private method for in-order traversal of the BST and print the nodes
        if node is not None:
            self._in_order_traversal(node.left)  # Recursively traverse the left subtree
            print(node.data, end=" ")  # Print the current node's data
            self._in_order_traversal(node.right)  # Recursively traverse the right subtree

    def in_order_traversal(self, root):
        pass


# Main block executed when the script is run
if __name__ == "__main__":
    # Create an instance of the BST class
    binary_search_tree = BST()

    # Test the add method
    binary_search_tree.add(50)
    binary_search_tree.add(30)
    binary_search_tree.add(70)

    # Print the tree to verify the add operation
    print("Binary Search Tree after adding elements:")
    binary_search_tree._in_order_traversal(binary_search_tree.root)  # Use _in_order_traversal for this verification

    # Test the remove method
    binary_search_tree.remove(30)

    # Print the tree to verify the remove operation
    print("\nBinary Search Tree after removing 30:")
    binary_search_tree._in_order_traversal(binary_search_tree.root)  # Use _in_order_traversal for this verification