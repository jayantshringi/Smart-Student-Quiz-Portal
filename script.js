
// Array to store all 10 questions
var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
        correctAnswer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS", "XML"],
        correctAnswer: 2
    },
    {
        question: "Which is not a JavaScript framework?",
        options: ["Python Script", "JQuery", "Django", "NodeJS"],
        correctAnswer: 2
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "<!-- -->", "Both // and /* */"],
        correctAnswer: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        correctAnswer: 2
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        options: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        correctAnswer: 3
    },
    {
        question: "Which of the following is an array method in JavaScript?",
        options: ["push()", "length", "style", "innerHTML"],
        correctAnswer: 0
    },
    {
        question: "In CSS, how do you select an element with id 'demo'?",
        options: [".demo", "#demo", "demo", "*demo"],
        correctAnswer: 1
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<js>", "<scripting>", "<script>", "<javascript>"],
        correctAnswer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create myFunction()"],
        correctAnswer: 0
    }
];

// Variables to keep track of quiz data
var currentQuestionIndex = 0;
var userAnswers = [null, null, null, null, null, null, null, null, null, null]; // 10 nulls for 10 questions
var studentName = "";
var studentRoll = "";
var timeLeft = 300; // 300 seconds = 5 minutes
var timerInterval;

// Getting HTML elements by their ID
var loginSection = document.getElementById("login-section");
var instructionsSection = document.getElementById("instructions-section");
var quizSection = document.getElementById("quiz-section");
var resultSection = document.getElementById("result-section");

var loginForm = document.getElementById("login-form");
var startQuizBtn = document.getElementById("start-quiz-btn");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var submitQuizBtn = document.getElementById("submit-quiz-btn");
var restartBtn = document.getElementById("restart-btn");

// Function to hide all sections and show only one
function showSection(sectionToShow) {
    // Hide everything
    loginSection.classList.add("hidden");
    instructionsSection.classList.add("hidden");
    quizSection.classList.add("hidden");
    resultSection.classList.add("hidden");

    loginSection.style.display = "none";
    instructionsSection.style.display = "none";
    quizSection.style.display = "none";
    resultSection.style.display = "none";

    // Show the requested section
    sectionToShow.classList.remove("hidden");
    sectionToShow.style.display = "block";
}

// Start by showing login page
showSection(loginSection);

// Login Form Submit Event
loginForm.onsubmit = function (event) {
    event.preventDefault(); // Stop page from refreshing

    var nameInput = document.getElementById("student-name").value;
    var rollInput = document.getElementById("roll-number").value;

    // Check if fields are empty
    if (nameInput != "" && rollInput != "") {
        studentName = nameInput;
        studentRoll = rollInput;

        // Show name on instructions page
        document.getElementById("display-name").innerHTML = studentName;
        showSection(instructionsSection);
    } else {
        alert("Please fill all details!");
    }
};

// Start Quiz Button Click
startQuizBtn.onclick = function () {
    showSection(quizSection);
    startTimer();
    loadQuestion(currentQuestionIndex);
};

// Previous Button Click
prevBtn.onclick = function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex = currentQuestionIndex - 1;
        loadQuestion(currentQuestionIndex);
    }
};

// Next Button Click
nextBtn.onclick = function () {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex = currentQuestionIndex + 1;
        loadQuestion(currentQuestionIndex);
    }
};

// Submit Button Click
submitQuizBtn.onclick = function () {
    finishQuiz();
};

// Restart Button Click
restartBtn.onclick = function () {
    // Reset all variables
    currentQuestionIndex = 0;
    userAnswers = [null, null, null, null, null, null, null, null, null, null];
    timeLeft = 300;
    clearInterval(timerInterval);

    document.getElementById("login-form").reset();
    showSection(loginSection);
};

// Function to run the timer
function startTimer() {
    var timerDisplay = document.getElementById("timer-display");

    timerInterval = setInterval(function () {
        timeLeft = timeLeft - 1;

        // Find minutes and seconds
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;

        // Add 0 if less than 10
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        timerDisplay.innerHTML = minutes + ":" + seconds;

        // Stop timer when it reaches 0
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000); // 1000ms = 1 second
}

// Function to show the question
function loadQuestion(index) {
    var currentQuestion = questions[index];

    // Set question text
    document.getElementById("question-text").innerHTML = (index + 1) + ". " + currentQuestion.question;

    var optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Clear old options

    // For loop to create 4 options
    for (var i = 0; i < currentQuestion.options.length; i++) {
        var optionLabel = document.createElement("label");
        optionLabel.className = "option-label";

        var radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "quiz-option";
        radioInput.value = i;

        // Keep radio button checked if user selected it before
        if (userAnswers[index] === i) {
            radioInput.checked = true;
            optionLabel.classList.add("selected");
        }

        // When user clicks a radio button
        radioInput.onclick = function () {
            // Remove selected class from all labels
            var allLabels = document.getElementsByClassName("option-label");
            for (var j = 0; j < allLabels.length; j++) {
                allLabels[j].classList.remove("selected");
            }

            // Add selected class to parent label
            this.parentElement.classList.add("selected");

            // Save answer
            userAnswers[currentQuestionIndex] = parseInt(this.value);
        };

        optionLabel.appendChild(radioInput);
        optionLabel.appendChild(document.createTextNode(currentQuestion.options[i]));
        optionsContainer.appendChild(optionLabel);
    }

    // Update progress
    document.getElementById("question-tracker").innerHTML = "Question " + (index + 1) + " of 10";
    var percent = ((index + 1) / 10) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";

    // Disable prev button on first question
    if (index === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    // Show submit button on last question
    if (index === 9) {
        nextBtn.style.display = "none";
        submitQuizBtn.style.display = "block";
        submitQuizBtn.classList.remove("hidden"); // Also remove hidden class just in case
    } else {
        nextBtn.style.display = "block";
        submitQuizBtn.style.display = "none";
    }
}

// Function to calculate and show result
function finishQuiz() {
    clearInterval(timerInterval); // Stop timer

    var score = 0;
    var correct = 0;
    var wrong = 0;
    var skipped = 0;

    // For loop to check answers
    for (var i = 0; i < 10; i++) {
        if (userAnswers[i] === questions[i].correctAnswer) {
            score = score + 1;
            correct = correct + 1;
        } else if (userAnswers[i] === null) {
            skipped = skipped + 1;
        } else {
            wrong = wrong + 1;
        }
    }

    var percentage = (score / 10) * 100;

    // Put data in HTML
    document.getElementById("result-name").innerHTML = studentName;
    document.getElementById("result-roll").innerHTML = studentRoll;
    document.getElementById("result-score").innerHTML = score + "/10";
    document.getElementById("result-percentage").innerHTML = percentage + "%";

    document.getElementById("stat-correct").innerHTML = correct;
    document.getElementById("stat-wrong").innerHTML = wrong;
    document.getElementById("stat-skipped").innerHTML = skipped;

    var msgEl = document.getElementById("performance-msg");
    var cardEl = document.getElementById("result-card");

    // If Else Conditions for performance
    if (percentage >= 90) {
        msgEl.innerHTML = "Excellent! Outstanding performance.";
        msgEl.style.color = "#16a34a"; // emerald-600
        cardEl.className = "portal-card result-card result-excellent";
    } else if (percentage >= 75) {
        msgEl.innerHTML = "Very Good! Keep it up.";
        msgEl.style.color = "#0284c7"; // sky-600
        cardEl.className = "portal-card result-card result-good";
    } else if (percentage >= 50) {
        msgEl.innerHTML = "Good! But room for improvement.";
        msgEl.style.color = "#d97706"; // amber-600
        cardEl.className = "portal-card result-card result-average";
    } else {
        msgEl.innerHTML = "Needs Improvement. Try again.";
        msgEl.style.color = "#dc2626"; // red-600
        cardEl.className = "portal-card result-card result-poor";
    }

    showSection(resultSection);
}
