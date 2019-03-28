// Declare variables
var wins = 0;
var word = {
    current: "",
    previous: "",
    pack: ["spaghetti", "pizza", "steak", "salad", "fried chicken", "burrito"],
    masked: [],
    string: ""
};
var guess = {
    left: 0,
    letters: [],
    string: ""
};

// Grabs a reference to the <span>
var text = {
    wins: document.getElementById("wins"),
    wordCurrent: document.getElementById("word-current"),
    wordPrevious: document.getElementById("word-previous"),
    guesses: document.getElementById("guesses"),
    letters: document.getElementById("letters")
};

newGame();

// This function is run whenever the user presses a key
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    determineMatch(userGuess);
    newGame();

    console.log("The current word is " + word.current + " (" + word.current.length + ")");
    console.log("The previous word was " + word.previous);
    console.log("You have " + wins + " wins");
    console.log("There are " + guess.left + " guesses left");
    console.log("----------");
};

function newGame() {

    var isWin = determineWin();

    if ((guess.left === 0) ||
        (isWin === true)) { // Start a new game

        text.wins.textContent = wins;

        word.previous = word.current;
        text.wordPrevious.textContent = word.previous;

        // Randomly chooses a choice from the word pack
        word.current = word.pack[Math.floor(Math.random() * word.pack.length)];

        // Sets the number of guesses
        guess.left = word.current.length;
        text.guesses.textContent = guess.left;

        // Resets the length of the masked word (in order to clear excess letters)
        word.masked.length = word.current.length;
        word.string.length = word.current.length;

        // Creates a masked word and stores in the array
        for (i = 0; i < word.current.length; i++) {
            word.masked[i] = "_";
        }

        updateDisplay(word.masked, word.string, text.wordCurrent);

        // Resets the array containing guessed letters
        guess.letters = [];
        console.log("New Game")

        updateDisplay(guess.letters, guess.string, text.letters);
    }
    // else continue current game
}

function determineMatch(letter) {
    var correctGuess = false;
    var alreadyGuessed = false;

    if ((word.masked.indexOf(letter) !== -1) ||
        (guess.letters.indexOf(letter) !== -1)) {

        // User already guessed this letter
        alreadyGuessed = true;
        console.log(letter + " already guessed")
    }
    else {
        // Iterates through word checking guess against each letter
        for (i = 0; i < word.current.length; i++) {
            if (letter === word.current.charAt(i)) {

                // User guessed correctly
                word.masked[i] = letter;
                correctGuess = true;
            }
        }
    }

    // If user guesses no letters, count down
    if (alreadyGuessed === false) {
        if (correctGuess === false) {
            guess.left--;
            guess.letters[guess.letters.length] = letter;
            text.guesses.textContent = guess.left;

            // Update display only when an incorrect guess is made
            updateDisplay(guess.letters, guess.string, text.letters);
        }
        else {
            // Update display only when a correct guess is made
            updateDisplay(word.masked, word.string, text.wordCurrent);
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

    return winStatus;
}

function updateDisplay(inputArray, inputString, span) {
    inputString = inputArray.toString();
    span.textContent = inputString.replace(/,/g, " ");

    for (i = 0; i < inputArray.length; i++) {
        console.log(inputArray[i]);
    }
}