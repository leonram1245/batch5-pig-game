/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var holdScore, currentScore, activePlayer, gamePlaying, winningScore;
var diceIMG = document.getElementById('dice');

const p1 = document.querySelector('#name-0');
const p2 = document.querySelector('#name-1');
const p1HoldScore = document.getElementById('score-0');
const p2HoldScore = document.getElementById('score-1');
const p1CurScore = document.getElementById('current-0');
const p2CurScore = document.getElementById('current-1');
const p1Panel = document.querySelector('.player-0-panel');
const p2Panel = document.querySelector('.player-1-panel');
const bntRoll = document.querySelector('.btn-roll');
const bntHold = document.querySelector('.btn-hold');
const bntNew = document.querySelector('.btn-new')

init();

bntNew.addEventListener('click', init);

bntRoll.addEventListener("click", function(){
    if(gamePlaying){
        var diceVal = [1,2,3,4,5,6];
        var dice = diceVal[Math.floor(Math.random() * diceVal.length)];
        diceIMG.src = 'dice-'+ dice +'.png';
        diceIMG.style.display = 'block';
        if(dice !== 1){
            currentScore += dice;
            document.getElementById('current-' + activePlayer).textContent = currentScore;
        }else{
            nextPlayer();
        }
    }
})

bntHold.addEventListener('click', function() {
    if(gamePlaying) {
        holdScore[activePlayer] += currentScore;
        document.querySelector('#score-'+ activePlayer).textContent = holdScore[activePlayer];
        if(holdScore[activePlayer] >= winningScore){
            var player;
            if(activePlayer === 0) {
                player = 'Player 1';
            }else{
                player = 'Player 2';
            }
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner ' + player;
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
})

function nextPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    }else{
        activePlayer = 0;
    }
    currentScore = 0;

    p1CurScore.textContent = '0';
    p2CurScore.textContent = '0';
    p1Panel.classList.remove('active');
    p2Panel.classList.remove('active');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.toggle('active')
}

function init() {

    holdScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    winningScore = 100;

    p1HoldScore.textContent = '0';
    p2HoldScore.textContent = '0';
    p1CurScore.textContent = '0';
    p2CurScore.textContent = '0';

    diceIMG.style.display = 'none';

    p1Panel.classList.remove('winner');
    p2Panel.classList.remove('winner');

    p1Panel.classList.remove('active');
    p2Panel.classList.remove('active');
    p1Panel.classList.add('active');

    p1.textContent = 'Player 1';
    p2.textContent = 'Player 2'
}