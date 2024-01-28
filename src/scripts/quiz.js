const quizSet = {
    quizName: "Introduction to the Guitar",
    quizDescription: "This quiz is to test your knowledge on the basics of guitar.",
    questions:
        [
            {
                question: "What are the main parts of a guitar that you learned in this lesson?",
                options: ["Neck, strings, tailpiece", "Body, keyboard, mouthpiece", "Body, neck, headstock", "Strings, keys, pedals"],
                correct: "2",
                selected: ""
            },
            {
                question: "How can you tune a guitar?",
                options: ["By clapping your hands", "Using an electronic tuner or tuning by ear", "By tapping the strings", "By singing a high note"],
                correct: "1",
                selected: ""
            },
            {
                question: "What is the name of the part of the guitar that you strum?",
                options: ["The strings", "The bridge", "The body", "The sound hole"],
                correct: "2",
                selected: ""
            },
            {
                question: "What is the name of the part of the guitar that you press down on to change the pitch of the strings?",
                options: ["The bridge", "The body", "The neck", "The sound hole"],
                correct: "2",
                selected: ""
            },
            {
                question: "What is the name of the part of the guitar that you use to change the pitch of the strings?",
                options: ["The bridge", "The body", "The sound hole", "The neck"],
                correct: "3",
                selected: ""
            }
        ]
}

const quizName = document.getElementById("quiz-name");
const quizCount = document.getElementById("quiz-count");
const quizQuestion = document.getElementById("quiz-question");
const nextBtn = document.getElementById("quiz-next-btn");
const prevBtn = document.getElementById("quiz-prev-btn");
const retryBtn = document.getElementById("quiz-retry-btn");
const quizWidget = document.getElementById("quiz-widget");
const resultWidget = document.getElementById("result-widget");

let currentQuestion = 0;
let quizCompleted = false;

quizName.innerText = quizSet.quizName;

function showQuestion(index) {
    quizCount.innerText = `${index + 1}/${quizSet.questions.length}`;
    quizQuestion.innerText = quizSet.questions[index].question;
    // get radio input in 'quiz-question' id
    let radioInputs = document.querySelectorAll('#quiz-options input[type="radio"]');
    for (let i = 0; i < radioInputs.length; i++) {
        // replace the label of radio with the options from the quizSet
        document.querySelectorAll('#quiz-options label')[i].innerText = quizSet.questions[index].options[i];
    }
}

function showResult() {
    quizWidget.classList.add("d-none");
    resultWidget.classList.remove("d-none");

    let scoreSymbolDiv = document.getElementById("score-symbol");
    let symbolColor = "";
    let totalQuestions = quizSet.questions.length;
    let totalScore = 0;
    // calculate total score
    for (let i = 0; i < totalQuestions; i++) {
        // compare the selected value with the correct value
        if (quizSet.questions[i].selected === quizSet.questions[i].correct) {
            totalScore++;
        }
    }
    // display score symbol
    for (let i = 0; i < totalQuestions; i++) {
        if (quizSet.questions[i].selected === quizSet.questions[i].correct) {
            symbolColor = "forestgreen";
        } else {
            symbolColor = "brown";
        }
        scoreSymbolDiv.innerHTML += `
        <div class="position-relative">
            <div class="position-absolute top-50 start-50 translate-middle text-white">${i + 1}</div>
            <svg class="shadow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="${symbolColor}" class="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
            </svg>
        </div>
        `;
    }
    // display score text
    let scoreDiv = document.getElementById("score-text");
    scoreDiv.insertAdjacentHTML("afterbegin", `<p class="lead">You scored <span id="quiz-score">${totalScore}</span> out of <span id="quiz-total">${quizSet.questions.length}</span></p>`);
}

// when radio input is changed, set selected value to the quizSet
document.querySelectorAll('#quiz-options input[type="radio"]').forEach((radioInput) => {
    radioInput.addEventListener("change", () => {
        // get value of selected radio input in 'quiz-question' id
        let selectedOption = document.querySelector('#quiz-options input[type="radio"]:checked');
        // keep the selected choice
        quizSet.questions[currentQuestion].selected = selectedOption.value;
    });
});

nextBtn.addEventListener("click", () => {
    // if current quizSet's selected value is empty, alert to select an option
    if (quizSet.questions[currentQuestion].selected === "") {
        alert("Please select an option");
        return;
    }
    // if it's the last question, change the button to 'Finish'
    if (currentQuestion === quizSet.questions.length - 2) {
        nextBtn.innerText = "Finish";
    }

    if (currentQuestion < quizSet.questions.length - 1) {
        currentQuestion++;
        // if the question is answered, set the radio input to the selected value
        let answered = quizSet.questions[currentQuestion].selected;
        if (answered !== "") {
            // get 'selected' value from quizSet and set select to the same value radio input
            document.querySelector(`#quiz-options input[value="${answered}"]`).checked = true;
        } else {
            // clear the selected radio input
            document.querySelector(`#quiz-options input[type="radio"]:checked`).checked = false;
        }
        showQuestion(currentQuestion);
    } else {
        quizCompleted = true;
        showResult();
    }
});

prevBtn.addEventListener("click", () => {
    // if it's not the last question, change the button to 'Next'
    if (currentQuestion === quizSet.questions.length - 1) {
        nextBtn.innerText = "Next";
    }
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        // get 'selected' value from quizSet and set select to the same value radio input
        let answered = quizSet.questions[currentQuestion].selected;
        document.querySelector(`#quiz-options input[value="${answered}"]`).checked = true;
    }
});

retryBtn.addEventListener("click", () => {
    quizWidget.classList.remove("d-none");
    resultWidget.classList.add("d-none");

    // reset the selected value
    for (let i = 0; i < quizSet.questions.length; i++) {
        quizSet.questions[i].selected = "";
    }

    currentQuestion = 0;
    quizCompleted = false;
    showQuestion(currentQuestion);
});

showQuestion(currentQuestion);