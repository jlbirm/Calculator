let fullDisplayArr = [];
let lastKey = '';

// Update current display
// Used for all numerical buttons and decimal point
// Current display shows current number being entered
function updateDisplay(num){
    let currentDisplay = document.getElementById('currentDisplay');
    if(currentDisplay.innerText === '0'){
        if(num === '.'){
            currentDisplay.innerText = '0' + num;
        } else {
        currentDisplay.innerText = num;
        }     
    } else {
        currentDisplay.innerText = currentDisplay.innerText + num;
    }
}

// Update full display
// Used for all operators and equals buttons
// Moves current display to full display with operator
// Creates an array for later calculation
function updateFullDisplay(operator){
    let currentDisplay = document.getElementById('currentDisplay');

    fullDisplayArr.push(operator);
    refreshFullDisplay();
}

function refreshFullDisplay(){
    let fullDisplay = document.getElementById('fullDisplay');
    fullDisplay.innerText = '';
        for(let i of fullDisplayArr){
            fullDisplay.innerText = fullDisplay.innerText + i;
        }
}

function backspace(currentDisplay){
    str = currentDisplay.innerText.slice(0, -1);
    if(str === ''){
        str = '0';
    }
    currentDisplay.innerText = str;
}

function solveNums(){
    const operators = {
        '−': function(a, b) {return a - b},
        '+': function(a, b) {return a + b},
        '×': function(a, b) {return a * b},
        '÷': function(a, b) {return a / b}
    };
    
    let a = Number(fullDisplayArr[0]);
    let b = Number(fullDisplayArr[2]);
    let op = fullDisplayArr[1];

    if(op){
        num = operators[op](a, b);
    } else{
        num = a;
    }

    return(num);
}

function setLastKeypress(key){
    lastKey = key.innerText;
}

// Click event for numerical & . buttons
const numBtns = document.getElementsByClassName('numButton');
for(let num of numBtns){
    num.addEventListener('click', function(){
        updateDisplay(num.innerText);
        setLastKeypress(num);
    })
}

// Click event for main operand buttons
const opBtns = document.getElementsByClassName('opButton');
for(let op of opBtns){
    op.addEventListener('click', function(){
        let currentDisplay = document.getElementById('currentDisplay');
        const operators = ['−','+','×','÷'];

        // If last button pressed was an operand, replace with new operand
        if(operators.includes(lastKey)){

            // *************************
            console.log('This replaces the operand');
            // *************************

            fullDisplayArr[1] = op.innerText;

            console.log(fullDisplayArr);

            refreshFullDisplay();
        } 
        // If there is already a full equation, solve equation and use that solution for this operator
        else if(fullDisplayArr.length == 2){
            
            //*******************
            console.log('This is for an array of 3');
            //*******************

            fullDisplayArr.push(currentDisplay.innerText);

            console.log(fullDisplayArr);

            num = solveNums();
            fullDisplayArr = [];
            fullDisplayArr.push(num);
            updateFullDisplay(op.innerText);
        } 
        else {

            // *************************
            console.log('This is the else');
            // *************************

            fullDisplayArr.push(currentDisplay.innerText);
            updateFullDisplay(op.innerText);
        }
        currentDisplay.innerText = '0';

        setLastKeypress(op);
    })
}

// Click event for CLEAR button
const clear = document.getElementById('clear');
clear.addEventListener('click', function(){
    let currentDisplay = document.getElementById('currentDisplay');
    let fullDisplay = document.getElementById('fullDisplay');
    currentDisplay.innerText = '0';
    fullDisplay.innerText = '';
    fullDisplayArr = [];

})

// Click event for backspace button
const backspaceBtn = document.getElementById('backspace');
backspaceBtn.addEventListener('click', function(){
    let currentDisplay = document.getElementById('currentDisplay');
    backspace(currentDisplay);
})

// Click event for percentage button
const percentBtn = document.getElementById('percentage');
percentBtn.addEventListener('click', function(){
    let currentDisplay = document.getElementById('currentDisplay');
    num = solveNums(currentDisplay);
    currentDisplay.innerText = num/100;
})

//Click event for negative/positive button
const negBtn = document.getElementById('negative');
negBtn.addEventListener('click', function(){
    let currentDisplay = document.getElementById('currentDisplay');
    let num = Number(currentDisplay.innerText * -1);
    currentDisplay.innerText = num;
})

// Click event for equals button
const equalsBtn = document.getElementById('equals');
equalsBtn.addEventListener('click', function(){
    // Solve equation, show solution, and equation
    fullDisplayArr.push(currentDisplay.innerText);

    console.log(fullDisplayArr);

    num = solveNums();
    currentDisplay.innerText = num;
    updateFullDisplay('=');

    // Clear array for next equation
    fullDisplayArr = [];
    setLastKeypress('=');
})