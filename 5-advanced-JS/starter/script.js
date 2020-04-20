// Function Constructor
/*
var Girl = function ( name, yearOfBirth, status ) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.status = status;
}

Girl.prototype.calculateAge = function () {
    console.log( 2020 - this.yearOfBirth );
}

var emma = new Girl( 'Emma', 1990, 'Forever Crush' );

emma.calculateAge();
*/


// Object.create
/*
var girlProto = {
    calculateAge: function() {
        console.log( 2020 - this.yearOfBirth );
    }
};

var emma = Object.create(girlProto, {
    name: { value: 'Emma' },
    yearOfBirth: { value: 1990 },
    status: { value: 'Forever Crush' }
});
*/


// Passing functions as Arguments
/*
var years = [ 1990, 1991, 1992, 1993, 1999 ];

function arrayCalc ( arr, fn ) {
    var arrRes = [];

    for (var i = 0; i < arr.length; i++) {
        arrRes.push ( fn ( arr[i] ) );
    }

    return arrRes;
};

function calcAge ( el ) {
    return 2020 - el;
};

function maxHeartRate ( el ) {
    return 206.9 - ( 0.67 * el );
}
*/


// Functions returning Functions
/*
function interviewQuestions ( job ) {
    if ( job === 'actor' ) {
        return function ( name ) {
            console.log ( name + ', what are the movies you\'ve been done?' );
        }
    } else if ( job === 'hr' ) {
        return function ( name ) {
            console.log ( 'What are the companies you\'ve worked before ' + name + '?' );
        }
    } else {
        return function ( name ) {
            console.log ( name + ', what do you do?' )
        }
    }
}
*/


// IIFE
/*
(function () {
    var score = Math.random() * 10;

    console.log ( score >= 5 );
})();
*/


// Closures
/*
function interviewQuestions ( job ) {
    return function (name) {
        if ( job === 'actor' ) {
            console.log ( name + ', what are the movies you\'ve been done?' );
        } else if ( job === 'hr' ) {
            console.log ( 'What are the companies you\'ve worked before ' + name + '?' );
        } else {
            console.log ( name + ', what do you do?' )
        }
    }
}
*/


// CODING CHALLENGE

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function () {
    var score = 0;
    
    function Question ( question, answers, correctAnswer ) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    
    Question.prototype.displayQuestion = function () {
        console.log( this.question );
    
        for ( var i = 0; i < this.answers.length; i++ ) {
            console.log( i + '. ' + this.answers[i] + '\n' );
        }
    }
    
    Question.prototype.checkAnswer = function ( enteredAnswer ) {
        if ( enteredAnswer !== 'exit' ) {
            if ( parseInt( enteredAnswer ) === this.correctAnswer ) {
                console.log( 'The answer is correct!' );

                score++;
            } else {
                console.log( 'The answer is wrong.' );
            }

            console.log( 'Your current socre is ' + score + '\n______________________________________' );
            promptQuestion ();
        }
    }
    
    function getRandomQuestion () {
        var knowYourCocktails = [
            new Question (
                'An Irish coffee is a cocktail consisting of hot coffee, sugar, stirred, and topped with thick cream and which spirit?',
                [ 'Rum', 'Whiskey', 'Vodka', 'Gin' ],
                1
            ),
            new Question (
                'Which drink uses a portion of coffee liqueur (e.g., Tia Maria or Kahlúa) is topped by a layer of Irish Cream (e.g., Baileys) which is poured over the back of a spoon so that it sits on the coffee liqueur.',
                [ 'B-52', 'Baby Guinness'],
                1
            ),
            new Question (
                'A cosmopolitan is a cocktail made with triple sec, cranberry juice, freshly squeezed lime juice or sweetened lime juice and which spirit?',
                [ 'Rum', 'Gin', 'Vodka', 'Whiskey' ],
                2
            ),
            new Question (
                'Sex on the Beach is a cocktail that uses which spirit?',
                [ 'Whiskey', 'Gin', 'Vodka', 'Rum', 'Non of these' ],
                2
            ),
            new Question (
                'Select the item not part of the Long Island Iced Tea recipe?',
                [ 'Vodka', 'Gin', 'Rum', 'Whiskey', 'Tequila' ],
                3
            ),
            new Question (
                'The Kamikaze is made of Triple Sec and lemon juice, served straight up in a cocktail glass but with which spirit?',
                [ 'Vodka', 'Gin', 'Non of these', 'Whiskey', 'Tequila' ],
                0
            ),
            new Question (
                'What spirit is used in Manhattan?',
                [ 'Tequila', 'Gin', 'Non of these', 'Whiskey', 'Vodka' ],
                3
            )
        ];
        
        var randomQuestion = knowYourCocktails[ Math.floor ( Math.random() * knowYourCocktails.length ) ];
    
        return randomQuestion;
    }
    
    function promptQuestion () {
        var currentQuestion = getRandomQuestion();
        
        currentQuestion.displayQuestion();
    
        var enteredAnswer = prompt( 'Enter the correct answer index.' );
    
        currentQuestion.checkAnswer ( enteredAnswer );
    }
    
    promptQuestion();
})();