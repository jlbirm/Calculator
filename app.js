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

function backspace(currentDisplay){
    str = currentDisplay.innerText.slice(0, -1);
    if(str === ''){
        str = '0';
    }
    currentDisplay.innerText = str;
}

function solveNums(currentDisplay){
    const operators = ['−','+','×','÷'];
    for(let o of operators){
        if(currentDisplay.innerText.includes(o)){
            let opIndex = currentDisplay.innerText.indexOf(o);
            let x = Number(currentDisplay.innerText.slice(0, opIndex));
            let y = Number(currentDisplay.innerText.slice(opIndex+1));

            var num = 0;
            switch (o){
                case '−':
                    num = x - y;
                    break;
                case '+':
                    num = x + y;
                    break;
                case '×':
                    num = x * y;
                    break;
                case '÷':
                    num = x / y;
                    break;
            };

        } else {
            let num = Number(currentDisplay.innerText);
        }
    }
    return(num);
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
        let currentDisplay = document.getElementById('display');
        // If last button pressed was an operand, replace with new operand
        if(['.','−','+','×','÷'].includes(currentDisplay.innerText.slice(-1))){
            backspace(currentDisplay);
        }
        updateDisplay(op.innerText);
    })
}

// Click event for CLEAR button
const clear = document.getElementById('clear');
clear.addEventListener('click', function(){
    let currentDisplay = document.getElementById('display');
    currentDisplay.innerText = '0';
})

// Click event for backspace button
const backspaceBtn = document.getElementById('backspace');
backspaceBtn.addEventListener('click', function(){
    let currentDisplay = document.getElementById('display');
    backspace(currentDisplay);
})

// Click event for percentage button
const percentBtn = document.getElementById('percentage');
percentBtn.addEventListener('click', function(){
    let currentDisplay = document.getElementById('display');
    num = solveNums(currentDisplay);
    currentDisplay.innerText = num/100;
})

