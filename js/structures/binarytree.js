const COMPARISON = { //defines constants for comparison 
    SMALLER: -1, GREATER: 1, EQUAL: 0,
};

const defaultCompareNumberFn = (x, y) => { //default comparison function for comparing x and y 
    if (Number(x) == Number(y)) { //if x and y are equal return 0 
      return COMPARISON.EQUAL;
    }
  
    return Number(x) < Number(y) ? COMPARISON.SMALLER : COMPARISON.GREATER; 
    // if x is less than y return -1 and if greater return 1 
  };

class NodeBST{
    constructor(data, nodeParent) { //constructor 
        this.data = data.toString(); //storing the data 
        this.nodeLeft = null; //initialize left child node
        this.nodeRight = null; //initialize right child node 
        this.nodeParent = nodeParent || null; //set parent node or null if not provided
    }

    get children() { 
        return this.nodeLeft != null || this.nodeRight != null; 
        //returns true if either the left or right child is not null 
    }

    get isLeaf() { //leaf means it has no children 
        return this.nodeLeft === null && this.nodeRight === null;
        //returns true if both left and right children are null(no children)
    }
}

class BinarySearchTree {
    constructor(compare = defaultCompareNumberFn) {
        this.root = null; //initialize the root as null
        this.compare = compare; //store the compare function 
    }

    Insert(data) {
        const newNode = new NodeBST(data); //creating a new node 
        if(this.root === null) {
            this.root = newNode; //if the tree is empty, set the new node as the root 
        }
        else {
            this.insertionNode(this.root, newNode); //call the method so we can insert the node starting from root 
        }

    }
    insertionNode(node, newNode) {
        if(this.compare(newNode.data, node.data) === COMPARISON.SMALLER) { //if the new node is smaller that the current node
            if(node.nodeLeft === null) { //checks to see if left of the node is empty
                node.nodeLeft = newNode; //insert new node on the left if smaller than current node
                newNode.nodeParent = node; //setting the parent of the new node
            }
            else {
                this.insertionNode(node.nodeLeft, newNode); //traverse the left subtree 
            }
        }
        else if(this.compare(newNode.data, node.data) === COMPARISON.GREATER) { //if the new node is greater than the current node 
            if(node.nodeRight === null) { //checks to see if right of the node is empty 
                node.nodeRight = newNode; //insert new node on the right 
                newNode.nodeParent = node; //setting the parent of the new node 
            }
            else {
                this.insertionNode(node.nodeRight, newNode); //traverse the right subtree 
            }
        }
    }
    Remove(data) {
        this.root = this.removeNode(this.root, data); 
    }
    removeNode(node, k) {
        if(node === null)  { //if node not found or tree empty return null 
            return null; 
        }
        if(this.compare(k, node.data) === COMPARISON.SMALLER) { //if the value is smaller than current node then the node to remove is on the left subtree
            node.nodeLeft = this.removeNode(node.nodeLeft, k);
            return node;
        }
        else if(this.compare(k, node.data) === COMPARISON.GREATER) { //if the value is greater than current node then the node to remove is on the right subtree
            node.nodeRight = this.removeNode(node.nodeRight, k);
            return node; 
        }
        else {
            if(node.isLeaf) { //if node is leaf(no children), node is set to null 
                this.node = null; 
                return node; 
            }
            if(node.nodeRight === null) { //if node has one children. Update node with the non-null child
                node = node.nodeLeft;
                return node; 
            }
            else if(node.nodeLeft === null) {
                node = node.nodeRight; 
                return node; 
            }
            //if node has 2 children. Find the min. value node in the right subtree 
            //copy the data to the current node and remove the min.value node
            const minNode = this.lookupMinNode(node.nodeRight); 
            node.data = minNode.data; 
            node.nodeRight = this.removeNode(node.nodeRight, minNode.data);
            return node; 
        } 
    }
    lookupMinNode(node){
        if(node.nodeLeft === null) { //if left child is null it means the current node is the min. value
            return node; 
        }
        return this.lookupMinNode(node.nodeLeft); //if not null then there is smaller value in the left so keep searching
    }
    search(node){
        return this.lookup(this.root, data);
    }
    lookup(node, k) {
        if(node === null) { //if node cannot be found
            return null; //return null
        }
        else if(this.compare(k, node.data) === COMPARISON.EQUAL) {
            return node; //node is found 
        }
        else if(this.compare(k, node.data) === COMPARISON.SMALLER) { //if value is smaller than current node then look at left subtree
            return this.lookup(node.nodeLeft, k);
        }
        else {
            return this.lookup(node.nodeRight, k); //otherwise look at right subtree
        }

    }
}

  