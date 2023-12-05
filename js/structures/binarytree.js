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
    constructor() {
        super();
        this.root = null; //initialize the root as null
        this.size = 0;
    }
    clear() {
        this.root = null; 
        this.size = 0; 
        this.bstContainer.innerHTML = '';
    }
    add(value) {
        this.root = this.addNode(this.root, value);
        this.size++;
        this.updateDOM();
    }
    
    addNode(root, value) {
        if (root === null) {
            return new NodeBST(value);
        } else if (value <= root.data) {
            root.nodeLeft = this.addNode(root.nodeLeft, value);
        } else {
            root.nodeRight = this.addNode(root.nodeRight, value);
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
updateDOM() {
    this.bstContainer.innerHTML = '';
    this.buildTreeDOM(this.root, this.bstContainer);
}
    
     // Recursive
     buildTreeDOM(node, parentElement) {
        if (node !== null) {
            const container = document.createElement('section');
            container.classList.add('bst-container');
            const row = this.newNodeElement(node.data);
            container.appendChild(row);
            if (node.left !== null) {
                const leftDiv = document.createElement('div');
                leftDiv.classList.add('left'); // left subtree
                container.appendChild(leftDiv);
                this.buildTreeDOM(node.nodeLeft, leftDiv);
            }
            if (node.right !== null) {
                const rightDiv = document.createElement('div');
                rightDiv.classList.add('right'); // right subtree
                container.appendChild(rightDiv);
                this.buildTreeDOM(node.nodeRight, rightDiv);
            }
            parentElement.appendChild(container);
        }
    }


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
    
    highlightNode(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            // Ensure both values are integers for accurate comparison
            if (parseInt(node.textContent) === parseInt(value)) {
                node.style.animation = 'colorSearch 3s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 3000);
            }
        });
    }

    
    contains(value) {
        return this.containsNode(this.root, value);
    }
    
    containsNode(current, value) {
        if (current === null) {
            return false;
        } else if (parseInt(current.data) === parseInt(value)) {
            return true;
        } else if (parseInt(current.data) < parseInt(value)) {
            return this.containsNode(current.nodeRight, value);
        } else {
            return this.containsNode(current.nodeLeft, value);
        }
    }


    highlightInOrder(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (parseInt(node.textContent) === parseInt(value)) {
                node.style.animation = 'colorinOrder 3s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 3000);
            }
        });
    }

    highlightPreOrder(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (parseInt(node.textContent) === parseInt(value)) {
                node.style.animation = 'colorpreOrder 3s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 3000);
            }
        });
    }

    highlightPostOrder(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (parseInt(node.textContent) === parseInt(value)) {
                node.style.animation = 'colorpostOrder 3s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 3000);
            }
        });
    }

    async inOrderTraverse(node) {
        if (node != null) {
            await this.inOrderTraverse(node.nodeLeft);
            this.highlightInOrder(node.data);
            await this.wait(3000);
            await this.inOrderTraverse(node.nodeRight);
        }
    }

    async postOrderTraverse(node) {
        if (node != null) {
            await this.postOrderTraverse(node.nodeLeft);
            await this.postOrderTraverse(node.nodeRight);
            this.highlightPostOrder(node.data);
            await this.wait(3000);
        }
    }

    async preOrderTraverse(node) {
        if (node != null) {
            this.highlightPreOrder(node.data);
            await this.wait(3000);
            await this.preOrderTraverse(node.nodeLeft);
            await this.preOrderTraverse(node.nodeRight);
        }
    }
    async wait(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

}
export {NodeBST, BinarySearchTree };