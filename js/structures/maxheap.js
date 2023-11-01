/*
  To do implement 

  heapifyUp();
  heapifyDown();

  extractMax();
  contains();
  size();

  Open the browser console to see results.
  Array Based Max Tree Heap
*/

class MaxHeap {
    constructor() {
        this.data = [];
        this.size = 0;
    }
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        console.log('left child value', this.data[index * 2 + 1]);
        return index * 2 + 1;
    }

    getRightChildIndex(index) {
        console.log('right child value', this.data[index * 2 + 2]);
        return index * 2 + 2;
    }

    add(key) {
        this.data[this.size] = key;
        this.size++;
    }

    toString() {
        let result = 'MaxHeap Array Representation: [';
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

const heap = new MaxHeap();
heap.add(2);
heap.add(11);
heap.add(27);

/* Testing Methods */
console.log(heap.getLeftChildIndex(0)); // Output: left child value – 11, index 1
console.log(heap.getRightChildIndex(0)); // Output: right child value - 27, index 2
console.log(heap.toString()); // Output: MaxHeap Array Representation: [2, 11, 27]