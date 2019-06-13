//This program receives single character input from the user
//and matches it to characters making up a predefined word
//selected at random from an array. If the user enters a matching
//character this character is displayed on the screen at the same
//index it would be in the word. User wins when they have guessed
//the word correctly and losses when they have used all their guesses.

//The game will respawn a new word after every game, win or loose.

//var numberOfGuesses = number of guesses remaining for user - different levels have harder words and less        guesses. defined by random word length divided level number
var welcomeMessage = document.getElementById('message-box').getElementsByTagName('h1')[0];

var theGame = {
    dictionary: ['terminator', 'speed', 'the rock', 'face off', 'true lies', 'predator'],
    points: 0,
    level: 1,
    numberOfGuesses: 22, //default until it is set later
    lettersAlreadyGuessed: [],
    firstGame: true,

    returnRandomWord: function () {
        return this.dictionary[Math.floor(Math.random() * this.dictionary.length)].split('');
    },

    updateLettersAlreadyGuessed: function (item) {
        this.lettersAlreadyGuessed.push(item);

        this.lettersAlreadyGuessed.forEach(function (letter) {
            theGame.updateHTML(welcomeMessage, letter);
        });
    },

    levelUp: function () {
        console.log('leveld up');
        var maxLevel = 3;
        if (this.level < 3) {
            this.level++;
            //increase speed of music playing
        } else {
            this.gameOver();
        }
    },

    gameOver: function () {
        console.log('Game Over!');
        document.removeEventListener('keyup', keyUpHandler);
        this.updateHTML(welcomeMessage, 'YOU LOSE!');
        //play loser music
    },

    updateHTML: function (DOMElement, newString) {
        DOMElement.textContent = newString;
    },

    init: function () {
        //executes returnRandomWord and sets it to variable in game scope
        this.randomWordArray = this.returnRandomWord();
        this.numberOfGuesses = this.randomWordArray.length * (this.level);
        console.log(this.randomWordArray);
        if (this.firstGame) {
            this.updateHTML(welcomeMessage, 'Press Any Key to Play!');
        } else {
            this.updateHTML(welcomeMessage, ' ');
        }
    }

}

function keyUpHandler(event) {
    //if first play removes anykey prompt
    //checks if the character the user inputs is in the randomly chosen word
    //adds key pressed to lettersAlreadyGuessed array
    //play pop sound

    if (theGame.numberOfGuesses <= 0) {
        theGame.gameOver();
    }

    if (theGame.firstGame) {
        welcomeMessage.textContent = ' ';
        theGame.firstGame = false;
    }

    if (theGame.lettersAlreadyGuessed.indexOf(event.key) === -1) {
        theGame.randomWordArray.forEach(function (letter) {
            if (event.key === letter) {
                //found match - show to
                theGame.updateHTML(welcomeMessage, event.key);
            } else {
                //no match 
                theGame.updateHTML(welcomeMessage, 'x');
            }
        });

        //now that we have used the letter, add it to the array
        theGame.updateLettersAlreadyGuessed(event.key);
        console.log(theGame.lettersAlreadyGuessed);
    } else if (theGame.lettersAlreadyGuessed.indexOf(event.key) >= -1) {
        console.log(`youve alreaady played ${event.key}, sir`);
    }

    //reduce number of guesses
    theGame.numberOfGuesses--;
}
setTimeout(function () {
    document.addEventListener('keyup', keyUpHandler);
}, 1200);

//start our program
theGame.init();