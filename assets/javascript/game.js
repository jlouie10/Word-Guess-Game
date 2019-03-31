// Declare variables
var wins = 0;
var word = {
    current: "",
    previous: "",
    pack: ["risotto", "prawns", "scallops", "wellington", "filet", "mushrooms", "potato", "pudding", "burger", "salmon", "lobster", "short rib", "omlette", "meatballs", "fried chicken", "scrambled eggs", "bean dip", "porkchop", "sticky ribs", "sliders", "pasta", "roast", "roast beef", "curry", "chorizo", "salad", "carrot cake", "roast duck", "gnocchi", "arancini", "shawarma", "sea bass", "caviar", "pancakes", "gazpacho", "roasted squash", "jerk chicken", "apple crumble", "chips", "bisque", "caesar salad", "carpaccio", "pork belly", "monkfish", "beef tartare", "venison", "sweetbread", "pigeon", "veal", "lamb chop"],
    masked: [], // !!! Combine array and string !!!
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

console.log(word.pack.length);
// Start a new game when page is loaded
newGame();

// This function is run whenever the user presses a key
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    // Validate keypress
    if (validateInput(userGuess) === true) {
        determineMatch(userGuess);
        newGame();
    }
}

function newGame() {

    var isWin = determineWin();

    if ((guess.left === 0) ||
        (isWin === true)) { // Start a new game

        word.previous = word.current;

        // Randomly chooses a choice from the word pack
        word.current = word.pack[Math.floor(Math.random() * word.pack.length)];

        // Sets the number of guesses
        guess.left = word.current.length;

        // Resets the length of the masked word (in order to clear excess letters)
        word.masked.length = word.current.length;

        // Creates a masked word and stores in the array
        for (i = 0; i < word.current.length; i++) {

            // If space or dash, ignore and remove from guess count
            if ((word.current.charAt(i) === " ") ||
                (word.current.charAt(i) === "-")) {
                word.masked[i] = word.current.charAt(i);
                guess.left--;
            }
            else {
                word.masked[i] = "_";
            }
        }

        // Resets the array containing guessed letters
        guess.letters = [];

        // Refresh the display at the start of a new game
        initializeDisplay();
    }
    // else continue current game
}

function initializeDisplay() {
    text.wins.textContent = wins;
    text.wordPrevious.textContent = word.previous;
    text.guesses.textContent = guess.left;
    updateLetters(word.masked, word.string, text.wordCurrent);
    updateLetters(guess.letters, guess.string, text.letters);
}

function validateInput(input) {
    // User regular expression to accept lowercase keypress
    var regex = /^[a-z]+$/;

    if (input.match(regex) === null) {
        return false;
    }
    else {
        return true;
    }
}

function determineMatch(letter) {
    var correctGuess = false;
    var alreadyGuessed = false;

    if ((word.masked.indexOf(letter) !== -1) ||
        (guess.letters.indexOf(letter) !== -1)) {

        // User already guessed this letter
        alreadyGuessed = true;
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
            updateLetters(guess.letters, guess.string, text.letters);
        }
        else {
            // Update display only when a correct guess is made
            updateLetters(word.masked, word.string, text.wordCurrent);
        }
    }
}

function determineWin() { // !!! Revise this into a count down from word length !!!
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

function updateLetters(inputArray, inputString, span) {

    // Remove commas from display
    inputString = inputArray.toString();
    span.textContent = inputString.replace(/,/g, " ");
}