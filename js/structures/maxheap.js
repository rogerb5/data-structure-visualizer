class MaxHeapUI {
    constructor() {
    }

    createSwapAnimation() {

    }

    createHeapLevels() {
        const baseFontSize = 10;
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
            row.style.gridTemplateColumns = `repeat(${elementsInRow}, minmax(${columnWidthPercentage}%, 1fr))`;
        }
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
        this.data[this.size] = value;
        this.size++;
        this.heapifyUp();
        this.createHeapLevels();
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

    swap(index1, index2) { //todo add css keyframe triggered swap animation
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

    // buildMaxHeap() {
    //     const lastNonLeafIndex = Math.floor(this.size / 2) - 1;
    //     for (let i = lastNonLeafIndex; i >= 0; i--) {
    //         this.heapifyDown(i);
    //     }
    // }

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

export { MaxHeapUI, MaxHeap }; // export MaxHeapUI, and MaxHeap