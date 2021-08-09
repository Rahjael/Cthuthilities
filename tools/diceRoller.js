
function diceRoller() {
  // Prepare container
  const toolName = 'diceRoller';
  let container = document.createElement('div');
  container.id = toolName + '-container';

  // Prepare the two inner divs
  let diceButtonsDiv = document.createElement('div');
  diceButtonsDiv.id = toolName + '-buttons-container';
  let logDiv = document.createElement('div');
  logDiv.id = toolName + '-log-container';

  // Populate the two inner divs
  diceButtonsDiv.append(...(getDiceButtons()));
  let currentRollDiv = document.createElement('div');
  currentRollDiv.id = toolName + '-current-roll-div';
  logDiv.appendChild(currentRollDiv);

  // Append two inner divs to container and
  // prepare to return it
  container.append(diceButtonsDiv, logDiv);
  const toolData = {
    toolTitle: 'Dice Roller',
    mainContent: container
  }
  return toolData;
}

function getDiceButtons() {
  const diceButtons = [
    '100', 
    '20',
    '12',
    '10',
    '8',
    '6',
    '4',
    '2'
  ].map(die => {
    let button = document.createElement('button');
    button.classList.add('diceRoller-buttons');
    button.innerText = 'D' + die;
    button.onclick = () => {
      let rolled = rollRandom(die);
      let logThis = document.createElement('p');
      logThis.innerText = document.querySelector('#diceRoller-current-roll-div').innerText;
      let logContainer = document.querySelector('#diceRoller-log-container');
      logContainer.insertBefore(logThis, logContainer.firstChild.nextSibling);
      document.querySelector('#diceRoller-current-roll-div').innerText = rolled;
    }
    return button;
  });
  
  let clearButton = document.createElement('button');
  clearButton.classList.add('diceRoller-buttons');
  clearButton.innerText = 'Clear Log';
  clearButton.onclick = () => {
    let logContainer = document.querySelectorAll('p');
    logContainer.forEach(p => p.remove());
  }
  diceButtons.push(clearButton);
  return diceButtons;
}


function rollRandom(dieNum) {
  return Math.floor(Math.random() * dieNum) + 1;
}