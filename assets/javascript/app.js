/////////////////////////////////////////////
// GAME KEY
/////////////////////////////////////////////

var questions = [{
    question: "Changing the number of these particles in an atom forms ions.",
    answers: ["protons", "electrons", "neutrons"],
    correctAnswer: "electrons",
    image: "../images/atom-animation.gif"
}, {
    question: "The same elements occur everywhere in the known universe.",
    answers: ["true", "false"],
    correctAnswer: "true",
    image: "../images/5oCq.gif"
}, {
    question: "This is the third most abundant element in Earth's mass.",
    answers: ["iron", "oxygen", "silicon", "magnesium"],
    correctAnswer: "silicon",
    image: "../images/atom-animation.gif"
}, {
    question: "This was the first man-made element.",
    answers: ["Einsteinium", "Astatine", "Plutonium", "Technetium"],
    correctAnswer: "Technetium",
    image: ""
}, {
    question: "What's the atomic number of Oxygen?",
    answers: ["2", "3", "5", "8"],
    correctAnswer: "8",
    image: "../images/atom-animation.gif"
}];

/////////////////////////////////////////////
// GAME FUNCTIONALITY
/////////////////////////////////////////////

var quiz = $("#quiz");
var timerStart = 10;
var timer;

// Game object, with key values that change within each function

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: timerStart,
    correct: 0,
    incorrect: 0,

    // TIMER
    countdown: function () {

        // Decrements timer
        game.counter--;
        
        // Displays counter start number based on timerStart variable
        $("#counter-number").text(game.counter);

        // Stops timer once it reaches zero and triggers timeout functionality
        if (game.counter === 0) {
            game.timeUp();
        }
    },

    // SHOW QUESTION
    loadQuestion: function () {

        // Sets timer for 10 seconds
        timer = setInterval(game.countdown, 1000);

        // Inputs html to show the current question
        quiz.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        // Loops through game key array and displays question on quiz element
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            quiz.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
            + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    // MOVE TO THE NEXT QUESTION
    nextQuestion: function () {

        // Resets the timer
        game.counter = timerStart;

        // Shows the timer
        $("#counter-number").text(game.counter);

        // Increments to the next question in the array
        game.currentQuestion++;

        // Triggers the function that shows the question
        game.loadQuestion();
    },

    // TIMEOUT FUNCTION
    timeUp: function () {

        // Clears timer and alerts the user that time's up
        clearInterval(timer);
        $("#counter-number").html(game.counter);
        quiz.html("<h2>Time's up.</h2>");

        // Shows the user the correct answer
        quiz.append("<h3>The correct answer is: " + questions[this.currentQuestion].correctAnswer);
        quiz.append("<img src='" + questions[this.currentQuestion].image + "' />");

        // If user has completed all questions, shows quiz results
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        // If questions remain, waits 3 seconds and goes to next question
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    // SHOWS USER QUIZ RESULTS
    results: function () {

        // Clears timer and shows user quiz results
        clearInterval(timer);

        quiz.html("<h2>Here's how you did.</h2>");

        $("#counter-number").text(game.counter);

        quiz.append("<h2>Correct answers: " + game.correct + "</h3>");
        quiz.append("<h3>Incorrect answers: " + game.incorrect + "</h3>");
        quiz.append("<h3>Timeouts: " + (questions.length = (game.incorrect + game.correct)) + "</h3>");
        quiz.append("<br><button id='start-over'>Start over?</button>");
    },

    // CHECKS ANSWERS
    clicked: function (selectedAnswer) {

        // Clears timer
        clearInterval(timer);

        // Compares the answer the user clicked with the correct answer
        // Then triggers appropriate function
        if ($(selectedAnswer.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        }
        else {
            this.answeredIncorrectly();
        }
    },

    // IF USER ANSWERS INCORRECTLY...
    answeredIncorrectly: function () {
        
        clearInterval(timer);

        // Increments up count for incorrect variable
        game.incorrect++;
        quiz.html("<h2>Incorrect.</h2>");

        // Shows user correct answer
        quiz.append("<h3>The correct answer is: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        quiz.append("<img src='" + questions[game.currentQuestion].image + "' />");

        // If no questions remain, shows results
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        // If questions remain, goes to next question
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    // IF USER ANSWERS CORRECTLY...
    answeredCorrectly: function () {

        clearInterval(timer);
        
        // Increments up count for correct variable
        game.correct++;
        quiz.html("<h2>Correct!</h2>");

        // Shows user correct answer
        quiz.append("<img src='" + questions[game.currentQuestion].image + "' />");

        // If no questions remain, shows results
        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        // If questions remain, goes to next question
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    // RESETS GAME IF USER SELECTS start-over BUTTON
    reset: function () {
        this.currentQuestion = 0;
        this.counter = timerStart;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

/////////////////////////////////////////////
// CLICK EVENTS THAT TRIGGER FUNCTIONALITY
/////////////////////////////////////////////

// Starts game when user clicks start-button
$(document).on("click", "#start-button", function () {
    $("#wrapper").append("<h2>Time remaining: <span id='counter-number'>10</span> seconds</h2>");
    game.loadQuestion();
});

// Compares answer with correct answer when user clicks answer-button
$(document).on("click", ".answer-button", function (selectedAnswer) {
    game.clicked(selectedAnswer);
});

// Resets game when user selects start-over button
$(document).on("click", "#start-over", function () {
    game.reset();
});