(function() {
  const tools = {
      "Dice Roller": 'diceRoller',
      "Firearms Calculator": 'firearmsCalc',
      "Tome Learning": 'tomeLearning',
      "Chase Mechanics": 'chaseMechanics'
      };
  const TOOLS_PATH = './tools/';

  let mainDiv = document.querySelector('main');
  
  Object.entries(tools).forEach(([name, folder]) => {
    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'tool-button';
    button.innerText = name;    
    button.addEventListener('click', () => {
      console.log("Clicked ", name, TOOLS_PATH + folder);
    });
    mainDiv.appendChild(button);
  });
})();