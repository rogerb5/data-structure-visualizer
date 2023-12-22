class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class CircularDoublyLinkedList extends Node {
    constructor() {
        super();
        this.head = null;
        this.tail = null;

        this._listContainer = document.querySelector('main.list-container');
    }

    get listContainer() {
        return this._listContainer;
    }

    isEmpty() {
        return this.head === null;
    }

    //add node at the end of the list
    append(data) {
        const newNode = new Node(data);
        const nodeComponent = document.createElement('div');
        nodeComponent.classList.add('node');
        nodeComponent.classList.add('append-node-animation') // using css to animate
        const nodeParagraphComponent = document.createElement('p');
        nodeParagraphComponent.classList.add('p');
        nodeParagraphComponent.textContent = data;

        nodeComponent.append(nodeParagraphComponent);
        this.listContainer.append(nodeComponent);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size(); // get dynamic size
        //make it circular
        this.tail.next = this.head;
        this.head.prev = this.tail;
    }

    //add node at the beginning of the list
    prepend(data) {
        const newNode = new Node(data);
        const nodeComponent = document.createElement('div');
        nodeComponent.classList.add('node');
        nodeComponent.classList.add('prepend-node-animation') // using css to animate
        const nodeParagraphComponent = document.createElement('p');
        nodeParagraphComponent.classList.add('p');
        nodeParagraphComponent.textContent = data;
        nodeComponent.append(nodeParagraphComponent);
        this.listContainer.prepend(nodeComponent);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        //make it circular
        this.tail.next = this.head;
        this.head.prev = this.tail;
        this.size();
    }

    // display() {
    //     if (this.isEmpty()) {
    //         return ('Empty List');
    //     }
    //     let result = "";
    //     let current = this.head;
    //     do {
    //         result += current.data + " <-> ";
    //         current = current.next;
    //     } while (current != this.head);
    //     return result.substring(0, result.length - 4);
    // }


    removeNodesByValue(value) {
        if (this.head === null) {
            throw new Error('List is empty');
        }

        let current = this.head;
        let removedNodesCount = 0;

        do {
            if (current && current.data === value) {
                const nodeComponents = this.findNodeComponents(current);
                if (nodeComponents) {
                    // Remove the corresponding DOM elements
                    nodeComponents.forEach((nodeComponent) => {
                        nodeComponent.remove();
                    });
                }

                if (current === this.head) {
                    this.head = current.next;
                }
                if (current === this.tail) {
                    this.tail = current.prev;
                }
                current.prev.next = current.next;
                current.next.prev = current.prev;
                removedNodesCount++;
            }
            if (current) {
                current = current.next;
            }
        } while (current !== this.head);

        if (removedNodesCount > 0) {
            console.log(`Removed ${removedNodesCount} nodes with value: ${value}`);
        } else {
            console.log(`No nodes with value ${value} found`);
        }
    }


    //add at specified position
    insertAtPosition(position, data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.head.next = this.head;
            this.head.prev = this.head;
        }
        else {
            let current = this.head;
            let count = 1;
            while (count < position - 1 && current.next != this.head) {
                current = current.next;
                count++;
            }
            newNode.next = current.next;
            newNode.prev = current;
            current.next.prev = newNode;
            current.next = newNode;
        }
        //make it circular
        this.tail.next = this.head;
        this.head.prev = this.tail;
    }

    findNodeComponents(node) {
        const allNodes = document.querySelectorAll('.node');
        const matchingNodes = [];

        for (const nodeComponent of allNodes) {
            if (parseInt(nodeComponent.textContent) === node.data) {
                matchingNodes.push(nodeComponent);
            }
        }

        return matchingNodes.length > 0 ? matchingNodes : null;
    }

    highlightNodes(nodes) {
        const allNodes = document.querySelectorAll('.node');
        allNodes.forEach((n) => {
            n.classList.remove('found');
        });
        nodes.forEach((node) => {
            const nodeComponents = this.findNodeComponents(node);
            if (nodeComponents) {
                nodeComponents.forEach((nodeComponent) => {
                    nodeComponent.classList.add('found');
                    setTimeout(() => {
                        nodeComponent.classList.remove('found');
                    }, 3000);
                });
            }
        });
    }

    search(value) {
        if (!this.head) {
            throw new Error('List is empty');
            return;
        }

        let current = this.head;
        let foundNodes = [];

        do {
            if (current.data === value) {
                console.log('Node found: ' + value);
                foundNodes.push(current);
            }
            current = current.next;
        } while (current !== this.head);

        if (foundNodes.length > 0) {
            this.highlightNodes(foundNodes);
        } else {
            console.log('Node not found');
        }
    }
    //get the size of the list
    size() {
        if (!this.head) {
            return 0;
        }
        let count = 0;
        let current = this.head;
        while (current && current.next != this.head) {
            current = current.next;
            count++;
        }
        return count + 1;
    }

    //reverse the list
    // reverse() {
    //     if (!this.head) {
    //         throw new Error('List is empty');
    //         return;
    //     }
    //     let current = this.head;
    //     let previous = null;
    //     let next = null;
    //     while (current && current.next != this.head) {
    //         next = current.next;
    //         current.next = previous;
    //         current.prev = next;
    //         previous = current;
    //         current = next;
    //     }
    //     this.head = previous;
    //     const reverseOutput = document.querySelector('p.reverse-p');
    //     const isReversed = this.listContainer.classList.toggle('reverse');

    //     if (isReversed) {
    //         reverseOutput.textContent = 'The list is reversed!';
    //     } else {
    //         reverseOutput.textContent = 'The list is not reversed!';
    //     }
    // } couldnt get it to work

    clear() {
        const nodes = document.querySelectorAll('div.node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('remove-node-animation');
            }, index * 400);
            node.addEventListener('animationend', () => {
                node.remove();
            });
        });
        this.head = null;
        this.tail = null;
        this.size();
    }
}

export { Node, CircularDoublyLinkedList };