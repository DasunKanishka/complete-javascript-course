/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var isGamePlaying, player, diceNumber;

isGamePlaying = false;

players = {
    activePlayer: 0,
    globalScores: [0, 0],
    roundScore: 0,
}

document.querySelector( '.btn-new' ).addEventListener( 'click', startGame );
document.querySelector( '.btn-reset' ).addEventListener( 'click', resetGame );
document.querySelector( '.btn-roll' ).addEventListener( 'click', rollDice );
document.querySelector( '.btn-hold' ).addEventListener( 'click', holdScore );

function startGame () {
    isGamePlaying = true;

    document.querySelector( '.player-' + players.activePlayer + '-panel' ).classList.add( 'active' );
    
    document.querySelector( '.dice' ).classList.remove( 'hidden' );

    document.querySelector( '.btn-reset' ).classList.remove( 'hidden' );
    
    document.querySelector( '.btn-roll' ).classList.remove( 'hidden' );

    document.querySelector( '.btn-hold' ).classList.remove( 'hidden' );
    
    document.querySelector( '.btn-new' ).classList.add( 'hidden' );
}

function resetGame () {
    location.reload();
}

function rollDice () {
    if ( isGamePlaying ) {
        diceNumber = Math.floor( Math.random() * 6 + 1 );

        if ( diceNumber !== 1 ) {
            players.roundScore += diceNumber;

            document.getElementById( 'current-' + players.activePlayer ).textContent = players.roundScore;            
        } else {
            reset();
        }

        document.querySelector( '.dice' ).src = 'dice-' + diceNumber + '.png';
    }
}

function holdScore () {
    if ( isGamePlaying ) {
        players.globalScores[ players.activePlayer ] += players.roundScore;

        document.getElementById( 'score-' + players.activePlayer ).textContent = players.globalScores[ players.activePlayer ];

        if ( players.globalScores[ players.activePlayer ] >= 100 ) {
            players.roundScore = 0;

            document.getElementById( 'current-' + players.activePlayer ).textContent = 0;

            document.querySelector( '.player-' + players.activePlayer + '-panel' ).classList.remove( 'active' );

            document.querySelector( '.player-' + players.activePlayer + '-panel' ).classList.add( 'winner' );

            document.querySelector( '.player-' + players.activePlayer + '-panel .player-name' ).textContent = 'Winner';

            document.querySelector( '.dice' ).classList.add( 'hidden' );

            isGamePlaying = false;
        } else {
            reset();
        }
    }
}

function reset () {
    players.roundScore = 0;

    document.querySelector( '.player-' + players.activePlayer + '-panel' ).classList.remove( 'active' );

    document.getElementById( 'current-' + players.activePlayer ).textContent = 0;

    players.activePlayer = players.activePlayer === 0 ? 1 : 0;
    
    document.querySelector( '.player-' + players.activePlayer + '-panel' ).classList.add( 'active' );
}