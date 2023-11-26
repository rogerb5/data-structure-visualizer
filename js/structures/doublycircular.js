//console.log('doubly circular linked list code output test');

 class Node{
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class CircularDoublyLinkedList extends Node{
    constructor(){
        super();//call the constructor of the parent class
        this.head = null;
        this.tail = null;
    }

    isEmpty(){
        return this.head === null;
    }

    //add node at the end of the list
    append(data){
        const newNode = new Node(data);

        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        
        //make it circular
        this.tail.next = this.head;
        this.head.prev = this.tail;
    }

    //add node at the beginning of the list
    prepend(data){
        const newNode = new Node(data);

        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        //make it circular
        this.tail.next = this.head;
        this.head.prev = this.tail;
    }

    display(){
        if(this.isEmpty()){
            return('Empty List');
        }
        let result = "";
        let current = this.head;
        do{
            result += current.data + " <-> ";
            current = current.next;
        }while(current != this.head);
        return result.substring(0, result.length - 4);
    }

    appendFromUserInput(){
        const data = prompt('Enter the data to append');
        this.append(data);
    }

    removeNode(value){
        if(this.head === null){
            throw new Error('List is empty');
            return;
        }

        let current = this.head;

        while(current && current.data != value){
            current = current.next;
            
            //break loop if whole list has been traversed
            if(current === this.head){
                console.log('Node not found');
                return;
            }
        }

        //if node to be deleted is the only node in the list
        if(current === this.head){
            this.head = current.next;
            console.log("The list is now empty")
        }

        current.prev.next = current.next;
        current.next.prev = current.prev;

        //update tail if necessary
        if(current === this.tail){
            this.tail = current.prev;
        }
    }

    //add at specified position
    insertAtPosition(position, data){
        const newNode = new Node(data);

        if(!this.head){
            this.head = newNode;
            this.head.next = this.head;
            this.head.prev = this.head;
        }
        else{
            let current = this.head;
            let count = 1;

            while(count < position-1 && current.next != this.head){
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

    //Searcg for an element
    search(value){
        if(!this.head){
            throw new Error('List is empty');
            return;
        }

        let current = this.head;

        while(current && current.data != value){
            current = current.next;
            
            //break loop if whole list has been traversed
            if(current === this.head){
                console.log('Node not found');
                return;
            }
        }

        console.log('Node found');
    }

    //get the size of the list
    size(){
        if(!this.head){
            return 0;
        }

        let count = 0;
        let current = this.head;

        while(current && current.next != this.head){
            current = current.next;
            count++;
        }

        return count+1;
    }

    //reverse the list
    reverse(){
        if(!this.head){
            throw new Error('List is empty');
            return;
        }

        let current = this.head;
        let previous = null;
        let next = null;

        while(current && current.next != this.head){
            next = current.next;
            current.next = previous;
            current.prev = next;
            previous = current;
            current = next;
        }

        this.head = previous;
    }

    //clear the list
    clear(){
        this.head = null;
        this.tail = null;
    }
}


export { Node, CircularDoublyLinkedList}; 

