document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const progressText = document.getElementById("progress"); // 👈 make sure you add <p id="progress"></p> in HTML

  const questions = [
    {
      question: "Which is my most favourite all time chocolate?",
      choices: ["Dairymilk Oreo", "Kitkat", "Lotochoco pie", "Milkbar"],
      answer: "Lotochoco pie",
    },
    {
      question: "Which flower I like the most?",
      choices: ["Rose", "Sunflower", "Marigold", "Lily"],
      answer: "Sunflower",
    },
    {
      question: "What I love the most to do?",
      choices: ["music", "chocolate", "dance", "drawing"],
      answer: "music",
    },
    {
      question: "Whom I talk when I am genuinely sad?",
      choices: ["chatgpt", "diary(paper)", "janvi", "mynotes"],
      answer: "diary(paper)",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  // 🎬 Start Quiz
  startBtn.addEventListener("click", startQuiz);

  // ⏭ Next Question
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  // 🔄 Restart Quiz
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  // ▶️ Start Quiz Function
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  // ❓ Show Question
  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    choicesList.innerHTML = ""; // clear previous choices
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(choice));
      choicesList.appendChild(li);
    });
  }

  // ✅ Select Answer
  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const allChoices = choicesList.querySelectorAll("li");

    allChoices.forEach((li) => {
      li.style.pointerEvents = "none"; // disable further clicks
      if (li.textContent === correctAnswer) {
        li.style.backgroundColor = "green"; // correct
        li.style.color = "white";
      } else if (li.textContent === choice) {
        li.style.backgroundColor = "red"; // incorrect selected
        li.style.color = "white";
      }
    });

    if (choice === correctAnswer) {
      score++;
    }
    nextBtn.classList.remove("hidden");
  }

  // 🏆 Show Result
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;

    // Save best score
    const bestScore = localStorage.getItem("bestScore") || 0;
    if (score > bestScore) {
      localStorage.setItem("bestScore", score);
    }
  }
});
