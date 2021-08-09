
// Tools config
const TOOLS = {
    "Quick Dice Roller": 'diceRoller',
    "Full Auto Calculator": 'fullAutoCalc',
    "Tome Learning": 'tomeLearning',
    "Chase Mechanics": 'chaseMechanics'
    };
const TOOLS_PATH = './tools/';
const SESSION = {};


// Functions
function loadToolsFiles() {  
  Object.entries(TOOLS).forEach(([displayName, fileName]) => {
    let script = document.createElement('script');
    script.src = TOOLS_PATH + fileName + '.js';
    document.querySelector('head').appendChild(script);
  });
}

function loadUtilsButtons() {
  Object.entries(TOOLS).forEach(([displayName, folder]) => {
    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'tool-button';
    button.innerText = displayName;

    button.addEventListener('click', () => {
      changeTitle(displayName);
      clearMainSection();

      // window[TOOLS[displayName]]() is a way to call a function from its name as a string
      document.querySelector('main').appendChild(window[TOOLS[displayName]]().mainContent);
    });
    document.querySelector('main').appendChild(button);
  });
}

function loadAtStartup() {
  loadUtilsButtons();
  loadToolsFiles();
}

function clearMainSection() {
  const parent = document.querySelector('main');
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function changeTitle(toolName) {
  document.querySelector('h1').innerText = toolName;
}

function loadTool(toolData) {
  changeTitle(toolData.displayName);
  clearMainSection();
  document.querySelector('main').appendChild(toolData.mainContent);
}

function reloadHomePage() {  
  document.querySelector('h1').innerText = 'Cthuthilities';
  clearMainSection();
  loadUtilsButtons();
}

function showCredits() {
  let disclaimer = document.createElement('div');
  disclaimer.id = 'disclaimer';
  disclaimer.style.textAlign = 'justify';
  disclaimer.innerText = `All images and fonts were free for personal use at the moment of download. If you recognise anything as yours and you wish it removed from this website, please contact me via Github, link at Project Page`;

  const toolData = {
    displayName: 'Credits',
    mainContent: disclaimer
  }
  loadTool(toolData);
}





// Stuff executed at first load
loadAtStartup();

// document.querySelector('h1').addEventListener('click', () => {
//   reloadHomePage();
// });