console.log('stackvisualizer code output test');



/* ---------- Display Popup Information ---------- */
document.addEventListener('DOMContentLoaded', function () {
    const popupBtns = document.querySelectorAll('.method-button');
    const popupContainer = document.querySelector('.popup-panel');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.querySelector('.popup-close');
  
    popupBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const message = this.getAttribute('data-message');
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
    
    const values = [];
    let size = 0;

    const stackContainer = document.getElementById('stack-container');

    function animateStack() {
        const stackBoxes = document.querySelectorAll('.stack-box');
        stackBoxes.forEach((box, index) => {
            box.style.transform = `translateY(${index}px)`;
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
            size++;
            const stackBox = document.createElement('div');
            stackBox.className = 'stack-box dropDown';
            stackBox.textContent = value;
            values.push(value)
            stackContainer.insertBefore(stackBox, stackContainer.firstChild);
            animateStack();
        }
    }

    function stackPop() {
        if (size === 0) {
            alert('Stack is empty!');
        } else {
            size--;
    
            const topStackBox = stackContainer.firstChild;
    
            topStackBox.classList.add('stack-remove');
    
            // Wait for the animation to finish before removing the element
            topStackBox.addEventListener('animationend', function() {
                stackContainer.removeChild(topStackBox);
                values.pop();
            });
        }
    }

    function stackGetSize() {
        alert(`Stack size: ${size}`);
    }

    function stackPeek() {
        if (!(size === 0)) {
            const topStackBox = stackContainer.firstElementChild;
    
            // Wait 500 milliseconds
            topStackBox.classList.add('peek-highlight');
            setTimeout(() => {
                topStackBox.classList.remove('peek-highlight');
                alert(`Top of the stack: ${values[size - 1]}`);
            }, 1650);
        } else {
            alert(`Stack is empty!`);
        }
    }

    function stackClear() {
        if (size > 0) {
            size--;
    
            // Remove the top stack element with shake and fade animation
            const topStackBox = stackContainer.firstChild;
    
            // Add the remove class to apply the animation
            topStackBox.classList.add('stack-remove');
    
            // Wait for the animation to finish before removing the element
            topStackBox.addEventListener('animationend', function() {
                stackContainer.removeChild(topStackBox);
                stackClear(); // Call the function recursively after the animation completes
            });
        } else {
            // All elements are removed
            alert('Stack is now empty!');
        }
    }

    /* ---------- On-Click Events for Stack ---------- */

    document.getElementById('Push-Button').addEventListener('click', stackPush);
    document.getElementById('Pop-Button').addEventListener('click', stackPop);
    document.getElementById('Peek-Button').addEventListener('click', stackPeek);
    document.getElementById('isEmpty-Button').addEventListener('click', stackIsEmpty);
    document.getElementById('size-Button').addEventListener('click', stackGetSize);
    document.getElementById('Clear-Button').addEventListener('click', stackClear);
});