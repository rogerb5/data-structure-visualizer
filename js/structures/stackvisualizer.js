console.log('stackvisualizer code output test');



function openMoreInfo(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

/******* Stack Data strucutre *******/
document.addEventListener('DOMContentLoaded', function () {
    
    const values = [];
    let size = 0;

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
      animateStack();
    }

    function animateStack() {
        const stackBoxes = document.querySelectorAll('.stack-box');
        stackBoxes.forEach((box, index) => {
            box.style.transform = `translateY(${index}px)`; // Adjust the value as needed
        });
    }
    
    function stackIsEmpty() {
        if(size === 0) {
            alert(`The stack is empty.`);
        }
        else
            alert(`The stack is NOT empty.`);
    }

    function stackPush() {
        const value = parseInt(document.getElementById('push-input').value);
        if(isNaN(value))
            alert(`Please enter a value`);
        else {
            values.push(value);
            size++;
            updateStack();
        }
    }

    function stackPop() {
        if(size === 0) {
            alert('Stack is empty!');
        }
        else {
            values.pop();
            size--;
            updateStack();
        }
    }

    function stackGetSize() {
        alert(`Stack size: ${size}`);
    }

    function stackPeek() {
        if(!(size === 0)) {
            alert(`Top of the stack: ${values[size - 1]}`);
        }
        else {
            alert(`Stack is empty!`);
        }
        
    }

    function stackClear() {
        while (size > 0) {
            values.pop();
            size--;
        }
        alert(`Stack is now empty!`);
        updateStack();
    }

    /******* On-Click Events *******/

    document.getElementById('Push-Button').addEventListener('click', stackPush);
    document.getElementById('Pop-Button').addEventListener('click', stackPop);
    document.getElementById('Peek-Button').addEventListener('click', stackPeek);
    document.getElementById('isEmpty-Button').addEventListener('click', stackIsEmpty);
    document.getElementById('size-Button').addEventListener('click', stackGetSize);
    document.getElementById('Clear-Button').addEventListener('click', stackClear);
});