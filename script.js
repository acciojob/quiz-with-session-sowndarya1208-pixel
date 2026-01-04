// your JS code here.

// Quiz Questions
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

// DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load stored score
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Save progress
function saveProgress(index, answer) {
  userAnswers[index] = answer;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const div = document.createElement("div");
    div.textContent = q.question;

    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // RESTORE checked attribute (important for Cypress)
      if (userAnswers[i] === choice) {
        radio.setAttribute("checked", "true");
      }

      radio.addEventListener("click", function () {
        // Remove checked attribute from same question radios
        document
          .querySelectorAll(`input[name="question-${i}"]`)
          .forEach(r => r.removeAttribute("checked"));

        radio.setAttribute("checked", "true");
        saveProgress(i, choice);
      });

      div.appendChild(radio);
      div.appendChild(document.createTextNode(choice));
    }

    questionsElement.appendChild(div);
  }
}

// Submit quiz
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// Initial load
renderQuestions();
