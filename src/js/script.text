const questions = [
  {
    question: "What is the past tense of 'go'?",
    options: ["goed", "went", "gone", "go"],
    answer: 1,
  },
  {
    question: "Which is a synonym for 'happy'?",
    options: ["sad", "joyful", "angry", "tired"],
    answer: 1,
  },
  {
    question: "What is the plural form of 'child'?",
    options: ["childs", "children", "childes", "child"],
    answer: 1,
  },
  {
    question: "Which word is a noun?",
    options: ["run", "blue", "cat", "quickly"],
    answer: 2,
  },
  {
    question: "What is the opposite of 'cold'?",
    options: ["hot", "warm", "cool", "freeze"],
    answer: 0,
  },
  {
    question: "Which is an adjective?",
    options: ["quick", "run", "happily", "cat"],
    answer: 0,
  },
  {
    question: "What is the past tense of 'eat'?",
    options: ["eated", "ate", "eaten", "eat"],
    answer: 1,
  },
  {
    question: "What is the synonym of 'small'?",
    options: ["big", "tiny", "large", "huge"],
    answer: 1,
  },
  {
    question: "What is the antonym of 'fast'?",
    options: ["quick", "speedy", "slow", "rapid"],
    answer: 2,
  },
  {
    question: "Which is a verb?",
    options: ["run", "blue", "happy", "tall"],
    answer: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const questionContainer = document.getElementById("question-container");
const countdownElement = document.getElementById("countdown");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.classList.remove("fade-out");
  questionContainer.classList.add("fade-in");

  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = "";
  nextButton.style.display = "none";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  startCountdown();
}

function startCountdown() {
  let timeLeft = 10;
  countdownElement.textContent = timeLeft;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackElement.textContent =
        "Time's up! The correct answer is \"" +
        questions[currentQuestionIndex].options[
          questions[currentQuestionIndex].answer
        ] +
        '".';
      nextButton.style.display = "inline-block";
    }
  }, 1000);
}

function selectOption(selectedIndex) {
  clearInterval(timer);

  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === currentQuestion.answer) {
    score += 10;
    feedbackElement.textContent = "Correct! Well done.";
  } else {
    feedbackElement.textContent = `Wrong! The correct answer is "${
      currentQuestion.options[currentQuestion.answer]
    }".`;
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  questionContainer.classList.remove("fade-in");
  questionContainer.classList.add("fade-out");

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 500);
});

function showResults() {
  questionElement.textContent = "Quiz Complete!";
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = `Your score: ${score}/100`;
  countdownElement.style.display = "none";
  nextButton.style.display = "none";

  const message =
    score >= 80
      ? "Excellent! Keep up the great work! 🌟"
      : score >= 50
      ? "Good job! Keep practicing and you'll get even better! 👍"
      : "Don't worry! Keep learning and never give up! 💪";
  feedbackElement.textContent += `\n${message}`;
}

// Load soal pertama
loadQuestion();
