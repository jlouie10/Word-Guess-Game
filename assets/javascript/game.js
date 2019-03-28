// Declare variables
var wins = 0;
var word = {
    current: "new game",
    pack: ["spaghetti", "pizza", "steak", "salad", "fried chicken", "burrito"],
    masked: []
};
var guess = {
    left: 0,
    letters: []
};

// Grabs a reference to the <span>
var text = {
    wins: document.getElementById("wins"),
    word: document.getElementById("word"),
    guesses: document.getElementById("guesses"),
    letters: document.getElementById("letters")
};

// This function is run whenever the user presses a key
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    newGame();
    determineMatch(userGuess);
    determineWin();

    console.log("The current word is " + word.current + " (" + word.current.length + ")");
    console.log("You have " + wins + " wins");
    console.log("There are " + guess.left + " guesses left");
    console.log("----------");

};

function newGame() {

    if (guess.left === 0) { // Start a new game

        // Randomly chooses a choice from the word pack
        word.current = word.pack[Math.floor(Math.random() * word.pack.length)];

        // Sets the number of guesses
        guess.left = word.current.length;

        // Resets the length of the masked word (in order to clear excess letters)
        word.masked.length = word.current.length;

        // Creates a masked word and stores in the array
        for (i = 0; i < word.current.length; i++) {
            word.masked[i] = "_";
        }

        // Resets the array containing guessed letters
        guess.letters = [];
        console.log("New Game")
    }
    // else continue current game
}

function determineMatch(letter) {
    var correctGuess = false;

    // Iterates through word checking guess against each letter
    for (i = 0; i < word.current.length; i++) {
        if (letter === word.current.charAt(i)) {

            // User guessed correctly
            word.masked[i] = letter;
            correctGuess = true;
        }
    }

    // If user guesses no letters, count down
    if (correctGuess === false) {
        guess.left--;
        console.log("abc" + correctGuess + guess.left);
    }
    else {
        // Update display only when a correct guess is made
        for (i = 0; i < word.masked.length; i++) {
            console.log(word.masked[i]);
        }
    }
}

function determineWin() {
    var winStatus = false;

    for (i = 0; i < word.masked.length; i++) {

        // Check for character mask
        if (word.masked[i] === "_") {
            i = word.masked.length;
            winStatus = false;
        }

        // Once the array has been iterated through and no characters are masked, it's a win
        else if (i === (word.masked.length - 1)) {
            winStatus = true;
            wins++;
        }
    }
}