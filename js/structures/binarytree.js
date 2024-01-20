class NodeBST {
    constructor(data, nodeLeft = null, nodeRight = null) { //constructor
        this.data = data;
        this.nodeLeft = nodeLeft; //initialize left child node
        this.nodeRight = nodeRight; //initialize right child node 
    }
}

class BinarySearchTree extends NodeBST {
    constructor() {
        super();
        this.root = null; //initialize the root as null
        this.size = 0;
        this.bstContainer = document.querySelector('section.bst-container');
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
        } else if (value < root.data) {
            root.nodeLeft = this.addNode(root.nodeLeft, value);
        } else if(value > root.data) {
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

    remove(value) {
        this.root = this.removeNode(this.root, value);
        this.updateDOM();
    }

    removeNode(current, value) {
        if (current === null) {
            return null;
        }
    
        if (value < current.data) {
            current.nodeLeft = this.removeNode(current.nodeLeft, value);
        } else if (value > current.data) {
            current.nodeRight = this.removeNode(current.nodeRight, value);
        } else {
            if (this.isLeaf(current)) {
                return null;
            }
            if (current.nodeLeft === null) {
                return current.nodeRight;
            } else if (current.nodeRight === null) {
                return current.nodeLeft;
            } else {
                const maxNode = this.findMaxValueNode(current.nodeLeft);
                current.data = maxNode.data;
                current.nodeLeft = this.removeNode(current.nodeLeft, maxNode.data);
            }
        }
        return current;
    }
    

    findMaxValueNode(node) {
        if (node === null) {
            return null;
        }
        while (node.nodeRight !== null) {
            node = node.nodeRight;
        }
        return node;
    }
    isLeaf(node) {
        return node.left === null && node.right === null;
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
            if (parseInt(node.textContent) === value) {
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
        } else if (current.data === value) {
            return true;
        } else if (current.data < value) {
            return this.containsNode(current.nodeRight, value);
        } else {
            return this.containsNode(current.nodeLeft, value);
        }
    }


    highlightInOrder(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (parseInt(node.textContent) === value) {
                node.style.animation = 'colorinOrder 2s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 2000);
            }
        });
    }

    highlightPreOrder(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (parseInt(node.textContent) === value) {
                node.style.animation = 'colorpreOrder 2s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 2000);
            }
        });
    }

    highlightPostOrder(value) {
        const nodes = this.bstContainer.querySelectorAll('.node');
        nodes.forEach(node => {
            if (parseInt(node.textContent) === value) {
                node.style.animation = 'colorpostOrder 2s';
                setTimeout(() => {
                    node.style.animation = '';
                }, 2000);
            }
        });
    }

    async inOrderTraverse(node) {
        if (node != null) {
            await this.inOrderTraverse(node.nodeLeft);
            this.highlightInOrder(node.data);
            await this.wait(2000);
            await this.inOrderTraverse(node.nodeRight);
        }
    }

    async postOrderTraverse(node) {
        if (node != null) {
            await this.postOrderTraverse(node.nodeLeft);
            await this.postOrderTraverse(node.nodeRight);
            this.highlightPostOrder(node.data);
            await this.wait(2000);
        }
    }

    async preOrderTraverse(node) {
        if (node != null) {
            this.highlightPreOrder(node.data);
            await this.wait(2000);
            await this.preOrderTraverse(node.nodeLeft);
            await this.preOrderTraverse(node.nodeRight);
        }
    }
    async wait(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

}
export {NodeBST, BinarySearchTree };