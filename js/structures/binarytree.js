class Comparison {
    static SMALLER = -1;
    static GREATER = 1;
    static EQUAL = 0;

    static defaultCompareNumberFn(x, y) {
        if (Number(x) == Number(y)) {
            return Comparison.EQUAL;
        }

        return Number(x) < Number(y) ? Comparison.SMALLER : Comparison.GREATER;
    }
}

class NodeBST{
    constructor(data, nodeParent) { //constructor 
        this.data = data !== undefined ? data.toString() : ''; // storing the data
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

class BinarySearchTree extends NodeBST{
    constructor(compare = Comparison.defaultCompareNumberFn) {
        super();
        this.root = null; //initialize the root as null
        this.compare = compare;
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
        }
        else if(this.compare(k, node.data) === COMPARISON.GREATER) { //if the value is greater than current node then the node to remove is on the right subtree
            node.nodeRight = this.removeNode(node.nodeRight, k);
        }
        else {
            if(node.isLeaf) { //if node is leaf(no children), node is set to null 
                return null;
            }
            if(node.nodeRight === null) { //if node has one children. Update node with the non-null child
                return node.nodeLeft;
            }
            else if(node.nodeLeft === null) {
                return node.nodeRight; 
            }
            else {

            //if node has 2 children. Find the min. value node in the right subtree 
            //copy the data to the current node and remove the min.value node
            const minNode = this.lookupMinNode(node.nodeRight); 
            node.data = minNode.data; 
            node.nodeRight = this.removeNode(node.nodeRight, minNode.data);
            }
        } 
        return node;
    }
    lookupMinNode(node){
        if(node.nodeLeft === null) { //if left child is null it means the current node is the min. value
            return node; 
        }
        return this.lookupMinNode(node.nodeLeft); //if not null then there is smaller value in the left so keep searching
    }
    lookupMaxNode(node){
        if(node.nodeRight === null) { //if left child is null it means the current node is the min. value
            return node; 
        }
        return this.lookupMaxNode(node.nodeRight); //if not null then there is smaller value in the left so keep searching
    }
    lookup(node){
        return this.lookupNode(this.root, data);
    }
    lookupNode(node, k) {
        if(node === null) { //if node cannot be found
            return null; //return null
        }
        else if(this.compare(k, node.data) === COMPARISON.EQUAL) {
            return node; //node is found 
        }
        else if(this.compare(k, node.data) === COMPARISON.SMALLER) { //if value is smaller than current node then look at left subtree
            return this.lookupNode(node.nodeLeft, k);
        }
        else {
            return this.lookupNode(node.nodeRight, k); //otherwise look at right subtree
        }
    }
    inOrderTraverse(node,call) {
        if(node != null) {
            this.inOrderTraverse(node.nodeLeft, call);
            call(node.data);
            this.inOrderTraverse(node.nodeRight, call); 
        }
    }
    inOrder(call) {
        this.inOrderTraverse(this.root, call);
    }
    postOrderTraverse(node,call) {
        if(node!= null) {
            this.postOrderTraverse(node.nodeLeft, call);
            this.postOrderTraverse(node.nodeRight, call); 
            call(node.data);
        }
    }
    postOrder(call) {
        this.postOrderTraverse(this.root, call);
    }
    preOrderTraverse(node,call) {
        if(node!= null) {
            call(node.data);
            this.preOrderTraverse(node.nodeLeft, call);
            this.preOrderTraverse(node.nodeRight, call); 
        }
    }
    preOrder(call) {
        this.preOrderTraverse(this.root, call);
    }

}
export{Comparison,NodeBST,BinarySearchTree};