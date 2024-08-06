document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  let currentInput = '0';
  let previousInput = '';
  let operator = '';
  let isNewInput = true;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    isNewInput = true;
    updateDisplay();
  }

  function appendNumber(number) {
    if (isNewInput) {
      currentInput = number;
      isNewInput = false;
    } else {
      if (currentInput === '0') {
        currentInput = number;
      } else {
        currentInput += number;
      }
    }
    updateDisplay();
  }

  function appendDecimal() {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  }

  function chooseOperator(selectedOperator) {
    if (!isNewInput) {
      calculate();
      previousInput = currentInput;
      currentInput = '0';
    }
    operator = selectedOperator;
    isNewInput = true;
  }

  function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '/':
        computation = prev / curr;
        break;
      default:
        return;
    }

    currentInput = computation.toString();
    operator = '';
    previousInput = '';
    isNewInput = true;
    updateDisplay();
  }

  // Event listeners for buttons
  document.querySelector('#clear').addEventListener('click', clearCalculator);
  document.querySelector('#decimal').addEventListener('click', appendDecimal);

  document.querySelectorAll('[id^=add], [id^=subtract], [id^=multiply], [id^=divide]').forEach(button => {
    button.addEventListener('click', (e) => chooseOperator(e.target.textContent));
  });

  document.querySelector('#equals').addEventListener('click', calculate);

  document.querySelectorAll('[id^=zero], [id^=one], [id^=two], [id^=three], [id^=four], [id^=five], [id^=six], [id^=seven], [id^=eight], [id^=nine]').forEach(button => {
    button.addEventListener('click', (e) => appendNumber(e.target.textContent));
  });

  // Initialize calculator
  clearCalculator();
});
