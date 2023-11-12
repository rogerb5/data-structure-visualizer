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
        // this.heapifyUp(); since I am using floyd's no need to heapifyUp()
    }

    extractMax() {
        if (this.size === 0) {
            return null;
        }
        const firstIndex = 0;
        this.swap(firstIndex, this.size - 1);
        const max = this.data.pop();
        this.size--;
        this.heapifyDown(firstIndex);
        return max;
    }

    swap(index1, index2) {
        const temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
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