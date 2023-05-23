`use strict`;


// Select elements
const score0El = document.querySelector(`#score--0`) //grab the score p1 (43)
const score1El = document.getElementById(`score--1`) //grah the score p2 (24)
const diceEl = document.querySelector(`.dice`); //the dice clas inside the img tag
const btnNew = document.querySelector(`.btn--new`); //reset button IG
const btnRoll = document.querySelector(`.btn--roll`); //roll button
const btnHold = document.querySelector(`.btn--hold`); //hold button
const current0El = document.getElementById('current--0'); //grabs the current--0(p1)
const current1El = document.getElementById('current--1'); //grabs the current--1(p2)
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);


//it displays them on the page with ID of score -- ${}
// score0El.textContent = 0; //48 at first on DOM
// score1El.textContent = 0; //24 at first on DOM
//hide the dice

//we gotta save current score to 0 so it adds up letter
//dont store data in DOM- it should be in JS
//score of player 1 would be at [0], and player 2 at [0]. The score is set to 0 so they can be added later
// const scores = [0, 0] //holdes the score of player 0 and 1
// let currentScore = 0; //its outside the function because if we put it locally, it would keep setting score to 0 if we click the event listener
//intiialzing function

let scores, currentScore, activePlayer, stateOfGame;
//let them live outside the function for scoping issues

const init = function(){ //scoping issues
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0; 
    stateOfGame = true;

    score0El.textContent = 0; //48 at first on DOM
    score1El.textContent = 0; //24 at first on DOM
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add(`hidden`);
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
    
    
};
init();


// let activePlayer = 0; // starts with 0 since 0 is player 1 //hold if the activePlayer is player is 0 or 1
// let stateOfGame = true;

function switchPlayer(){
    //switch to the next player if its eqaul to 1-- else;
        //now we are gonna switch if its !!!!1!!!
        document.getElementById(`current--${activePlayer}`).textContent = 0; //since it switches, the current player to a state of 0 and 1
        currentScore = 0; //the player 2 will be zero now

        if(activePlayer === 0){
            activePlayer = 1; //1 is player 2
        } else{
            activePlayer = 0; //and vice versa, or if active player is 1, we are gonna make it 0 as in player 1
        }
        player0El.classList.toggle(`player--active`) //essentially same as removing and adding. If its there in player 1, it will remove, it and add it to player 2, vice versa
        player1El.classList.toggle(`player--active`) //if its not there on player 2, it will add it
}


//generate a random dice roll/rolling dice functionality
btnRoll.addEventListener(`click`, function(){
    // if()
    //1. Generating a random dice roll
    if(stateOfGame){
    const randomGen = Math.trunc(Math.random() * 6) + 1; //rolls six times
    
    //2. Display the dice
    diceEl.classList.remove(`hidden`); //the dice to expose it so it can generate below
    diceEl.src = `dice-${randomGen}.png`; //grabs the images


    //3. Check if the number is 1

    if(randomGen !== 1){
        //if randomGen(1-6) is not 1- we will add to the current score (0)
        currentScore = currentScore + randomGen;
        // current0El.textContent = currentScore; //change later? //we will display this score at current player instead
        document.getElementById(`current--${activePlayer}`) //active player is now 0 as in player 1
        .textContent = currentScore; 

    } else {
        //switch to the next player if its eqaul to 1-- else;
        //now we are gonna switch if its !!!!1!!!
        switchPlayer();

    }
    }
})






btnHold.addEventListener(`click`, function(){

    if(stateOfGame){
    //1. Add current score to the active player's score

    scores[activePlayer] = scores[activePlayer] + currentScore;  //scores of player 0 or 1
    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
    //2. Check if the player's score is >= 100
    //Finish the game

    if (scores[activePlayer] >= 20){
        stateOfGame = false;
        document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
        document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`);
        diceEl.classList.add(`hidden`)


    } else{
        //Switch to the next player
        switchPlayer();
    }
    }
})

btnNew.addEventListener(`click`, init)

   


