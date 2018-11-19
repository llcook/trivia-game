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
    var timeOuts;
    var gameLength;

    var gameKey = [
        {
            question: "Changing the number of ____ in an atom forms ions.",
            choices: ["protons", "electrons", "neutrons"],
            answer: "electrons"
        },
        {
            question: "The same elements occur everywhere in the universe.",
            choices: ["true", "false"],
            answer: "true"
        },
        {
            question: "An element's atomic number comes from the number of ____ in it.",
            choices: ["protons", "electrons", "neutrons"],
            answer: "protons"
        },
        {
            question: "This was the first man-made element.",
            choices: ["Einsteinium", "Astatine", "Plutonium", "Technetium"],
            answer: "Technetium"
        },
        {
            question: "The most common element, by mass, is:",
            choices: ["Hydrogen", "Helium", "Oxygen"],
            answer: "Oxygen"
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

    function newQuestion() {

        // stops question generation when game's over
        if (rightAnswers + wrongAnswers >= gameLength) {
            gameOver();
        } else {

            // resets scoreboard
            rightAnswers = 0;
            wrongAnswers = 0;
            timeOuts = 0;

            // generate a random question
            var randomQ = Math.floor(Math.random() * gameKey.length);
            currentQ = gameKey[randomQ];
            console.log(currentQ);
            var q = currentQ.question;
            $("#question").append(q);

            // show answer choices
            for (var i = 0; i < currentQ.choices.length; i++) {
                var answerBank = currentQ.choices[i];
                console.log(answerBank); // logs all answers
                $("#answers").append("<div class='answer'>" + answerBank + "</div>"); // shows answers
            }

            // stores answer as index
            var a = currentQ.answer;
            console.log(a);

            // start the timer
            runTimer();

            // answer calculator
            $(".answer").on("click", function () {

                // console.log(this.innerHTML);

                var userGuess = (this).innerHTML;
                console.log(userGuess);

                if (userGuess === a) {
                    rightAnswers++;
                    console.log(rightAnswers);
                } else if (userGuess !== a) {
                    wrongAnswers++;
                } else {
                    timeOuts++;
                }
            })


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

