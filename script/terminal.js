import {Commands} from '/script/commands.js'

const termBox = document.getElementById('term-box');
const inputDiv = document.createElement('div');
const input = document.createElement('input');
const commands = Commands.getInstance();
let userpath = document.createElement('div');

inputDiv.innerHTML = '$ '
input.setAttribute('type', 'text');
inputDiv.append(input);
input.setAttribute('class', 'input');
inputDiv.setAttribute('class', 'input-span');

input.onkeypress = (event) => {
  if(event.keyCode == 13) {
    const code = document.createElement('span');
    code.classList.add('code');
    code.innerHTML = '$ '+input.value + '<br>';
    termBox.append(code);
    inputDiv.remove(input)
    executeCode(input.value);
  }
}

function clear(){
  termBox.innerHTML = '';
}

async function executeCode(code) {
  let newLine = true;
  if(code) {
    const command = code.split(' ')[0];
    const args = code.split(' ').splice(1);
    if(typeof commands[command] === 'function'){
      const response = await commands[command](args);
      if(response) {
        if(response.clear) {
          clear();
          newLine = false;
        }
        setPath(response.path);
        print(response.results);
      }
    } else {
      print(['No such command!']);
    }
  }

  if(newLine) {
    addNewLine();
  }
  addInput();
}

function setPath(dir){
  const clone = userpath.cloneNode(false);
  clone.textContent = '';
  const user = document.createElement('span');
  const path = user.cloneNode(true);

  user.classList.add('user');
  path.classList.add('path');

  user.innerHTML = 'ami@exeami';
  path.innerHTML = dir;

  clone.append(user,':',path);
  userpath = clone;
  termBox.append(userpath);
}
async function init() {
    setPath((await commands.pwd()).results[0]);
    termBox.append(inputDiv);
    input.value = '';
    input.focus();
}

async function print(results){
    const output = document.createElement('span');
    output.setAttribute('class', 'code');
    results.forEach(result => output.innerHTML += (result + '<br>'));
    termBox.append(output);
}
function addNewLine(){
  const pathClone = userpath.cloneNode(true);
  pathClone.innerHTML =  "<br>" + pathClone.innerHTML
  termBox.append(pathClone);
}

function addInput() {
  input.value='';
  inputDiv.append(input);
  termBox.append(inputDiv);
  input.focus()
}

init();
