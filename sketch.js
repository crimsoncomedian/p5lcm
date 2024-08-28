let input1, input2, calculateButton;
let lcm = null;
let multiples1 = [];
let multiples2 = [];
let isCalculating = false;
let resultNum1 = '', resultNum2 = '';

function setup() {
  noCanvas();
  
  input1 = select('#input1');
  input2 = select('#input2');
  calculateButton = select('button');

  input1.input(validateInput);
  input2.input(validateInput);

  calculateButton.mousePressed(calculateLCM);
}

function draw() {
  // No need for continuous rendering
}

function validateInput() {
  this.value(this.value().replace(/\D/g, ''));
  
  let value = int(this.value());
  if (value < 1) {
    this.value('1');
  } else if (value > 100) {
    this.value('100');
  }
}

function calculateLCM() {
  const a = int(input1.value());
  const b = int(input2.value());
  const errorMessage = select('#error-message');
  const resultsArea = select('#results-area');

  if (isNaN(a) || isNaN(b) || a < 1 || b < 1 || a > 100 || b > 100) {
    errorMessage.html("Please enter valid numbers between 1 and 100.");
    resultsArea.style('display', 'none');
    return;
  }

  errorMessage.html("");

  const gcd = (x, y) => {
    while(y) {
      let t = y;
      y = x % y;
      x = t;
    }
    return x;
  };

  lcm = abs(a * b) / gcd(a, b);

  select('#result').html(`
    <div class="result-header">Result:</div>
    <div class="result-content">LCM of ${a} and ${b} is <strong>${lcm}</strong></div>
  `);

  displayMultiples(a, b, lcm);
  resultsArea.style('display', 'block');
}

function displayMultiples(a, b, lcm) {
  let multiples1 = [];
  let multiples2 = [];
  for (let i = 1; i <= lcm; i++) {
    if (i % a === 0) multiples1.push(i);
    if (i % b === 0) multiples2.push(i);
  }

  select('#multiples1').html(`
    <h3>Multiples of ${a}:</h3>
    <div class="multiples-list">${formatMultiples(multiples1)}</div>
  `);
  select('#multiples2').html(`
    <h3>Multiples of ${b
