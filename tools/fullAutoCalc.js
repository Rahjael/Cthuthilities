const FULLAUTOCALC_INPUTS = {
  weapSkill: 0,
  targets: [['Target Name', 0]], // [Name, armor]
  noOfVolleys: 0,
  wastedDist: 0,
  volleySize: 3,
  rangeDifficulty: 0 // 0: normal, 1: hard, 2: extreme, 4: critical, 5: impossible
};


function fullAutoCalc() {
  // Prepare tool container
  const toolName = 'fullAutoCalc';
  let container = document.createElement('div');
  container.id = toolName + '-container';

  // Prepare the input container
  let inputDiv = getInputContainer();
  inputDiv.id = toolName + '-input-container';



  container.append(inputDiv);
  const toolData = {
    toolTitle: 'Firearms Calculator',
    mainContent: container
  }
  return toolData;
}

function getInputContainer() {
  let inputDiv = document.createElement('div');

  inputDiv.append(getInputDiv('Weapon Skill', 'weapSkill', 0, 99, simpleCallback));
  inputDiv.append(getInputDiv('Wasted Distance', 'wastedDist', 0, 99, simpleCallback));
  inputDiv.append(getInputDiv('No of Volleys', 'noOfVolleys', 1, 10, simpleCallback));
  inputDiv.append(getInputDiv('Volley Size', 'volleySize', 3, 10, volleySizeCallback));
  inputDiv.append(getInputDiv('Range Difficulty', 'rangeDIfficulty', 0, 5, simpleCallback));

  return inputDiv;
}


function getInputDiv(labelText, id, min, max, callback) {
  let inputDiv = document.createElement('div');
  inputDiv.classList.add('fullAutoCalc-input-div');
  let input = document.createElement('input');
  let label = document.createElement('label');
  input.id = id;
  input.type = 'text';
  input.max = max;
  input.min = min;
  input.value = min;
  input.classList.add('fullAutoCalc-inputs');

  label.for = input.id;
  label.innerText = labelText + ':';
  label.classList.add('fullAutoCalc-labels');

  input.onchange = callback;

  inputDiv.append(label, input);
  return inputDiv;
}
function simpleCallback(e) {
  let value = Number(e.target.value);
  let max = Number(e.target.max);
  let min = Number(e.target.min);
  if(value < min || isNaN(value)) {
    e.target.value = min;
  }
  if(value > max) {
    e.target.value = max;
  }
  FULLAUTOCALC_INPUTS[e.target.id] = e.target.value;
}
function volleySizeCallback(e) {
  let value = Number(e.target.value);
  let max = Number(Math.floor(document.querySelector('#weapSkill').value / 10));
  let min = Number(e.target.min);
  if(value < min || isNaN(value)) {
    e.target.value = min;
  }
  if(value > max) {
    e.target.value = max;
  }
  FULLAUTOCALC_INPUTS[e.target.id] = e.target.value;
}



















function rollRandom(dieNum) {
  return Math.floor(Math.random() * dieNum) + 1;
}