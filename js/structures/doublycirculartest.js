import { Node, CircularDoublyLinkedList } from "./doublycircular.js";

const list = new CircularDoublyLinkedList();
const listTwo = new CircularDoublyLinkedList();

list.append(1);
list.append(3);
list.append(9);

console.log('Is list empty? ' + list.isEmpty()); // false
// console.log('Is list two empty? ' + listTwo.isEmpty()); // true
console.log('Circular Doubly Linked List before removal: ' + list.display());

list.removeNode(9)
list.removeNode(3)

console.log('Circular Doubly Linked List after removal: ' + list.display());
list.removeNode(1)
// console.log('Circular Doubly Linked List after removal: ' + list.display());


// console.log('removed ' + list.removeNode(1));
// console.log('Circular Doubly Linked List ' + list.display());