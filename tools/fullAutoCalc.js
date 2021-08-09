
function fullAutoCalc() {
  // Prepare tool container
  const toolName = 'fullAutoCalc';
  let container = document.createElement('div');
  container.id = toolName + '-container';

  // Prepare the input container
  let inputDiv = getInputDiv();
  inputDiv.id = toolName + '-input-container';

  const INPUT = {
    weapSkill: 0,
    targets: [['Target Name', 0]], // [Name, armor]
    wastedDist: 0,
    volleySize: 3,
    rangeDifficulty: 0 // 0: normal, 1: hard, 2: extreme, 4: critical, 5: impossible
  };







  container.append(inputDiv);
  const toolData = {
    toolTitle: 'Firearms Calculator',
    mainContent: container
  }
  return toolData;
}

function getInputDiv() {
  let inputDiv = document.createElement('div');

  inputDiv.append(getWeapSkillInputDiv());

  return inputDiv;
}


function getWeapSkillInputDiv() {  
  let weapSkillInputDiv = document.createElement('div');
  weapSkillInputDiv.classList.add('fullAutoCalc-input-div');
  let weapSkillInput = document.createElement('input');
  let weapSkillLabel = document.createElement('label');
  weapSkillInput.id = 'weapSkill';
  weapSkillInput.type = 'text';
  weapSkillInput.max = 99;
  weapSkillInput.min = 0;
  weapSkillInput.value = 0;
  weapSkillInput.classList.add('fullAutoCalc-inputs')

  weapSkillLabel.for = weapSkillInput.id;
  weapSkillLabel.innerText = 'Weapon Skill:';
  weapSkillLabel.classList.add('fullAutoCalc-labels');

  weapSkillInput.onchange = (e) => {
    let value = Number(e.target.value);
    let max = Number(e.target.max);
    let min = Number(e.target.min);

    if(value < min || isNaN(value)) {
      e.target.value = min;
    }
    if(value > max) {
      e.target.value = max;
    }
    console.log(value, max, min)
  };





  weapSkillInputDiv.append(weapSkillLabel, weapSkillInput);


  return weapSkillInputDiv;
}

function rollRandom(dieNum) {
  return Math.floor(Math.random() * dieNum) + 1;
}