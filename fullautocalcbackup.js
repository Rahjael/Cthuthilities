const FULLAUTOCALC_INPUTS = {
  weapSkill: 0,
  targets: [],
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
  inputDiv.append(getInputDiv('Range Difficulty', 'rangeDifficulty', 0, 5, simpleCallback));


  inputDiv.append(getTargetsTable());

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
    newLabel.style.margin = '0.5em';
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
      // console.log(document.querySelector('#' + targetContainer.id));
      // document.querySelector('#' + targetContainer.id).remove();
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
          volleys: row.children[2].value,
          armor: row.children[3].value,
          bonPen: row.children[4].value
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
        console.log(FULLAUTOCALC_INPUTS.targets);
      };
      return field;
    })

    let newObj = {
      id: numId,
      name: '',
      volleys: '',
      armor: '',
      bonPen: ''
    };

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

















function rollRandom(dieNum) {
  return Math.floor(Math.random() * dieNum) + 1;
}