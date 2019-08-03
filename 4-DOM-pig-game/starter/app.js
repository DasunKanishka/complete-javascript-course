/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
- Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)
- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/


var isGamePlaying, players, winningScore;

players = {
    activePlayerID: 0,
    globalScores: [0, 0],
    roundScore: 0
}

dices = {
    dicesValues: [0, 0],
    previousDicesValues: [0, 0]
}

document.querySelector( '.btn-set' ).addEventListener( 'click', setWinningScore );
document.querySelector( '.btn-reset' ).addEventListener( 'click', resetGame );
document.querySelector( '.btn-roll' ).addEventListener( 'click', rollDices );
document.querySelector( '.btn-hold' ).addEventListener( 'click', holdScore );

function setWinningScore ( event ) {
    if ( event ) {
        event.preventDefault();
    }

    winningScore = document.getElementById( 'winningScore' ).value;

    if ( winningScore !== '' ) {
        if ( isNaN( winningScore ) ) {
            formNotifications.textContent = 'Please enter a valid score';

            displayFormNotifications ();
        } else {
            document.querySelector( '.btn-set' ).disabled = true;

            document.getElementById( 'winningScore' ).disabled = true;

            document.querySelectorAll( '.dice, .btn-action' ).forEach(( element ) => {
                element.classList.remove( 'hidden' );
            });

            document.querySelector( '.player-' + players.activePlayerID + '-panel' ).classList.add( 'active' );

            return winningScore;
        }
    } else {
        formNotifications.textContent = 'Please enter the winning score';

        displayFormNotifications ();
    }

    function displayFormNotifications () {
        var formNotifications = document.getElementById( 'formNotifications' );

        formNotifications.classList.remove( 'hidden' );

        setTimeout (function () { formNotifications.classList.add( 'hidden' ); }, 2000);
    }
}

function resetGame () {
    location.reload();
}

function rollDices () {
    for ( var diceIndex = 0; diceIndex < dices.dicesValues.length; diceIndex++ ) {
        var diceNumber = Math.floor( Math.random() * 6 + 1 );
        
        if ( dices.previousDicesValues[ diceIndex ] === 6 && dices.previousDicesValues[ diceIndex ] === diceNumber ) {
            players.globalScores[ players.activePlayerID ] = 0;

            document.getElementById( 'score-' + players.activePlayerID ).textContent = 0;

            turnPlayer();
        } else if ( diceNumber !== 1 ) {
            dices.dicesValues[ diceIndex ] += diceNumber;

            players.roundScore += diceNumber;
            
            document.getElementById( 'current-' + players.activePlayerID ).textContent = players.roundScore;   
            
            dices.previousDicesValues[ diceIndex ] = diceNumber;
        } else {
            turnPlayer();

            break;
        }

        document.querySelector( '.dice-' + diceIndex ).src = 'dice-' + diceNumber + '.png';
    };
}

function holdScore () {
    players.globalScores[ players.activePlayerID ] += players.roundScore;

    document.getElementById( 'score-' + players.activePlayerID ).textContent = players.globalScores[ players.activePlayerID ];

    if ( players.globalScores[ players.activePlayerID ] >= setWinningScore() ) {
        players.roundScore = 0;

        document.getElementById( 'current-' + players.activePlayerID ).textContent = 0;

        document.querySelector( '.player-' + players.activePlayerID + '-panel' ).classList.remove( 'active' );

        document.querySelector( '.player-' + players.activePlayerID + '-panel' ).classList.add( 'winner' );

        document.querySelector( '.player-' + players.activePlayerID + '-panel .player-name' ).textContent = 'Winner';

        document.querySelectorAll( '.dice, .btn-roll, .btn-hold' ).forEach(( element ) => {
            element.classList.add( 'hidden' );
        });

        isGamePlaying = false;
    } else {
        turnPlayer();
    }
}

function turnPlayer () {
    players.roundScore = 0;

    dices.previousDicesValues = [0, 0];

    document.querySelector( '.player-' + players.activePlayerID + '-panel' ).classList.remove( 'active' );

    document.getElementById( 'current-' + players.activePlayerID ).textContent = 0;

    players.activePlayerID = players.activePlayerID === 0 ? 1 : 0;
    
    document.querySelector( '.player-' + players.activePlayerID + '-panel' ).classList.add( 'active' );

    document.querySelectorAll( '.dice' ).forEach(( dice ) => {
        dice.src = 'dice-1.png';
    });
}