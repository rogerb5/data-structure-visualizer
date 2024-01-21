<<<<<<< HEAD
class MaxHeapUI {
    constructor() {
    }

    highlightFamily(index) {
        const parentNode = document.querySelectorAll('.node')[index];
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);
        parentNode.classList.add('node-hover');
        if (leftChildIndex < this.size) {
            const leftChildNode = document.querySelectorAll('.node')[leftChildIndex];
            leftChildNode.classList.add('node-hover');
        }
        if (rightChildIndex < this.size) {
            const rightChildNode = document.querySelectorAll('.node')[rightChildIndex];
            rightChildNode.classList.add('node-hover');
        }
    }

    removeHighlight(index) {
        const parentNode = document.querySelectorAll('.node')[index];
        const leftChildIndex = this.getLeftChildIndex(index);
        const rightChildIndex = this.getRightChildIndex(index);
        parentNode.classList.remove('node-hover');
        if (leftChildIndex < this.size) {
            const leftChildNode = document.querySelectorAll('.node')[leftChildIndex];
            leftChildNode.classList.remove('node-hover');
        }
        if (rightChildIndex < this.size) {
            const rightChildNode = document.querySelectorAll('.node')[rightChildIndex];
            rightChildNode.classList.remove('node-hover');
        }
    }
=======
>>>>>>> 3680339321b7bb29dbdeceaa30bf537883ace480

    startExtractMaxAnimation(firstHeapIndex, lastHeapIndex) {
        const lastNode = document.querySelectorAll('.node')[lastHeapIndex];
        lastNode.classList.add('node-last');
        const maxNode = document.querySelectorAll('.node')[firstHeapIndex];
        maxNode.classList.add('node-max');
        setTimeout(() => {
            lastNode.classList.remove('node-last');
            maxNode.classList.remove('node-max');
            lastNode.remove();
        }, 1000);
    }

    startSwapAnimation(indexOne, indexTwo) {
        const nodeOne = document.querySelectorAll('.node')[indexOne];
        const nodeTwo = document.querySelectorAll('.node')[indexTwo];
        nodeOne.classList.add('node-swapping');
        nodeTwo.classList.add('node-swapping');
        nodeOne.textContent = this.data[indexOne];
        nodeTwo.textContent = this.data[indexTwo];
        setTimeout(() => {
            nodeOne.classList.remove('node-swapping');
            nodeTwo.classList.remove('node-swapping');
        }, 1000);
    }

    addRemoveHover() {
        const allNodes = document.querySelectorAll('.node');
        allNodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                this.highlightFamily(index);
            });

            node.addEventListener('mouseleave', () => {
                this.removeHighlight(index);
            });
        });
    }

    createHeapLevels() {
        const baseFontSize = 12;
        const container = document.querySelector('div.maxheap-container');
        container.innerHTML = '';
        for (let i = 0; i < this.size; i++) {
            const level = Math.floor(Math.log2(i + 1));
            const elementsInRow = Math.pow(2, level);
            const row = document.createElement('div');
            row.classList.add('level'); // add css 
            container.appendChild(row);
            const columnWidthPercentage = 100 / elementsInRow;
            const fontSize = (baseFontSize * (11 - 1 * level) / 100) + 'rem';
            for (let j = 0; j < elementsInRow && i < this.size; j++) {
                const node = document.createElement('div');
                node.classList.add('node');
                node.textContent = this.data[i];
                node.style.fontSize = fontSize;
                row.appendChild(node);
                i++;
            }
            i--;
            row.style.gridTemplateColumns = `repeat(${elementsInRow}, minmax(${columnWidthPercentage / 2}%, 1fr))`;
        }
        this.addRemoveHover();
    }
}

class MaxHeap extends MaxHeapUI {
    constructor() {
        super();
        this.data = [];
        this.size = 0;
    }

    getParentIndex(index) {
        if (index <= 0) {
            index = 0
            return index;
        }
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return index * 2 + 1;
    }

    getRightChildIndex(index) {
        return index * 2 + 2;
    }

    add(value) {
        if (!this.data.includes(value)) {
            this.data[this.size] = value;
            this.size++;
            this.createHeapLevels();
            this.isEmpty();
            this.getSize();
            this.heapifyUp();
        }
    }

    extractMax() {
        if (this.size === 0) {
            return null;
        }
        const firstIndex = 0;
        this.swap(firstIndex, this.size - 1);
        const max = this.data.pop();
        this.startExtractMaxAnimation(firstIndex, this.size - 1);
        this.size--;
        this.getSize();
        this.isEmpty();
        this.heapifyDown(firstIndex);
        return max;
    }

    swap(index1, index2) {
        const temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
        this.startSwapAnimation(index1, index2);
    }

    heapifyUp() {
        let lastIndex = this.size - 1;
        while (this.data[this.getParentIndex(lastIndex)] < this.data[lastIndex]) {
            const parentIndex = this.getParentIndex(lastIndex);
            this.swap(parentIndex, lastIndex);
            lastIndex = parentIndex;
        }
    }

    heapifyDown(firstIndex) {
        while (this.getLeftChildIndex(firstIndex) < this.size) {
            let biggestSiblingIndex = this.getLeftChildIndex(firstIndex);
            if (this.getRightChildIndex(firstIndex) < this.size
                && this.data[this.getRightChildIndex(firstIndex)] > this.data[biggestSiblingIndex]) {
                biggestSiblingIndex = this.getRightChildIndex(firstIndex);
            }
            if (this.data[firstIndex] < this.data[biggestSiblingIndex]) {
                this.swap(firstIndex, biggestSiblingIndex);
                firstIndex = biggestSiblingIndex;
            } else {
                return;
            }
        }
    }

    getSize() {
        const sizeOutput = document.querySelector('p.size-output');
        sizeOutput.textContent = `Size: ${this.size}`;
        return this.size;
    }

    isEmpty() {
        const isEmptyOutput = document.querySelector('p.isEmpty-output');
        isEmptyOutput.textContent = `isEmpty? ${this.size === 0}`;
        return this.size === 0;
    }

    contains(value) {
        for (let index = 0; index < this.size; index++) {
            if (this.data[index] === value) {
                return true;
            }
        }
        return false;
    }

    clear() {
        const allNodes = document.querySelectorAll('.node');
        allNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('clear');
            }, index * 100)
        })
        this.data = [];
        this.size = 0;
        this.isEmpty();
        this.getSize();
    }

    buildMaxHeap() { // not used 
        const lastNonLeafIndex = Math.floor(this.size / 2) - 1;
        for (let i = lastNonLeafIndex; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    toString() {
        let result = '[';
        for (let index = 0; index < this.size; index++) {
            result += this.data[index];
            if (index < this.size - 1) {
                result += ', ';
            }
        }
        result += ']';
        return result;
    }
}

<<<<<<< HEAD
export { MaxHeapUI, MaxHeap }; // export MaxHeapUI, and MaxHeap
=======

/*

 TESTING CODE --------------------------------------------------

*/
const heap = new MaxHeap();
heap.add(5);
heap.add(2);
heap.add(6);
heap.add(7);
heap.add(1);
heap.add(4);
heap.add(3);

/* A valid max heap using maxHeapify in the add method
     7
   /  \
  6    5
 /\   / \
2  1 4   3

[7, 6, 5, 2, 1, 4, 3]

*/

/* A valid max heap using floyd's buildHeap algorithm, 
   and not using maxHeapify() in the add method, both implmentations are correct but floyds is faster.
     7
    / \
   5   6
  /\   /\
 2  1  4 3

 [7, 5, 6, 2, 1, 4, 3]
*/

console.log("Before build: " + heap.toString() + " size: " + heap.getSize()); // Before build: [5, 2, 6, 7, 1, 4, 3] size: 7
heap.buildMaxHeap();
console.log("After build: " + heap.toString() + " size: " + heap.getSize()); // After build:   [7, 5, 6, 2, 1, 4, 3] size: 7

heap.extractMax();
console.log("MaxHeap: after extract max: " + heap.toString() + " size: " + heap.getSize()); // [6, 3, 5, 2, 1, 4]

/*
 The result is still a valid max heap after extractMax of 7. Using add method with heapifyUp
    6
   / \
  3   5
 / \ /
2  1 4

[6, 3, 5, 2, 1, 4] size: 6

*/

/*
 The result is still a valid max heap after extractMax of 7. Using floyd's algorithm
    6(0)
   /    \
5(1)     4(2)
 /  \      /
2(3) 1(4) 3(5)

  0  1  2  3  4  5
 [6, 5, 4, 2, 1, 3] size: 6
*/

// Testing getParent()
// Index 0: Value = 6, Parent Index = 0, Parent Value = 6
// Index 1: Value = 5, Parent Index = 0, Parent Value = 6
// Index 2: Value = 4, Parent Index = 0, Parent Value = 6
// Index 3: Value = 2, Parent Index = 1, Parent Value = 5
// Index 4: Value = 1, Parent Index = 1, Parent Value = 5
// Index 5: Value = 3, Parent Index = 2, Parent Value = 4

function testGetParentIndex(heap) {
    for (let index = 0; index < heap.getSize(); index++) {
        const parentIndex = heap.getParentIndex(index);
        const value = heap.data[index];
        const parentValue = heap.data[parentIndex];
        console.log(`Index ${index}: Value = ${value}, Parent Index = ${parentIndex}, Parent Value = ${parentValue}`);
    }
}
>>>>>>> 3680339321b7bb29dbdeceaa30bf537883ace480
