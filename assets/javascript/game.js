// Declare variables
var difficulty = 2; // Set to 1 or 2 (harder)

var wins = 0;
var tillWin = 1; // Initialize to 1 so win criteria is not met when page is loaded
var firstGame = 1;
var isCorrect = "";
var word = {
    current: "",
    previous: "",
    pack: ["risotto", "prawns", "scallops", "wellington", "filet", "mushrooms", "potato", "pudding", "burger", "salmon", "lobster", "short rib", "omlette", "meatballs", "fried chicken", "scrambled eggs", "bean dip", "porkchop", "sticky ribs", "sliders", "pasta", "roast", "roast beef", "curry", "chorizo", "salad", "carrot cake", "roast duck", "gnocchi", "arancini", "shawarma", "sea bass", "caviar", "pancakes", "gazpacho", "roasted squash", "jerk chicken", "apple crumble", "chips", "bisque", "caesar salad", "carpaccio", "pork belly", "monkfish", "beef tartare", "venison", "sweetbread", "pigeon", "veal", "lamb chop"],
    packEasy: ["risotto", "scallops", "steak", "burger", "eggs"],
    masked: [],
    string: "",
};
var guess = {
    left: 0,
    letters: [],
    string: "",
};

// Grabs a reference to the <span>
var text = {
    wins: document.getElementById("wins"),
    wordCurrent: document.getElementById("word-current"),
    wordPrevious: document.getElementById("word-previous-first"),
    guesses: document.getElementById("guesses"),
    letters: document.getElementById("letters"),
    instructions: document.getElementById("instructions-text"),
    wordPreviousSecond: document.getElementById("word-previous-second")
};

// Start a new game when page is loaded
newGame();

text.instructions.textContent = "Press any key to get started";

// This function is run whenever the user presses a key
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    // Validate keypress
    if (validateInput(userGuess) === true) {
        determineMatch(userGuess);

        // If first keypress in first game, clear the instructions
        if (firstGame === 1) {
            text.instructions.textContent = " ";
            firstGame = 0;
        }
        newGame();

    }
}

function newGame() {

    var isWin = determineWin();

    if ((guess.left === 0) ||
        (isWin === true)) { // Start a new game

        word.previous = word.current;

        // Randomly chooses a choice from the word pack
        if (difficulty === 1) {
            word.current = word.packEasy[Math.floor(Math.random() * word.packEasy.length)];
        }
        else {
            word.current = word.pack[Math.floor(Math.random() * word.pack.length)];
        }
        
        console.log("The current word is: " + word.current);

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

        tillWin = guess.left;

        // Resets the array containing guessed letters
        guess.letters = [" "];

        // Refresh the display at the start of a new game
        initDisplay();
    }
    // else continue current game
}

function initDisplay() {
    text.wins.textContent = wins;
    text.guesses.textContent = guess.left;
    updateLetters(word.masked, word.string, text.wordCurrent);
    updateLetters(guess.letters, guess.string, text.letters);

    // If first game, do not display previous word
    if (firstGame === 1) {
        text.wordPrevious.textContent = "";
        text.wordPreviousSecond.textContent = "";
    }
    else {
        text.wordPrevious.textContent = isCorrect;
        text.wordPreviousSecond.textContent = word.previous;
    }
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
                tillWin--;
            }
        }
    }

    // If user guesses incorrectly, count down
    if (alreadyGuessed === false) {
        if (correctGuess === false) {
            guess.left--;
            guess.letters[guess.letters.length] = letter;
            text.guesses.textContent = guess.left;

            if (guess.left === 0) {
                isCorrect = "Come on! It's supposed to be ";
            }

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

    if (tillWin === 0) {
        winStatus = true;
        wins++;
        isCorrect = "That's a perfect ";
    }

    return winStatus;
}

function updateLetters(inputArray, inputString, span) {

    // Remove commas from display
    inputString = inputArray.toString();
    span.textContent = inputString.replace(/,/g, " ");
}