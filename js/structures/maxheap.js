
// Todo: contains method
class MaxHeap {
    constructor() {
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
        this.data[this.size] = value;
        this.size++;
        // this.heapifyUp();
    }

    extractMax() {
        if (this.size === 0) {
            return null;
        }
        this.swap(0, this.size - 1);
        const max = this.data.pop();
        this.size--;
        this.heapifyDown(0);
        return max;
    }

    swap(index1, index2) {
        const temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
    }

    heapifyUp() {
        let currentIndex = this.size - 1;
        while (this.data[this.getParentIndex(currentIndex)] < this.data[currentIndex]) {
            const parentIndex = this.getParentIndex(currentIndex);
            this.swap(parentIndex, currentIndex);
            currentIndex = parentIndex;
        }
    }

    heapifyDown(currentIndex) {
        while (this.getLeftChildIndex(currentIndex) < this.size) {
            let biggestChildIndex = this.getLeftChildIndex(currentIndex);
            if (this.getRightChildIndex(currentIndex) < this.size &&
                this.data[this.getRightChildIndex(currentIndex)] > this.data[biggestChildIndex]) {
                biggestChildIndex = this.getRightChildIndex(currentIndex);
            }
            if (this.data[currentIndex] < this.data[biggestChildIndex]) {
                this.swap(currentIndex, biggestChildIndex);
                currentIndex = biggestChildIndex;
            } else {
                return;
            }
        }
    }

    getSize() {
        return this.size;
    }

    buildMaxHeap() {
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
