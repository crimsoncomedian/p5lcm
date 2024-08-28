function setup() {
  createCanvas(600, 780);
  background(240);
  
  input1 = createInput('');
  input1.position(40, 230);
  input1.size(250, 25);
  input1.input(validateInput);
  input1.attribute('placeholder', 'First number');
  styleInput(input1);
  
  input2 = createInput('');
  input2.position(310, 230);
  input2.size(250, 25);
  input2.input(validateInput);
  input2.attribute('placeholder', 'Second number');
  styleInput(input2);
  
  calculateButton = createButton('Find LCM');
  calculateButton.position(40, 305);
  calculateButton.size(520, 40);
  calculateButton.mousePressed(calculateLCM);
}
