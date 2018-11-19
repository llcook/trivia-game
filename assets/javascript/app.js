// create a start button; on.click, game starts, 30-second timer activates, first question in questions array shows up
// if user clicks correct answer: timer stops, text shows CORRECT and image associated with answer, correctAnswers++, and another timer activates that moves to the next question something around 3 seconds
// if user clicks incorrect answer, timer stops, text shows INCORRECT, The correct answer was: and image associated with answer, incorrectAnswers++, and another timer activates that moves to the next question something around 3 seconds

// variable to select item; single loop through answer array -- then stop??? or... return false?
// if user reaches end of questions array, show GAME OVER!, show total correctAnswers, total incorrectAnswers, total timeOuts, and a button to reset the game

// function reset: correctAnswers: 0; incorrectAnswers: 0, timeOuts: 0, show START button

// questions page: timer, question, list of answers

// answer page: tells correct or incorrect; if incorrect, timer keeps going and brings you back to quesiton; if correct, goes to next question; if timeout, shows correct answer, then goes to next question

// end page: shows correct answers, incorrect answers, timeouts; then a click to reset the game (does NOT reload)

//////////////////////////////////////////////////////////////////////////////
// INITIALIZE / GLOBAL VARIABLES
//////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    var guessTimer = 10;
    var intervalId;
    var rightAnswers;
    var wrongAnswers;
    var gameLength;

    var gameKey = [
        {
            question: "Changing the number of ____ in an atom forms ions.",
            choices: ["protons", "electrons", "neutrons"],
            answer: 1
        },
        {
            question: "The same elements occur everywhere in the universe.",
            choices: ["true", "false"],
            answer: 0
        },
        {
            question: "An element's atomic number comes from the number of ____ in it.",
            choices: ["protons", "electrons", "neutrons"],
            answer: 0
        },
        {
            question: "This was the first man-made element.",
            choices: ["Einsteinium", "Astatine", "Plutonium", "Technetium"],
            answer: 3
        },
        {
            question: "The most common element, by mass, is:",
            choices: ["Hydrogen", "Helium", "Oxygen"],
            answer: 2
        }
    ];

    //////////////////////////////////////////////////////////////////////////////
    // TIMER FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        guessTimer--;
        $("#timer").html("<h2>Time remaining: " + guessTimer + " seconds</h2>");

        if (guessTimer === 0) {
            stop();
            // alert("Time's up!");
            // if timer runs out before user selects an answer, text shows TIME'S UP, The correct answer was: and image associated with answer, timeOuts++, another timer activates that moves to next question 3 seconds-ish
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    //////////////////////////////////////////////////////////////////////////////
    // GAME FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////

    function startGame() {
        gameLength = gameKey.length;
    }

    function newQuestion() {
        if (rightAnswers + wrongAnswers >= gameLength) {
            gameOver();
        } else {

            // generate a random question
            var randomQ = Math.floor(Math.random() * gameKey.length);
            currentQ = gameKey[randomQ];
            console.log(currentQ);
            var q = currentQ.question;
            $("#question").append(q);

            // show answer choices
            for (var i = 0; i < currentQ.choices.length; i++) {
                var a = currentQ.choices[i];
                console.log(a); // logs all answers

                $("#answerButtons").append("<div>" + a + "</div>");
            }

            // start the timer
            runTimer();
        }
    }



    //////////////////////////////////////////////////////////////////////////////
    // START GAME
    //////////////////////////////////////////////////////////////////////////////

    $("#startButton").on("click", function () {
        $("#startButton").hide();
        newQuestion();
    });

});

