import {Comparison,NodeBST,BinarySearchTree} from "./binarytree.js";
    const tree = new BinarySearchTree();

    // Insert some data
    tree.Insert(5);
    tree.Insert(3);
    tree.Insert(7);
    tree.Insert(2);
    tree.Insert(4);
    tree.Insert(6);
    tree.Insert(8);

    // Print in-order traversal
    console.log("In-Order Traversal:");
    tree.inOrder(console.log);

    // Remove a node
    tree.Remove(3);

    // Print in-order traversal after removal
    console.log("In-Order Traversal after Removal:");
    tree.inOrder(console.log);

    // Search for a node
    const searchResult = tree.lookup(6);
    console.log("Search Result for 6:", searchResult ? searchResult.data : "Not found");

    // Print post-order traversal
    console.log("Post-Order Traversal:");
    tree.postOrder(console.log);

    // Print pre-order traversal
    console.log("Pre-Order Traversal:");
    tree.preOrder(console.log);

    // Get the minimum and maximum nodes
    const minNode = tree.lookupMinNode(tree.root);
    const maxNode = tree.lookupMaxNode(tree.root);
    console.log("Minimum Node:", minNode.data);
    console.log("Maximum Node:", maxNode.data);




