const questions = [
    {
        question: "What is the correct way to export a function in a JavaScript module?",
        choices: [
            "export function myFunction() { ... }", 
            "module.exports = myFunction() { ... }", 
            "exports myFunction { ... }", 
            "require(myFunction)"],
        correctAnswer: "export function myFunction() { ... }"
    },
    {
        question: "What is the correct syntax for importing multiple named exports from a module?",
        choices: [
            "import default { func1, func2 } from './myModule';",
            "import [ func1, func2 ] from './myModule';",
            "require { func1, func2 } from './myModule';",
            "import { func1, func2 } from './myModule';", 
            ],
        correctAnswer: "import { func1, func2 } from './myModule';"
    },
    {
        question: "How can you import everything from a module and access each export via a namespace?",
        choices: [
            "import * from './myModule';", 
            "import all from './myModule';",
            "import * as myModule from './myModule';", 
            "requireAll('./myModule');"],
        correctAnswer: "import * as myModule from './myModule';"
    }
];

let currentQuestionIndex = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const quizForm = document.getElementById('quiz-form');
const resultEl = document.getElementById('result');

function loadQuestion() {
    // Clear previous results and choices
    resultEl.textContent = '';
    choicesEl.innerHTML = '';

    // Load the current question
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    // Dynamically create radio buttons for each answer choice
    currentQuestion.choices.forEach((choice, index) => {
        const choiceLabel = document.createElement('label');
        const choiceInput = document.createElement('input');

        choiceInput.type = 'radio';
        choiceInput.name = 'answer';
        choiceInput.value = choice;
        choiceInput.id = `choice${index}`;

        choiceLabel.htmlFor = `choice${index}`;
        choiceLabel.textContent = choice;

        // Append radio button and label to choices container
        choicesEl.appendChild(choiceInput);
        choicesEl.appendChild(choiceLabel);
        choicesEl.appendChild(document.createElement('br')); // Add a line break
    });
}

function checkAnswer(event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page

    // Get the selected answer
    const selectedAnswer = quizForm.elements['answer'].value;

    // Check if the answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        resultEl.textContent = "Correct!";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(loadQuestion, 1000); // Load next question after 1 second
        } else {
            resultEl.textContent = "You've completed the quiz!";
            document.getElementById('submit-btn').disabled = true;
        }
    } else {
        resultEl.textContent = "Wrong! Try again.";
    }
}

// Add event listener for form submission
quizForm.addEventListener('submit', checkAnswer);

// Load the first question when the page loads
loadQuestion();
