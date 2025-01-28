const questions = [
  {
    question: "Which of the following is a countable noun?",
    options: ["Water", "Sugar", "Apple", "Air"],
    answer: 2,
  },
  {
    question: "What is the comparative form of 'good'?",
    options: ["Gooder", "Better", "Best", "More good"],
    answer: 1,
  },
  {
    question: "Choose the correct passive form: 'She writes a letter.'",
    options: [
      "A letter is written by her.",
      "A letter wrote by her.",
      "A letter writes by her.",
      "A letter was written by her.",
    ],
    answer: 0,
  },
  {
    question: "Which sentence is in the present perfect tense?",
    options: [
      "She goes to school every day.",
      "She went to school.",
      "She has gone to school.",
      "She is going to school.",
    ],
    answer: 2,
  },
  {
    question:
      "What is the correct order of adjectives in this sentence? 'She bought a ___ dress.'",
    options: [
      "red beautiful long",
      "long red beautiful",
      "beautiful long red",
      "beautiful red long",
    ],
    answer: 2,
  },
  {
    question: "Which word is an adverb?",
    options: ["Quickly", "Happy", "Beautiful", "Strong"],
    answer: 0,
  },
  {
    question: "Which of the following sentences uses a conditional clause?",
    options: [
      "She is reading a book.",
      "If it rains, we will stay inside.",
      "I like pizza.",
      "He went to the market.",
    ],
    answer: 1,
  },
  {
    question: "Choose the correct indirect speech: 'He said, \"I am happy.\"'",
    options: [
      "He said he was happy.",
      "He said he is happy.",
      "He said he has been happy.",
      "He said he had happy.",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is a gerund?",
    options: ["Running", "Run", "Ran", "Runs"],
    answer: 0,
  },
  {
    question: "Which sentence is in the future continuous tense?",
    options: [
      "She will eat lunch.",
      "She will be eating lunch.",
      "She is eating lunch.",
      "She eats lunch.",
    ],
    answer: 1,
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

  const backButton = document.createElement("button");
  backButton.textContent = "Back to Homepage";
  backButton.classList.add("back-button");
  backButton.addEventListener("click", () => {
    window.location.href = "../index.html"; // Ganti "index.html" dengan halaman utama Anda
  });
  optionsContainer.appendChild(backButton); // Menampilkan tombol "Back" di bawah hasil
}

// Load soal pertama
loadQuestion();
