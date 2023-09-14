// Game mai

let playerScore=0;
let computerScore=0;
let roundWinner='';

function playRound(playerSelection,computerSelection){
    if(playerSelection===computerSelection){
        roundWinner='tie'
    }

    if(
    (playerSelection ==='ROCK' && computerSelection==='SCISSORS')||
    (playerSelection ==='PAPER' && computerSelection==='ROCK')||
    (playerSelection ==='SCISSORS' && computerSelection==='PAPER')
  ){
   playerScore++;
   roundWinner='player';
  }

  if(
    (computerSelection ==='ROCK' && playerSelection==='SCISSORS')||
    (computerSelection ==='PAPER' && playerSelection==='ROCK')||
    (computerSelection ==='SCISSORS' && playerSelection==='PAPER')
  ){
    computerScore++;
    roundWinner='computer';
  }
 
    updateScoreMessage(roundWinner,playerSelection,computerSelection)
}

function getRandomChoice(){
  let randomNumber=Math.floor(Math.random()*3);
  switch(randomNumber){
    case 0:
        return 'ROCK';
    case 1:
        return 'PAPER';
    case 2:
        return 'SCISSORS';        
  }
}

function isGameOver(){
    return playerScore===5||computerScore===5;
}



// now lets manpulate the dom

// message winner or looser kon of that particular  match
const scoreInfo=document.getElementById("scoreInfo");
const scoreMessage=document.getElementById("scoreMessage");
// this is question mark score
const playerScorePara=document.getElementById("playerScore");
const computerScorePara=document.getElementById("computerScore");
//what is their selection
const playerSign=document.getElementById("playerSign");
const computerSign=document.getElementById("computerSign");
//what options that they click on
const rockBtn=document.getElementById('rockBtn');
const paperBtn=document.getElementById('paperBtn');
const scissorsBtn=document.getElementById('scissorsBtn');

// restart button
const restartBtn=document.getElementById('restartBtn');

//end game 
const endgameModal=document.getElementById('endgameModal');
const endgameMsg=document.getElementById('endgameMsg');

// To draw attention to the end game modal by "dimming" or "blurring" the rest of the content.
// To prevent interaction with other parts of the game while the end game modal is shown.

//overlay
const overlay=document.getElementById('overlay');

rockBtn.addEventListener('click',() =>handleClick('ROCK'));
paperBtn.addEventListener('click',() =>handleClick('PAPER'));
scissorsBtn.addEventListener('click',() =>handleClick('SCISSORS'));

restartBtn.addEventListener('click',restartGame);

overlay.addEventListener('click',closeEndgameModal);

function handleClick(playerSelection){
    if(isGameOver()){
      openEndgameModal();
      return;
    }
 
    const computerSelection=getRandomChoice();
    playRound(playerSelection,computerSelection);
    //means ? is replaced 
    updateChoices(playerSelection,computerSelection);
    updateScore();

    if(isGameOver()){
        openEndgameModal()
        setFinalMessage()
    }    

}

function updateChoices(playerSelection,computerSelection){
    switch(playerSelection){
        case 'ROCK':
            playerSign.textContent='✊';
            break;
        case 'PAPER':
            playerSign.textContent = '✋'
            break;
        case 'SCISSORS':
            playerSign.textContent = '✌'
            break;    
    }
    switch(computerSelection){
        case 'ROCK':
            computerSign.textContent='✊';
            break;
        case 'PAPER':
            computerSign.textContent = '✋'
            break;
        case 'SCISSORS':
            computerSign.textContent = '✌'
            break;    
    }
}

function updateScore(){
    if(roundWinner==='tie'){
       scoreInfo.textContent="It's a tie!";
    } else if(roundWinner==='player')  {
        scoreInfo.textContent="You Won!"
    } else if(roundWinner==='computer'){
        scoreInfo.textContent="You loss"
    }

    playerScorePara.textContent=`Player: ${playerScore}`
    computerScorePara.textContent=`Computer: ${computerScore}`
}

//this tells what happen in match additionl info
function updateScoreMessage(winner,playerSelection,computerSelection){
    if(winner==='player'){
        scoreMessage.textContent=`${capitalizeFirstLetter(playerSelection)}
        beats ${computerSelection.toLowerCase()}`
        return
    }

    if(winner==='computer'){
        scoreMessage.textContent=`${capitalizeFirstLetter(playerSelection)} 
        is beaten by ${computerSelection.toLowerCase()}`
        return
    }

    scoreMessage.textContent=`${capitalizeFirstLetter(playerSelection)}
    ties with ${computerSelection.toLowerCase()}`
    return
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal(){
    endgameModal.classList.add('active');
    overlay.classList.add('active');
}

function closeEndgameModal(){
   endgameModal.classList.remove('active');
   overlay.classList.remove('active');
}

function setFinalMessage(){
    return playerScore>computerScore? (endgameMsg.textContent='You won!')
    : (endgameMsg.textContent='You lost...')
}

function restartGame(){
    playerScore=0;
    computerScore=0;
    scoreInfo.textContent='Choose your weapon'
    scoreMessage.textContent='First to score 5 points wins the game'
    playerScorePara.textContent='Player: 0';
    computerScorePara.textContent='Computer: 0';
    playerSign.textContent='❔'
    computerSign.textContent = '❔'
    endgameModal.classList.remove('active');
    overlay.classList.remove('active');
}




