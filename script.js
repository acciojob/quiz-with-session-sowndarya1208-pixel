// your JS code here.

// Quiz Questions (DO NOT MODIFY FOR TESTS)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// DOM Elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load saved score from localStorage (if exists)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Save answer to sessionStorage
function saveProgress(questionIndex, answer) {
  userAnswers[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const questionDiv = document.createElement("div");
    questionDiv.textContent = question.question;

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore checked option after refresh
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // Save progress when option is selected
      radio.addEventListener("change", function () {
        saveProgress(i, choice);
      });

      const labelText = document.createTextNode(choice);

      questionDiv.appendChild(radio);
      questionDiv.appendChild(labelText);
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Submit quiz and calculate score
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();
