var Word = require("./word.js");

var inquirer = require("inquirer");

var colors = require("colors");

//array of words

var wordsList = ["azalea", "buttercup", "carnation", "chrysanthemum",
    "cornflower", "crocus", "daffodil", "dahlia", "daisy", "dandelion",
    "iris", "lavender", "lilac", "lily", "marigold", "orchid",
    "rose", "sunflower", "tulip", "violet", "zinnia"];

var chosenWord = "";
var numGuesses = 9;
var isWon = false;

var newWord;


function initializeGame() {

    numGuesses = 9;
    isWon = false;
    //choose a word randomly from list
    chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

    console.log("\n(Hint: All answers are types of flowers)")

    //create a Word
    // split the word and create the letters
    // show the underscores
    newWord = new Word(chosenWord);
    newWord.newLetters();
    // playGame();
}

// recursion --> keep showing until they run out of guesses
// or all the letters are shown
function playGame() {
    // if there are still guesses left and there are still blanks in the word
    if ((numGuesses > 0) && (!isWon)) {

        inquirer.prompt([
            {
                type: "input",
                message: "Guess a letter",
                name: "letter"
            }

        ]).then(answers => {

            var letterInWord = false;
            //check if the letter is in the word
            for (var i = 0; i < newWord.letterObjArray.length; i++) {

                if (newWord.letterObjArray[i].value == answers.letter) {

                    newWord.letterObjArray[i].guessed = true;

                    letterInWord = true;
                }
            }
            //after done checking all the letters, display the word
            newWord.showWord();

            // if the letter is in the word
            if (letterInWord) {
                console.log(colors.green("\nCORRECT!!!\n"));
            }

            // if it's not in the word
            else {
                numGuesses--;

                // if there are no more guesses left
                if (numGuesses == 0) {
                    console.log(colors.red("\nINCORRECT!") + " You ran out of guesses!\n")
                }

                else {
                    console.log(colors.red("\nINCORRECT!") + " You have " + numGuesses + " guesses left\n")
                }
            }

            //if there are no undercores left in display, the game is won
            if (newWord.display.indexOf("_") == -1) {
                isWon = true;
                console.log("\nYou got it right!\n")
            }

            // go back to beginnin of playGame() function
            //and check if the playGame conditions are met (to continue)
            playGame();

        }); // close.then

    }
    // if game over
    else {

        inquirer.prompt([
            {
                type: "confirm",
                name: "playAgain",
                message: "Do you want to play again?"
            }
        ]).then(function (playMore) {
            // if user said yes
            if (playMore.playAgain) {
                //start a newGame
                initializeGame();
                playGame();
            }

        });

    }

} //close playGame()


//call initializeGame() and playGame()
initializeGame()
playGame();