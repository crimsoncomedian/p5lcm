let input1, input2, calculateButton;
let lcm = null;

function setup() {
  createCanvas(600, 780);
  background(240);
  
  // Create input 1
  input1 = createInput('');
  input1.position(40, 230);
  input1.size(250, 25);
  input1.input(validateInput);
  input1.attribute('placeholder', 'First number');
  styleInput(input1);
  
  // Create input 2
  input2 = createInput('');
  input2.position(310, 230);
  input2.size(250, 25);
  input2.input(validateInput);
  input2.attribute('placeholder', 'Second number');
  styleInput(input2);
  
  // Create a button to calculate LCM
  calculateButton = createButton('Find LCM');
  calculateButton.position(40, 305);
  calculateButton.size(520, 40);
  calculateButton.mousePressed(calculateLCM);
  calculateButton.style('background-color', '#071838');
  calculateButton.style('color', 'white');
  calculateButton.style('border', 'none');
  calculateButton.style('border-radius', '5px');
  calculateButton.style('cursor', 'pointer');
  calculateButton.style('font-size', '16px');
  calculateButton.style('font-weight', 'bold');
}

function draw() {
  background(240); // Clear the background
  fill(50);
  textSize(32);
  text('LCM Explorer', 100, 100);  // Text at the top
  
  fill(0);
  textSize(16);
  text('Enter two numbers to find the LCM', 100, 180);  // Text just above inputs

  if (lcm !== null) {
    fill('#047857');
    textSize(18);
    text(`LCM: ${lcm}`, 100, 400);  // Display the LCM result
  }
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
  const num1 = int(input1.value());
  const num2 = int(input2.value());

  if (num1 > 0 && num2 > 0) {
    lcm = calculateLCMHelper(num1, num2);
  }
}

function calculateLCMHelper(a, b) {
  return (a * b) / gcd(a, b);
}

function gcd(x, y) {
  while (y !== 0) {
    let temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

function styleInput(input) {
  input.style('border', '1px solid #93c5fd');
  input.style('border-radius', '5px');
  input.style('padding', '5px');
}
