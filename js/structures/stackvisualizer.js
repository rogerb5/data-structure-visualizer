console.log('stackvisualizer code output test');

class Stack {
    constructor() {
      this.items = []; // Array to store stack elements
      this.container = document.getElementById('stack-container');
    }
  
    // Method to push an element onto the stack
    push(element) {
      this.items.push(element);
      this.render();
    }
  
    // Method to pop the top element from the stack
    pop() {
      if (this.isEmpty()) {
        return "Underflow"; // If the stack is empty
      }
      return this.items.pop();
      this.render();
    }
  
    // Method to check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }

    render() {
        // Clear the container
        this.container.innerHTML = '';

        // Render stack elements
        this.items.forEach((element, index) => {
            const stackElement = document.createElement('div');
            stackElement.classList.add('stack-element');
            stackElement.textContent = element;
            stackElement.style.transform = `translateY(${index * 50}px)`;
            this.container.appendChild(stackElement);
        });
    }
  }
  
  const animatedStack = new AnimatedStack();

  // Push elements to the stack with a delay for animation
  setTimeout(() => {
    animatedStack.push(10);
  }, 500);
  
  setTimeout(() => {
    animatedStack.push(20);
  }, 1000);
  
  setTimeout(() => {
    animatedStack.push(30);
  }, 1500);
  
  // Pop elements from the stack with a delay for animation
  setTimeout(() => {
    animatedStack.pop();
  }, 2500);
  
  setTimeout(() => {
    animatedStack.pop();
  }, 3000);