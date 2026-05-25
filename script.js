let currentInput = '0';
let historyInput = '';
let isScientific = false;

const currentDisplay = document.getElementById('current');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    historyDisplay.innerText = historyInput;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '0' && op === '-') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    historyInput += currentInput + ' ' + op + ' ';
    currentInput = '0';
    updateDisplay();
}

function appendMath(func) {
    if (func.includes('pow')) {
        historyInput += currentInput + ' ** ';
        currentInput = '0';
    } else if (func.includes('sqrt')) {
        currentInput = 'Math.sqrt(' + currentInput + ')';
    } else {
        currentInput = func;
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    historyInput = '';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    let expression = historyInput + currentInput;
    
    // Safety check for empty inputs
    if (!expression) return;

    try {
        // Evaluate the string safety statement
        let result = eval(expression);
        
        // Handle division by zero or errors
        if (result === Infinity || isNaN(result)) {
            currentInput = "Error";
        } else {
            // Round to 8 decimal places max to prevent long trailing floats
            currentInput = Number(result.toFixed(8)).toString();
        }
        historyInput = '';
    } catch (error) {
        currentInput = "Error";
    }
    updateDisplay();
}
