// Declare variables
var words = ["spaghetti", "pizza", "steak", "salad", "fried chicken", "burrito"];
var wins = 0;
var currentWord = "new game";
var guesses = 0;
    
// Grabs a reference to the <span>
var winsText = document.getElementById("wins");
var currentWordText = document.getElementById("current-word");
var guessesText = document.getElementById("guesses");
var lettersText = document.getElementById("letters");

// This function is run whenever the user presses a key
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;
      
    if (guesses === 0) {
        // Start a new game
        newGame();
    }
    else {
        // Continue current game
        guesses--;
    }
      
    // console.log("The current word is " + currentWord);
    // console.log("You have " + wins + " wins");
    // console.log("There are " + guesses + " left");
    // console.log("----------");
};
      
function newGame() {
    // Randomly chooses a choice from the words array
    currentWord = words[Math.floor(Math.random() * words.length)];

    // Sets the number of guesses to the length of the current word
    guesses = currentWord.length - 1;
}