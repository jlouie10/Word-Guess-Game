// Declare variables
var game = {
    wins: 0,
    theme: "food",
    wordsPack: ["spaghetti", "pizza", "steak", "salad", "fried chicken", "burrito"],
    word: "new game",
    guesses: 0
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
        game.guesses--;
    }
      
    // console.log("The current word is " + game.word);
    // console.log("You have " + game.wins + " wins");
    // console.log("There are " + game.guesses + " left");
    // console.log("----------");
};
      
function newGame() {
    // Randomly chooses a choice from the words array
    game.word = game.wordsPack[Math.floor(Math.random() * game.wordsPack.length)];

    // Sets the number of guesses to the length of the current word
    game.guesses = game.word.length - 1;
}