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

class NodeBST {
    constructor(data, nodeParent) { //constructor 
        this.data = data !== undefined ? data.toString() : ''; // storing the data
        this.nodeLeft = null; //initialize left child node
        this.nodeRight = null; //initialize right child node 
        this.nodeParent = nodeParent || null; //set parent node or null if not provided
        this.bstContainer = document.querySelector('section.bst-container');
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

class BinarySearchTree extends NodeBST {
    constructor(compare = Comparison.defaultCompareNumberFn) {
        super();
        this.root = null; //initialize the root as null
        this.compare = compare;
        this.size = 0;
    }
    clear() {
        this.root = null; 
        this.size = 0; 
    }

    // Insert(data) {
    //     const errorMessageContainer = document.getElementById('error-message');
    
    //     try {
    //         if (isNaN(data)) {
    //             throw new Error("Cannot insert null values");
    //         }
    
    //         const newNode = new NodeBST(data);
    //         if (this.root === null) {
    //             this.root = newNode;
    //         } else {
    //             this.insertionNode(this.root, newNode);
    //         }
    //         this.createNodeElement(newNode);
    //         errorMessageContainer.textContent = ''; // Clear any previous error messages
    //     } catch (error) {
    //         errorMessageContainer.textContent = error.message;
    //     }
    // }
    

    // insertionNode(node, newNode) {
    //     if (this.compare(newNode.data, node.data) === Comparison.SMALLER) { //if the new node is smaller that the current node
    //         if (node.nodeLeft === null) { //checks to see if left of the node is empty
    //             node.nodeLeft = newNode; //insert new node on the left if smaller than current node
    //             newNode.nodeParent = node; //setting the parent of the new node
    //         }
    //         else {
    //             this.insertionNode(node.nodeLeft, newNode); //traverse the left subtree 
    //         }
    //     }
    //     else if (this.compare(newNode.data, node.data) === Comparison.GREATER) { //if the new node is greater than the current node 
    //         if (node.nodeRight === null) { //checks to see if right of the node is empty 
    //             node.nodeRight = newNode; //insert new node on the right 
    //             newNode.nodeParent = node; //setting the parent of the new node 
    //         }
    //         else {
    //             this.insertionNode(node.nodeRight, newNode); //traverse the right subtree 
    //         }
    //     }
    // }

    Remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, k) {
        if (node === null) { //if node not found or tree empty return null 
            return null;
        }
        if (this.compare(k, node.data) === Comparison.SMALLER) { //if the value is smaller than current node then the node to remove is on the left subtree
            node.nodeLeft = this.removeNode(node.nodeLeft, k);
        }
        else if (this.compare(k, node.data) === Comparison.GREATER) { //if the value is greater than current node then the node to remove is on the right subtree
            node.nodeRight = this.removeNode(node.nodeRight, k);
        }
        else {
            if (node.isLeaf) { //if node is leaf(no children), node is set to null 
                return null;
            }
            if (node.nodeRight === null) { //if node has one children. Update node with the non-null child
                return node.nodeLeft;
            }
            else if (node.nodeLeft === null) {
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

    getminValue() {
        const minimum = this.minValue(this.root);
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (node.textContent === minimum.toString()) {
                node.style.animation = 'colorMin 3s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 3000); // should be equal to 3s = 3000ms, 1s = 1000ms, etc...
            }
        });
        return minimum;
    }

    minValue(current) {
        if (current === null) {
            throw new Error('No Such Element Exception');
        } else if (current.nodeLeft !== null) {
            return this.minValue(current.nodeLeft);
        } else {
            return current.data;
        }
    }

    getmaxValue() {
        const maximum = this.maxValue(this.root);
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (node.textContent === maximum.toString()) {
                node.style.animation = 'colorMax 3s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 3000);
            }
        });
        return maximum;
    }

    maxValue(current) {
        if (current === null) {
            throw new Error('No Such Element Exception');
        } else if (current.nodeRight !== null) {
            return this.maxValue(current.nodeRight);
        } else {
            return current.data;
        }
    }

    inOrderTraverse(node, call) {
        if (node != null) {
            this.inOrderTraverse(node.nodeLeft, call);
            call(node.data);
            this.inOrderTraverse(node.nodeRight, call);
        }
    }

    inOrder(call) {
        this.inOrderTraverse(this.root, call);
    }

    postOrderTraverse(node, call) {
        if (node != null) {
            this.postOrderTraverse(node.nodeLeft, call);
            this.postOrderTraverse(node.nodeRight, call);
            call(node.data);
        }
    }

    postOrder(call) {
        this.postOrderTraverse(this.root, call);
    }

    preOrderTraverse(node, call) {
        if (node != null) {
            call(node.data);
            this.preOrderTraverse(node.nodeLeft, call);
            this.preOrderTraverse(node.nodeRight, call);
        }
    }

    preOrder(call) {
        this.preOrderTraverse(this.root, call);
    }
add(value) {
    this.root = this.addNode(this.root, value);
    this.size++;
    this.insertNewValue(this.bstContainer, value);
}

addNode(root, value) {
    if (root === null) {
        return new NodeBST(value);
    }

    if (value <= root.data) {
        root.nodeLeft = this.addNode(root.nodeLeft, value);
        root.nodeLeft.nodeParent = root; // Set the parent of the left child
    } else {
        root.nodeRight = this.addNode(root.nodeRight, value);
        root.nodeRight.nodeParent = root; // Set the parent of the right child
    }

    return root;
}

  // create domElement for node
  newNodeElement(value) {
    const elem = document.createElement('div');
    elem.classList.add('row');
    elem.innerHTML = `<div class="node">${value}</div>`;
    return elem;
}

// recursive insertion
insertNewValue(tree, newValue) {
    const currentNode = tree.querySelector('.node');
    if (currentNode) {
        const currentValue = Number(currentNode.textContent);
        if (newValue > currentValue) {
            if (!tree.querySelector('.right')) {
                const rightContainer = document.createElement('section');
                rightContainer.classList.add('bst-container', 'right');
                tree.appendChild(rightContainer);
            }
            this.insertNewValue(tree.querySelector('.right'), newValue);
        } else {
            if (!tree.querySelector('.left')) {
                const leftContainer = document.createElement('section');
                leftContainer.classList.add('bst-container', 'left');
                tree.appendChild(leftContainer);
            }
            this.insertNewValue(tree.querySelector('.left'), newValue);
        }
    } else {
        tree.appendChild(this.newNodeElement(newValue));
    }
}


    
    
    

    // Function to mark a node with a red circle
    markNodeWithRedCircle(node) {
        // Clear any previous red circles
        this.clearRedCircle();
    
        // Find the corresponding node element in the DOM
        const container = document.querySelector('section.binarytree-container');
        const level = this.getLevel(node);
        const row = container.querySelector(`.level-${level}`);
        
        if (row) {
            const nodes = row.getElementsByClassName('bst-node');
            
            for (const nodeElement of nodes) {
                if (nodeElement.textContent === node.data) {
                    // Create a red circle and append it to the node element
                    const redCircle = document.createElement('div');
                    redCircle.classList.add('red-circle');
                    nodeElement.appendChild(redCircle);
                    break; // Stop the loop once the node is found
                }
            }
        }
    }
    
    
    getLevel(node) {
        let level = 0;
        let currentNode = node;
        
        while (currentNode.nodeParent) {
            currentNode = currentNode.nodeParent;
            level++;
        }
    
        return level;
    }
    


    // Function to clear any red circles
    clearRedCircle() {
        const existingRedCircle = document.querySelector('.red-circle');
        if (existingRedCircle) {
            existingRedCircle.remove();
        }
    }
       // Function to mark a node with a red circle
       markNodeWithGreenCircle(node) {
        // Clear any previous red circles
        this.clearGreenCircle();
    
        // Find the corresponding node element in the DOM
        const container = document.querySelector('section.binarytree-container');
        const level = this.getLevel(node);
        const row = container.querySelector(`.level-${level}`);
        
        if (row) {
            const nodes = row.getElementsByClassName('bst-node');
            
            for (const nodeElement of nodes) {
                if (nodeElement.textContent === node.data) {
                    // Create a red circle and append it to the node element
                    const greenCircle = document.createElement('div');
                    greenCircle.classList.add('green-circle');
                    nodeElement.appendChild(greenCircle);
                    break; // Stop the loop once the node is found
                }
            }
        }
    }
    // Function to clear any red circles
    clearGreenCircle() {
        const existingGreenCircle = document.querySelector('.green-circle');
        if (existingGreenCircle) {
            existingGreenCircle.remove();
        }
    }

}


export { Comparison, NodeBST, BinarySearchTree };