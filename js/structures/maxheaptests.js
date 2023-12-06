import { MaxHeap } from './maxheap.js'; // IMPORT

/*
   TEST FILE ---------------------------------------------------------------------
*/

/* A valid max heap using maxHeapify in the add method
     7
   /  \
  6    5
 /\   / \
2  1 4   3

[7, 6, 5, 2, 1, 4, 3]

*/

/* 
  A valid max heap using floyd's buildHeap algorithm, 
   and not using maxHeapify() in the add method, both implmentations are correct but floyd's is faster.
     7
    / \
   5   6
  /\   /\
 2  1  4 3

 [7, 5, 6, 2, 1, 4, 3]
*/

const heap = new MaxHeap();
heap.add(5);
heap.add(2);
heap.add(6);
heap.add(7);
heap.add(1);
heap.add(4);
heap.add(3);


console.log("--------TESTING BEFORE/AFTER BUILD INCLUDING SIZE ------------")
// Before build: [5, 2, 6, 7, 1, 4, 3] size: 7
console.log("Before build: " + heap.toString() + " size: " + heap.getSize());
heap.buildMaxHeap();

// After build:   [7, 5, 6, 2, 1, 4, 3] size: 7
console.log("After build: " + heap.toString() + " size: " + heap.getSize());

console.log("--------TESTING extractMax() INCLUDING SIZE------------")
heap.extractMax();
console.log("After extract max: " + heap.toString() + " size: " + heap.getSize()); // [6, 3, 5, 2, 1, 4]

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
      6 
   /    \
   5     4
 /  \    /
2    1  3

  0  1  2  3  4  5
 [6, 5, 4, 2, 1, 3] size: 6
*/

/*
    Testing parent method -----------------------------------------
       6(0)
    /       \
  5(1)      4(2)
  /  \       /
 2(3) 1(4) 3(5)

  0  1  2  3  4  5
 [6, 5, 4, 2, 1, 3] size: 6
*/

/* 
   Index 0: Value = 6, Parent Index = 0, Parent Value = 6
   Index 1: Value = 5, Parent Index = 0, Parent Value = 6
   Index 2: Value = 4, Parent Index = 0, Parent Value = 6
   Index 3: Value = 2, Parent Index = 1, Parent Value = 5
   Index 4: Value = 1, Parent Index = 1, Parent Value = 5
   Index 5: Value = 3, Parent Index = 2, Parent Value = 4
*/

console.log("--------TESTING getParentIndex()------------")
function testGetParentIndex(heap) {
    for (let index = 0; index < heap.getSize(); index++) {
        const parentIndex = heap.getParentIndex(index);
        const value = heap.data[index];
        const parentValue = heap.data[parentIndex];
        console.log(`Index ${index}: Value = ${value}, Parent Index = ${parentIndex}, Parent Value = ${parentValue}`);
    }
}

testGetParentIndex(heap);

/*
    --------------------------------- Testing contains method 
*/
console.log("--------TESTING CONTAINS()------------")
function testContainsMethod(heap) {
    for (let index = 0; index < heap.getSize(); index++) {
        console.log('heap contains value? ' + heap.data[index] + ' ' + heap.contains(heap.data[index]));
    }
}


console.log('heap contains value? -1 ' + heap.contains(-1));
console.log('heap contains value? 0 ' + heap.contains(0));
console.log('heap contains value? 200 ' + heap.contains(200));

testContainsMethod(heap);