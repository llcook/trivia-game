// create a start button; on.click, game starts, 30-second timer activates, first question in questions array shows up
// if user clicks correct answer: timer stops, text shows CORRECT and image associated with answer, correctAnswers++, and another timer activates that moves to the next question something around 3 seconds
// if user clicks incorrect answer, timer stops, text shows INCORRECT, The correct answer was: and image associated with answer, incorrectAnswers++, and another timer activates that moves to the next question something around 3 seconds
// if timer runs out before user selects an answer, text shows TIME'S UP, The correct answer was: and image associated with answer, timeOuts++, another timer activates that moves to next question 3 seconds-ish
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

    var answer = "";
    var seconds = 10;
    var intervalId;

    //////////////////////////////////////////////////////////////////////////////
    // TIMER FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        seconds--;
        $("#timer").html("<h2>Time remaining: " + seconds + " seconds</h2>");

        if (seconds === 0) {
            stop();
            alert("Time's up!");
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    //////////////////////////////////////////////////////////////////////////////
    // GAME FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////

    function showQuestions() {

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

        for(var i = 0; i < gameKey.length; i++){
            var q = gameKey[i];
            $("#question").append(q.question);

            for (var j = 0; j < question.choices.length; j++) {
                $("answerButtons").append(question.choices[j]);
            }
        }

    }



    //////////////////////////////////////////////////////////////////////////////
    // START GAME
    //////////////////////////////////////////////////////////////////////////////

    $("#startButton").on("click", function () {
        $("#startButton").hide();
        runTimer();
        showQuestions();
    });

});

