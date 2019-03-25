// Declare variables
var game = {
    wins: 0,
    theme: "food",
    wordsPack: ["spaghetti", "pizza", "steak", "salad", "fried chicken", "burrito"],
    word: "new game",
    maskedWord: [],
    guesses: 0,
    guessedLetters: []
}
    
// Grabs a reference to the <span>
var text = {
    wins: document.getElementById("wins"),
    word: document.getElementById("word"),
    guesses: document.getElementById("guesses"),
    letters: document.getElementById("letters")
}

// This function is run whenever the user presses a key
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;
      
    if (game.guesses === 0) {
        // Start a new game
        newGame();
    }
    else {
        // Continue current game
        // Moved game.guesses--; to function determineGuess()
    }

    console.log("The current word is " + game.word + " (" + game.word.length + ")"); // game.word.length for testing
    console.log("You have " + game.wins + " wins");
    
    determineGuess(userGuess);

    console.log("There are " + game.guesses + " guesses left");
    console.log("----------");

};
      
function newGame() {
    // Randomly chooses a choice from the words array
    game.word = game.wordsPack[Math.floor(Math.random() * game.wordsPack.length)];

    // Sets the number of guesses to the length of the current word
    game.guesses = game.word.length; // Removed ( - 1) to account for correct guess

    // Resets the array containing guessed letters
    game.guessedLetters = [];
}

function determineGuess(guess) {
    for (i=0; i < game.word.length; i++) {
        if (guess.toLowerCase() === game.word.charAt(i)) {
            console.log("Correct guess " + i + ": " + guess.toLowerCase());
            i = game.word.length;
        }

        if (i === (game.word.length - 1)) {
            console.log("Wrong guess " + i + ": " + guess.toLowerCase());
            game.guesses--;
        }
    }
}