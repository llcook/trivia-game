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
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var timeOuts = 0;

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

    var gameLength = gameKey.length;

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
            timeOut();
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    //////////////////////////////////////////////////////////////////////////////
    // GAME FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////

    function rightAnswer() {
        rightAnswers++;
        console.log(rightAnswers);
        reset();
        $("#question").html("<h3>Correct!</h3>");
        $("#answers").append("<img src='https://via.placeholder.com/150'/>");
        setTimeout(newQuestion, 3000);
    }

    function wrongAnswer() {
        wrongAnswers++;
        console.log(wrongAnswers);
        reset();
        $("#question").html("<h3>Incorrect!</h3>");
        $("#answers").append("<img src='https://via.placeholder.com/150'/>");
        setTimeout(newQuestion, 3000);
    }

    function timeOut() {
        timeOuts++;
        console.log(timeOuts);
        reset();
        $("#question").html("<h3>Time's up!</h3>");
        $("#answers").append("<img src='https://via.placeholder.com/150'/>");
        setTimeout(newQuestion, 3000);
    }

    function reset() {
        $("#question").empty();
        $("#answers").empty();
        stop();
    }

    function newQuestion() {

        reset();

        // // stops question generation when game's over
        if ((rightAnswers + wrongAnswers + timeOuts) >= gameLength) {
            gameOver();

        } else {

            // start the timer
            runTimer();

            // generate a random question
            var randomQ = Math.floor(Math.random() * gameKey.length);
            var currentQ = gameKey[randomQ];
            console.log(currentQ);

            // show random question in browser
            var q = currentQ.question;
            $("#question").append(q);

            // show answer choices in browser
            for (var i = 0; i < currentQ.choices.length; i++) {
                var answerBank = currentQ.choices[i];
                console.log(answerBank); // logs all answers
                $("#answers").append("<div class='answer'>" + answerBank + "</div>"); // shows answers
            }

            // store correct answer
            var a = currentQ.answer;
            console.log(a);

            // activate user interactivity
            userGuess();

            function userGuess() {

                $(".answer").on("click", function () {

                    var userGuess = (this).innerHTML;
                    console.log(userGuess);

                    if (userGuess === a) {
                        rightAnswer();
                    } else if (userGuess !== a) {
                        wrongAnswer();
                    } else {
                        timeOut();
                    }
                })
            }

        }

    }

    // function rightAnswer() {
    //     rightAnswers++;
    //     console.log(rightAnswers);
    //     reset();
    //     $("#question").html("<h3>Correct!</h3>");
    //     $("#answers").append("<img src='https://via.placeholder.com/150'/>");
    //     setTimeout(newQuestion, 3000);
    // }

    // function wrongAnswer() {
    //     wrongAnswers++;
    //     console.log(wrongAnswers);
    //     reset();
    //     $("#question").html("<h3>Incorrect!</h3>");
    //     $("#answers").append("<img src='https://via.placeholder.com/150'/>");
    //     setTimeout(newQuestion, 3000);
    // }

    // function timeOut() {
    //     timeOuts++;
    //     console.log(timeOuts);
    //     reset();
    //     $("#question").html("<h3>Time's up!</h3>");
    //     $("#answers").append("<img src='https://via.placeholder.com/150'/>");
    //     setTimeout(newQuestion, 3000);
    // }

    // function reset() {
    //     $("#question").empty();
    //     $("#answers").empty();
    //     stop();
    // }

    function gameOver() {

        reset();

        // show scoreboard
        $("#finalScore").append("<div>Right answers: " + rightAnswers + "</div>" +
            "<div>Wrong answers: " + wrongAnswers + "</div>" +
            "<div>Timeouts: " + timeOuts + "</div>")

        // show play again button
        $("#playAgain").append("<button>" + "Try again!" + "</button>");
    }

    //////////////////////////////////////////////////////////////////////////////
    // START GAME
    //////////////////////////////////////////////////////////////////////////////

    $("#startButton").on("click", function () {
        $("#startButton").hide();
        newQuestion();
    });

});

