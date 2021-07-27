// Update calculator display
// Used for all numerical buttons along with . + - * /
function updateDisplay(num){
    let currentDisplay = document.getElementById('display');
    if(currentDisplay.innerText === '0'){
        if(['.','−','+','×','÷'].includes(num)){
            currentDisplay.innerText = '0' + num;
        } else {
        currentDisplay.innerText = num;
        }     
    } else {
        currentDisplay.innerText = currentDisplay.innerText + num;
    }
}

// Click event for numerical & . buttons
const numBtns = document.getElementsByClassName('numButton');
for(let num of numBtns){
    num.addEventListener('click', function(){
        updateDisplay(num.innerText);
        
    })
}

// Click event for main operand buttons
const opBtns = document.getElementsByClassName('opButton');
for(let op of opBtns){
    op.addEventListener('click', function(){
        updateDisplay(op.innerText);
    })
}

// Click event for CLEAR button
const clear = document.getElementById('clear');
clear.addEventListener('click', function(){
    let currentDisplay = document.getElementById('display');
    currentDisplay.innerText = '0';
})

