const questions = [
  {
    question: "Which sentence uses the correct past perfect tense?",
    options: [
      "He has gone to the store before it closed.",
      "He had gone to the store before it closed.",
      "He gone to the store before it closed.",
      "He had go to the store before it closed.",
    ],
    answer: 1,
  },
  {
    question: "Identify the sentence written in the future continuous tense.",
    options: [
      "I will be reading a book at 8 PM.",
      "I read a book every evening.",
      "I was reading a book when you called.",
      "I have read that book already.",
    ],
    answer: 0,
  },
  {
    question:
      "Choose the correct form to complete the sentence: 'By the time she arrived, we ______ eating.'",
    options: ["had finished", "were finishing", "finish", "will finish"],
    answer: 0,
  },
  {
    question: "Which sentence uses the subjunctive mood correctly?",
    options: [
      "If he was here, he would help.",
      "If he were here, he would help.",
      "If he is here, he will help.",
      "If he will be here, he would help.",
    ],
    answer: 1,
  },
  {
    question: "Select the grammatically correct sentence.",
    options: [
      "She don't have no money left.",
      "She doesn’t have any money left.",
      "She doesn’t have no money left.",
      "She not have any money left.",
    ],
    answer: 1,
  },
  {
    question: "What is the correct past participle of 'shrink'?",
    options: ["shrank", "shrunk", "shrinked", "shrinks"],
    answer: 1,
  },
  {
    question: "Which sentence uses passive voice correctly?",
    options: [
      "The book was wrote by an unknown author.",
      "The book was written by an unknown author.",
      "The book wrote by an unknown author.",
      "The book is wrote by an unknown author.",
    ],
    answer: 1,
  },
  {
    question: "Choose the correct sentence using conditional type 3.",
    options: [
      "If I had studied harder, I would have passed the test.",
      "If I study harder, I will pass the test.",
      "If I studied harder, I would pass the test.",
      "If I had studied harder, I will pass the test.",
    ],
    answer: 0,
  },
  {
    question: "Which of the following contains an example of a gerund?",
    options: [
      "Running is a good form of exercise.",
      "He runs every morning.",
      "He has run three marathons.",
      "He ran to the store quickly.",
    ],
    answer: 0,
  },
  {
    question: "Identify the sentence with correct parallel structure.",
    options: [
      "She enjoys hiking, to swim, and cycling.",
      "She enjoys hiking, swimming, and cycling.",
      "She enjoys to hike, swimming, and to cycle.",
      "She enjoys hiking, swimming, and to cycle.",
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
