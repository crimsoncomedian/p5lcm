let input1, input2, calculateButton;
let lcm = null;
let multiples1 = [];
let multiples2 = [];
let isCalculating = false;
let resultNum1 = '', resultNum2 = '';
let containerHeight;
let canvasHeight;

function setup() {
  canvasHeight = 780;  // Initial canvas height
  createCanvas(600, canvasHeight);
  
  input1 = createInput('');
  input1.position(40, 230);
  input1.size(250, 25);
  input1.input(validateInput);
  input1.elt.addEventListener('keypress', handleKeyPress);
  input1.attribute('placeholder', 'First number');
  styleInput(input1);
  
  input2 = createInput('');
  input2.position(310, 230);
  input2.size(250, 25);
  input2.input(validateInput);
  input2.elt.addEventListener('keypress', handleKeyPress);
  input2.attribute('placeholder', 'Second number');
  styleInput(input2);
  
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

function styleInput(input) {
  input.style('border', '1px solid #93c5fd');
  input.style('border-radius', '5px');
  input.style('padding', '15px 0 15px 10px');
  input.style('box-sizing', 'border-box');
}

function draw() {
  background(240);
  
  containerHeight = lcm === null ? 365 : calculateContainerHeight();
  canvasHeight = containerHeight + 150;  // Add some padding at the bottom
  resizeCanvas(600, canvasHeight);
  
  fill(255);
  stroke(220);
  rect(20, 20, width - 40, containerHeight, 8);
  
  fill('#e0f2fe');
  noStroke();
  rect(20, 20, width - 40, 100, 8, 8, 0, 0);
  
  fill('#075985');
  textSize(28);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text('LCM Explorer', 40, 60);
  
  textSize(16);
  textStyle(NORMAL);
  text('Discover the Lowest Common Multiple!', 40, 95);
  
  fill('#eff6ff');
  stroke(191, 219, 254);
  rect(40, 140, width - 80, 70, 5);
  
  noStroke();
  fill('#1e40af');
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('What is the Lowest Common Multiple (LCM)?', 50, 150);
  
  fill('#2563eb');
  textSize(14);
  textStyle(NORMAL);
  text('The LCM of two or more numbers is the smallest positive', 50, 170);
  text('number that is divisible by all of them.', 50, 190);
  
  fill(128);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Enter numbers between 1 and 100', width/2, 275);  // Updated text
  
  if (lcm !== null) {
    fill('#ecfdf5');
    stroke(134, 239, 172);
    rect(40, 365, width - 80, 70, 5);
    
    noStroke();
    fill('#047857');
    textSize(18);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Result:', 60, 390);
    
    textStyle(NORMAL);
    textSize(16);
    fill('#059669');
    text(`LCM of ${resultNum1} and ${resultNum2} is `, 60, 410);
    textStyle(BOLD);
    text(lcm, 55 + textWidth(`LCM of ${resultNum1} and ${resultNum2} is `), 410);
    textStyle(NORMAL);
    
    let yOffset = 475;
    
    fill('#7c3aed');
    textSize(16);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(`Multiples of ${resultNum1}:`, 40, yOffset);
    textStyle(NORMAL);
    
    let height1 = displayMultiples(multiples1, 60, yOffset + 40, width - 120, true);
    
    fill(250, 240, 255);
    noStroke();
    rect(40, yOffset + 20, width - 80, height1 + 20, 5);
    
    displayMultiples(multiples1, 60, yOffset + 40, width - 120, false);
    
    yOffset += height1 + 60;
    
    fill('#db2777');
    textSize(16);
    textStyle(BOLD);
    text(`Multiples of ${resultNum2}:`, 40, yOffset);
    textStyle(NORMAL);
    
    let height2 = displayMultiples(multiples2, 60, yOffset + 40, width - 120, true);
    
    fill(255, 240, 250);
    noStroke();
    rect(40, yOffset + 20, width - 80, height2 + 20, 5);
    
    displayMultiples(multiples2, 60, yOffset + 40, width - 120, false);
  }
  
  textSize(14);
  fill(100);
  textAlign(CENTER, CENTER);
  text('LCM is used in real life for things like finding when two events', width/2, containerHeight + 50);
  text('will occur together again, or calculating the smallest box size', width/2, containerHeight + 70);
  text('that can fit different item quantities perfectly!', width/2, containerHeight + 90);
}

function calculateContainerHeight() {
  let baseHeight = 365;
  let yOffset = 475;
  
  let height1 = displayMultiples(multiples1, 60, yOffset + 40, width - 120, true);
  yOffset += height1 + 60;
  
  let height2 = displayMultiples(multiples2, 60, yOffset + 40, width - 120, true);
  yOffset += height2 + 60;
  
  return max(baseHeight, yOffset);
}

function displayMultiples(multiples, x, y, w, calculateOnly) {
  let displayText = '';
  let originalY = y;
  textAlign(LEFT, CENTER);
  
  for (let i = 0; i < multiples.length; i++) {
    let multiple = multiples[i];
    let isLast = i === multiples.length - 1;
    let nextPart = isLast ? multiple.toString() : multiple + ', ';
    
    if (textWidth(displayText + nextPart) > w) {
      if (!calculateOnly) {
        fill(0);  // Set text color to black for non-last numbers
        textStyle(NORMAL);
        text(displayText, x, y);
      }
      y += 20;
      displayText = '';
    }
    
    if (!calculateOnly && isLast) {
      fill(22, 163, 74);  // Set text color to green for the last number
      textStyle(BOLD);  // Set text style to bold for the last number
      text(nextPart, x + textWidth(displayText), y);
    } else {
      displayText += nextPart;
    }
  }
  
  if (displayText !== '' && !calculateOnly) {
    fill(0);  // Set text color to black for remaining non-last numbers
    textStyle(NORMAL);
    text(displayText, x, y);
  }
  
  return y - originalY + 20;
}

function validateInput() {
  this.value(this.value().replace(/\D/g, ''));
  
  let value = int(this.value());
  if (value < 1) {
    this.value('1');
  } else if (value > 100) {  // Changed from 1000 to 100
    this.value('100');
  }
}

function handleKeyPress(event) {
  if (!/[\d\b]/.test(event.key) && !event.ctrlKey && !event.metaKey) {
    event.prevent
