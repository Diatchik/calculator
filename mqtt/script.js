const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const signBtn = document.getElementById('sign');
const result = document.getElementById('result');
const display = document.getElementById('display');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent, e.srcElement.id);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);
signBtn.addEventListener('click', sign);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op, elem) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && MemoryPendingOperation !== '=' || MemoryPendingOperation === '&#8730'  ) {
    display.value = MemoryCurrentNumber;
    
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= parseFloat(localOperationMemory); 
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= parseFloat(localOperationMemory);
    } else if (MemoryPendingOperation === 'x^y') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, parseFloat(localOperationMemory));
    } else if (elem === 'square-root') {
      MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
    } else if (elem === 'square-root') {
      MemoryCurrentNumber = Math.sqrt(parseFloat(localOperationMemory));
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    
    display.value = parseFloat(MemoryCurrentNumber.toPrecision(16));
    MemoryPendingOperation = op;
    
  }
}

function decimal() {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}



function sign() {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '-';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('-') === -1) {
      localDecimalMemory += '-';
    }
  }
  display.value = localDecimalMemory;
}



function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}