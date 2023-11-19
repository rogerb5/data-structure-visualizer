console.log('stackvisualizer code output test');


/******* On-Click Events *******/




/******* Stack Data strucutre *******/
class Stack {
    constructor() {
        this.values = [];
        this.size = 0;
    }

    isEmpty() {
        if(this.size < 0 ) 
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0");

        else if(this.size == 0)
            return true;
        else
            return false;
    }

    push(num) {
        this.values.push(num);
        this.size++;
    }

    pop() {
        if(this.size < 0 ) 
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0");

        else if(this.size = 0) {
            return null
        }
        else {

            this.size--;
            return this.values.pop();
        }
    }

    getSize() {
        if(this.size < 0 )
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0");

        return this.size;
    }

    peek() {
        if(this.size < 0 )
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0");

        else if(this.isEmpty()) {
            return null;
        }
        return this.values[this.size - 1];
    }

    clear() {
        if(this.size < 0 )
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0");

        while (this.size > 0) {
            this.pop();
        }
    }
}