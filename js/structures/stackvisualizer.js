console.log('stackvisualizer code output test');

const values = [];
    let size = 0;
    let speed = 750; //0.75 seconds

/* ---------- Display Popup Information ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const popupBtns = document.querySelectorAll('.method-button');
    const popupContainer = document.querySelector('.popup-panel');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.querySelector('.close-popup');
  
    popupBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        let message
        if (this.id === "Push-Button") {
            const value = parseInt(document.getElementById('push-input').value);
            if(isNaN(value))
                message = "Don't forget to enter a value.";
            else {   
                message = "Pushing " + value + " to the stack."
            }
        }
        
        else if (this.id === "Pop-Button") {
            if(size === 0) {
                message = "The stack is empty."
            }
            else{
                let value = values[size-1];
                message = "Popping the top element: " + value;
            }
        }
        
        else if (this.id === "Peek-Button") {
            message = "Peek";
            if (!(size === 0)) {
                message = "Top of the stack: " + values[size - 1];
            } else {
                message = "The stack is empty.";
            }
        }
        
        else if (this.id === "isEmpty-Button") {
            if(size === 0) {
                message = "The stack is empty, isEmpty = True."
            }
            else {
                message = "The stack is NOT empty, isEmpty = False.";
            }
        }
        
        else if (this.id === "size-Button") {
            if(size === 0) {
                message = "The stack has nothing in it, Size: 0"
            }
            else {
                message = "The size of the stack is " + size + ", Size: " + size;
            }
        }
        
        else if (this.id === "Clear-Button") {
            if (size === 0) {
                message = "The stack is already empty.";
            } else {
                // Display "Clearing Stack..." message while clearing the stack
                message = "Clearing Stack...";
                popupMessage.textContent = message;
                setTimeout(() => {
                    message = "Cleared, The stack is now empty.";
                    popupMessage.textContent = message;
                }, speed * size);
            }
        }
        
        else {
            alert(`invalid button, how did you get here?`)
        }
        popupMessage.textContent = message;
        popupContainer.style.display = 'block';
      });
    });
  
    closeButton.addEventListener('click', function () {
      popupContainer.style.display = 'none';
    });
  });


/* ---------- Stack Data strucutre ---------- */
function openMoreInfo(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    var selectedTab = document.getElementById(tabName);

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    selectedTab.style.display = "block";
    evt.currentTarget.className += " active";
}



/* ---------- Stack Data strucutre ---------- */
document.addEventListener('DOMContentLoaded', function () {

    const stackContainer = document.getElementById('stack-container');
    
    function stackPush() {
        const value = parseInt(document.getElementById('push-input').value);
        if (isNaN(value)) {
            return;
        } else {
            size++;
            const stackBox = document.createElement('div');
            stackBox.className = 'stack-box';
            stackBox.textContent = value;
            values.push(value);
            stackBox.classList.add('drop-down');
            stackContainer.insertBefore(stackBox, stackContainer.firstChild);
            setTimeout(() => {
                stackBox.classList.remove('drop-down');
            }, speed * 2);
        }
    }

    function stackPop() {
        if (!(size === 0)) {
            size--;
            const topStackBox = stackContainer.firstChild;
            // Add an event listener for the end of the animation
            topStackBox.addEventListener('animationend', function() {
                // Remove the event listener
                topStackBox.removeEventListener('animationend', arguments.callee);
                stackContainer.removeChild(topStackBox);
                values.pop();
            });
            setTimeout(() => {
                topStackBox.classList.add('stack-remove');
            }, speed/8);
        }
    }
    

    function stackPeek() {
        if (!(size === 0)) {
            const topStackBox = stackContainer.firstElementChild;
            topStackBox.classList.add('peek-highlight');
            setTimeout(() => {
                topStackBox.classList.remove('peek-highlight');
            }, speed*2);
        }
    }

    function stackClear(callback) {
        if (size > 0) {
            size--;
            const topStackBox = stackContainer.firstChild;
            topStackBox.classList.add('stack-remove');
            setTimeout(() => {
                values.pop();
                stackContainer.removeChild(topStackBox);
                stackClear(callback);
            }, speed);
        } else {
            callback();
        }
    }

    /* ---------- On-Click Events for Stack ---------- */

    document.getElementById('Push-Button').addEventListener('click', stackPush);
    document.getElementById('Pop-Button').addEventListener('click', stackPop);
    document.getElementById('Peek-Button').addEventListener('click', stackPeek);
    document.getElementById('Clear-Button').addEventListener('click', stackClear);
});