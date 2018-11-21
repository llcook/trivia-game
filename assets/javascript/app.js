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
            question: "Changing the number of these particles in an atom forms ions.",
            choices: ["protons", "electrons", "neutrons"],
            answer: "electrons",
            answerMsg: "Here's a fact about ions.",
            answerImg: "../images/atom-animation.gif"
        },
        {
            question: "The same elements occur everywhere in the known universe.",
            choices: ["true", "false"],
            answer: "true",
            answerMsg: "",
            answerImg: "../images/5oCq.gif"
        },
        {
            question: "This is the third most abundant element in Earth's mass.",
            choices: ["iron", "oxygen", "silicon", "magnesium"],
            answer: "silicon",
            answerMsg: "Here's something interesting",
            answerImg: "../images/atom-animation.gif"
        },
        {
            question: "This was the first man-made element.",
            choices: ["Einsteinium", "Astatine", "Plutonium", "Technetium"],
            answer: "Technetium",
            answerMsg: "",
            answerImg: ""
        },
        {
            question: "What's the atomic number of Oxygen?",
            choices: ["2", "3", "5", "8"],
            answer: "8",
            answerMsg: "",
            answerImg: "../images/atom-animation.gif"
        }
    ];

    var gameLength = gameKey.length;

    //////////////////////////////////////////////////////////////////////////////
    // TIMER FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
        $("#timer").show();
    }

    function decrement() {
        guessTimer--;
        $("#timer").html(guessTimer);

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
        $("#timer").hide();
        guessTimer = 10;
    }

    function rightAnswer() {
        rightAnswers++;
        reset();
        $("#question").html("Correct.");
        // $("#answers").append("<img src='https://via.placeholder.com/150'/>");
        // add: show congratulatory message plus a bonus fact about the answer
        setTimeout(newQuestion, 3000);
    }

    function rightAnswerMsg() {

    }

    function wrongAnswer() {
        wrongAnswers++;
        reset();
        $("#question").html("Here's the correct answer.");
        // add: show correct answer
        // $("#answers").append("<img src='https://via.placeholder.com/150'/>");
        setTimeout(newQuestion, 3000);
    }

    function timeOut() {
        timeOuts++;
        reset();
        $("#question").html("Here's the correct answer.");
        // $("#answers").append("<img src='https://via.placeholder.com/150'/>");
        // add: show correct answer
        // question and answer are defined within the newQuestion function
        setTimeout(newQuestion, 3000);
    }

    function newQuestion() {

        reset();

        // stops question generation after length of array
        if ((rightAnswers + wrongAnswers + timeOuts) >= gameLength) {
            gameOver();

        } else {

            // start the timer
            runTimer();

            // generate a random question
            // this will need to stop a question from repeating somehow
            var randomQ = Math.floor(Math.random() * gameKey.length);
            var currentQ = gameKey[randomQ];

            // show random question in browser
            var q = currentQ.question;
            $("#question").append(q);

            // show answer choices in browser
            for (var i = 0; i < currentQ.choices.length; i++) {
                var answerBank = currentQ.choices[i];
                $("#answers").append("<div class='answer'>" + answerBank + "</div>"); // shows answers
            }

            // store correct answer
            var a = currentQ.answer;

            // activate user interactivity
            userGuess();

            function userGuess() {

                $(".answer").on("click", function () {

                    var userGuess = (this).innerHTML;

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
        $("#playAgain").append("<button>" + "Try again" + "</button>");

        // THIS CLICK EVENT APPENDS THE BUTTON AND SCOREBOARD INFINITELY:
        // $("#playAgain").on("click", newQuestion());
    }

    // $("#playAgain").on("click", newQuestion());

    //////////////////////////////////////////////////////////////////////////////
    // START GAME
    //////////////////////////////////////////////////////////////////////////////


    $("#startButton").on("click", function () {
        newQuestion();
        $("#startButton").hide();
    });

});

