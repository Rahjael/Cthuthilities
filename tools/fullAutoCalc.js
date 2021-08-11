const FULLAUTOCALC_INPUTS = {
  weapSkill: 0,
  targets: [],
  noOfVolleys: 1,
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

  
  inputDiv.append(getResultsDiv());


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
  inputDiv.append(getInputDiv('Range Difficulty', 'rangeDifficulty', 0, 5, simpleCallback));

  inputDiv.append(getTargetsTable());
  
  let calcButton = document.createElement('button');
  calcButton.id = 'fullAutoCalc-calculate-button';
  calcButton.classList.add('default-font');
  calcButton.type = 'button';
  calcButton.innerText = 'Calculate';
  calcButton.onclick = calculate;
  inputDiv.append(calcButton);  


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
  input.value = FULLAUTOCALC_INPUTS[id];
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



function getTargetsTable() {
  let toolPrefix = 'fullAutoCalc-'
  let mainContainer = document.createElement('div');
  mainContainer.id = toolPrefix + 'targets-table';

  let labelsRow = document.createElement('div');
  labelsRow.id = toolPrefix + 'labels-row';

  let labels = ['Delete', 'Target', 'Volleys', 'Armor', 'Bonus/Pen'].map(label => {
    let newLabel = document.createElement('div');
    newLabel.classList.add(toolPrefix + 'labels');
    newLabel.innerText = label;
    // newLabel.style.margin = '0.5em';
    return newLabel;
  });
  labelsRow.append(...labels);

  let inputFieldsContainer = document.createElement('div');
  inputFieldsContainer.id = toolPrefix + 'target-input-fields-container';

  let addInputRow = () => {
    let className = toolPrefix + 'target-input-row';
    let numId = FULLAUTOCALC_INPUTS.targets.length;

    let targetContainer = document.createElement('div');
    targetContainer.id = className + '-' + numId;
    targetContainer.classList.add(className);

    let delButton = document.createElement('button');
    delButton.type = 'button';
    delButton.onclick = () => {
      targetContainer.remove();
      // Reset all progressive ids
      let rows = document.querySelectorAll('.' + className);
      // in the DOM
      rows.forEach((el, i) => {
        el.id = className + '-' + i;
      });
      // and in the js var
      FULLAUTOCALC_INPUTS.targets = Array.from(rows).map((row, i) => {
        return {
          id: i,
          name: row.children[1].value,
          volleys: Number(row.children[2].value),
          armor: Number(row.children[3].value),
          bonPen: Number(row.children[4].value)
        };
      });
    };
    delButton.innerText = 'X';
    delButton.id = toolPrefix + 'target-delete-button';

    let inputFields = ['name', 'volleys', 'armor', 'bonPen'].map(id => {
      let field = document.createElement('input');
      field.id = id;
      field.type = 'text';
      field.classList.add(toolPrefix + 'inputs');
      field.onchange = (e) => {
        let changed = FULLAUTOCALC_INPUTS.targets.filter(obj => {
          let isMatch = Number(obj.id) == Number(e.target.parentNode.id.charAt(e.target.parentNode.id.length - 1));
          return isMatch;
        })[0]; // XXX Careful here: [0]
        changed[e.target.id] = e.target.value;

        console.log(changed)
      };
      return field;
    });

    let newObj = {
      id: numId,
      name: '',
      volleys: 1,
      armor: 0,
      bonPen: 0
    };

    // Set default values for new row
    inputFields.forEach((field, i) => {
      if(field.id === 'name') field.value = 'Target ' + (FULLAUTOCALC_INPUTS.targets.length + 1);
      else field.value = newObj[field.id];
    });

    FULLAUTOCALC_INPUTS.targets.push(newObj);

    targetContainer.append(delButton, ...inputFields)
    document.querySelector('#' + toolPrefix + 'target-input-fields-container').appendChild(targetContainer);
  }

  let addTargetButton = document.createElement('button');
  addTargetButton.type = 'button';
  addTargetButton.onclick = addInputRow;
  addTargetButton.innerText = 'Add Target';
  addTargetButton.classList.add('default-font');
  addTargetButton.id = toolPrefix + 'add-target-button';


  mainContainer.append(labelsRow, inputFieldsContainer, addTargetButton);

  return mainContainer;
}


function getResultsDiv() {
  let div = document.createElement('div');
  div.id = 'fullAutoCalc-results-div';
  return div;
}



function* getRollModifier() {
  // Returns [penaltyDice, difficultyIncrease];
  console.log("Generator 1st iteration");
  yield [0, 0];
  console.log("Generator 2nd iteration");
  yield [-1, 0];
  console.log("Generator 3rd iteration");
  yield [-2, 0];
  console.log("Generator 4th iteration");
  yield [-2, 1];
  console.log("Generator 5th iteration");
  yield [-2, 2];
  console.log("Generator 6th iteration");
  yield [-2, 3];
  console.log("Generator 7th iteration");
  yield [-2, 4];
}

function calculate() {
  // FULLAUTOCALC_INPUTS {
  //   weapSkill: 0,
  //   targets: [],
  //   noOfVolleys: 0,
  //   wastedDist: 0,
  //   volleySize: 3,
  //   rangeDifficulty: 0 // 0: normal, 1: hard, 2: extreme, 4: critical, 5: impossible
  // }

  console.log("entered calculate");

  let modGenerator = getRollModifier();
  let targets = FULLAUTOCALC_INPUTS.targets;
  let weapSkill = Number(FULLAUTOCALC_INPUTS.weapSkill);
  let rangeDifficulty = Number(FULLAUTOCALC_INPUTS.rangeDifficulty);
  let successThresh = [weapSkill, Math.floor(weapSkill / 2), Math.floor(weapSkill / 5), 1];
  let volleySize = Number(FULLAUTOCALC_INPUTS.volleySize);

  let logContainer = document.querySelector('#fullAutoCalc-results-div');


  let addLog = (text, color = 'black') => {
    let newP = document.createElement('p');
    newP.classList.add('fullAutoCalc-log-p');
    newP.style.color = color;
    newP.innerText = text;
    logContainer.append(newP);
  }

  let rollWithMods = (bonPen) => {
    let rolls = [rollRandom(100)];

    if(bonPen === 0) {
      addLog("Rolled: " + String(rolls));
      return rolls[0];
    }
    if(bonPen > 0) {
      rolls.push(...[...Array(bonPen).keys()].map(val => rollRandom(100)));
      addLog("Rolled: " + String(rolls));
      return Math.min(...rolls);
    }
    else if(bonPen < 0) {      
      rolls.push(...[...Array(bonPen * -1).keys()].map(val => rollRandom(100)));
      addLog("Rolled: " + String(rolls));
      return Math.max(...rolls);
    }
  }

  let modifiers;
  for(let i = 0; i < targets.length; i++) {
    console.log("Iterating targets");
    for(let j = 0; j < Number(targets[i].volleys); j++) {
      console.log("Iterating target's volleys")
      modifiers = modGenerator.next().value;
      let successLevel = rangeDifficulty + modifiers[1];
      let startingBonPen = Number(FULLAUTOCALC_INPUTS.targets[i].bonPen);
      let roll = rollWithMods(startingBonPen + modifiers[0]);

      console.log("Roll:", roll);

      addLog("Shooting at target: " + targets[i].name + ' (' + successThresh[successLevel] + ' required)', 'black');

      if(roll >= 96) {
        if( weapSkill < 50 || (weapSkill >= 50 && roll == 100)) {
          let msg = `--- FUMBLE!`;
          addLog(msg, 'red');
          continue;
        }
      }
      if(successLevel > 3) {
        addLog("----- This shot is of impossible difficulty. Target can't be hit.", 'red');
        continue;
      }
      if(roll == 1 && successLevel < 3) {
        let msg = `--- CRITICAL HIT! Roll normal damage for ${Math.floor(volleySize / 2)} bullets and IMPALE damage for ${Math.floor(volleySize / 2)} bullets. Add additional effects for critical hit.`;
        addLog(msg, 'green');
        continue;
      }
      if(roll == 1 && successLevel == 3) {
        let msg = `--- CRITICAL HIT! But base difficulty is too high. Roll normal damage for ${volleySize} bullets.`;
        addLog(msg, 'yellow');
        continue;
      }
      if(roll <= successThresh[2] && successLevel > 1) {
        let msg = `--- target has been hit. Roll damage for ${volleySize} bullets.`;
        addLog(msg, 'yellow');
        continue;
      }
      if(roll <= successThresh[2] && successLevel <= 1) {
        let msg = `--- target has been hit for extreme success. Roll normal damage for ${Math.floor(volleySize / 2)} bullets and IMPALE damage for ${Math.floor(volleySize / 2)} bullets.`;
        addLog(msg, 'green');
        continue;
      }
      if(roll <= successThresh[successLevel] && successLevel <= 1) {
        let msg = `--- target has been hit. Roll normal damage for ${Math.floor(volleySize / 2)} bullets.`;
        addLog(msg, 'yellow');
        continue;
      }

      let msg = `--- target missed.`;
      addLog(msg, 'grey');
    }
  }
  
  console.log("exit calculate");
  
}


function rollRandom(dieNum) {
  return Math.floor(Math.random() * dieNum) + 1;
}