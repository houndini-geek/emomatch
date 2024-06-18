import emojisModule from './game.js'


const firstEmo = 
document.querySelector('.firstEmo');

const container =
document.querySelector('.container');

const feedback = 
document.querySelector('.feedback p');

const playState = 
document.querySelector('.gameState .play');

const winState = 
document.querySelector('.gameState .win');



let play = 
localStorage.getItem('play-state',0);

let win = 
localStorage.getItem('win-state',0);


function saveGameStates() {
  
 
  localStorage.setItem('play-state',Number(play))
  
  localStorage.setItem('win-state', Number(win))
  
}

function displayGameStates(){
  
  const play = 
  localStorage.getItem('play-state') || 0
  
  const win = 
  localStorage.getItem('win-state') || 0
  
  playState.textContent = `play: ${play}`
  
  winState.textContent = `win: ${win}`
  
} 
displayGameStates()

const createCards = () => {
  
  for (let i = 0; i < 4; i++) {
  
  const randomIndex =
  Math.floor( Math.random() * emojisModule.length);
  
  
  const randomOrder = Math.floor( Math.random() * emojisModule.length);
  
  const card = 
  document.createElement('div');
  card.setAttribute('data-id',emojisModule[randomIndex].id)
  
  card.addEventListener('click',handleClick);
  card.style.order = randomOrder
  
  const span =
  document.createElement('span');
  
  span.textContent = emojisModule[randomIndex].emo
  card.append(span);
  
 
  firstEmo.setAttribute('data-id',emojisModule[randomIndex].id)
  container.appendChild(card);
  }
  
}

createCards();


function handleClick() {
  
  const id = this.dataset.id
  const  firstEmoId = firstEmo.dataset.id 
  
  container.innerHTML = ''
    createCards()

  if (id === firstEmoId) {
    firstEmo.classList.add('match')
    firstEmo.classList.remove('nomatch')

    feedback.textContent = 'Matched'
    win++
    play++
    winState.textContent = `win: ${win}` 
    playState.textContent = `play  :${play}`
  }else {
    firstEmo.classList.remove('match')
    firstEmo.classList.add('nomatch')
    feedback.textContent = 'No match'
    play++ 
    playState.textContent = `play  :${play}`
    winState.textContent = `win: ${win}` 
    navigator.vibrate(1)
  }
  
  saveGameStates()
}

