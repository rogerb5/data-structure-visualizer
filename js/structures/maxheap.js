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

    isEmpty() {
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

export default MaxHeap; // export max heap