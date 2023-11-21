console.log('stackvisualizer code output test');

/******* Stack Data strucutre *******/
document.addEventListener('DOMContentLoaded', function () {
    
    const values = [];
    const size = 0;

    const stackContainer = document.getElementById('stack-container');

    function updateStack() {
      while (stackContainer.firstChild) {
        stackContainer.removeChild(stackContainer.firstChild);
      }

      for (let i = size - 1; i >= 0; i--) {
        const stackBox = document.createElement('div');
        stackBox.className = 'stack-box';
        stackBox.textContent = values[i];
        stackContainer.appendChild(stackBox);
      }
    }
    
    function stackIsEmpty() {
        if(size < 0 ) 
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0!");

        else if(size === 0) {
            alert(`The stack is empty.`);
        }
        else
            alert(`The stack is NOT empty.`);
    }

    function stackPush() {
        const value = parseInt(document.getElementById('push-input').value, 10);
        alert(`Pushing ${value} to the Stack`);
        values.push(value);
        size++;
        updateStack();
    }

    function stackPop() {
        if(size < 0 ) 
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0!");

        else if(size === 0) {
            alert('Stack is empty!');
        }
        else {
            values.pop;
            size--;
            updateStack();
        }
    }

    function stackGetSize() {
        if(size < 0 )
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0!");
        
        alert(`Stack size: ${size}`);
    }

    function stackPeek() {
        if(size < 0 )
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0!");

        else if(!(size === 0)) {
            alert(`Top of the stack: ${values[size - 1]}`);
        }
        else {
            alert(`Stack is empty!`);
        }
        
    }

    function stackClear() {
        if(size < 0 )
            throw new Error("InvalidArgumentExcpetion - size cannot be less than 0!");

        while (size > 0) {
            values.stackPop();
        }
        alert(`Stack is now empty!`);
    }

    /******* On-Click Events *******/

    document.getElementById('Push-Button').addEventListener('click', stackPush);
    document.getElementById('Pop-Button').addEventListener('click', stackPop);
    document.getElementById('Peek-Button').addEventListener('click', stackPeek);
    document.getElementById('isEmpty-Button').addEventListener('click', stackIsEmpty);
    document.getElementById('size-Button').addEventListener('click', stackGetSize);
    document.getElementById('Clear-Button').addEventListener('click', stackClear);
});