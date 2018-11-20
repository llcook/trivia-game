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

    function reset() {
        $("#question").empty();
        $("#answers").empty();
        stop();
        guessTimer = 10;
    }

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

    function newQuestion() {

        reset();

        // // stops question generation after length of array (5 questions)
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

    function gameOver() {

        reset();

        // show scoreboard
        $("#finalScore").append("<div>Right answers: " + rightAnswers + "</div>" +
            "<div>Wrong answers: " + wrongAnswers + "</div>" +
            "<div>Timeouts: " + timeOuts + "</div>")

        // show play again button
        $("#playAgain").append("<button>" + "Try again!" + "</button>");

        // THIS CLICK EVENT APPENDS THE BUTTON AND SCOREBOARD INFINITELY:
        // $("#playAgain").on("click", newQuestion());
    }

    //////////////////////////////////////////////////////////////////////////////
    // START GAME
    //////////////////////////////////////////////////////////////////////////////

    $("#startButton").on("click", function () {
        $("#startButton").hide();
        newQuestion();
    });

});

