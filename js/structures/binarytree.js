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

class BinarySearchTree{
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
        return this.nodeLeft == null && this.nodeRight == null;
        //returns true if both left and right children are null(no children)
    }
}
  