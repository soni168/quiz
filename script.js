document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const progressText = document.getElementById("progress"); 

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
  {
    question: "Mera lucky number kya hai?",
    choices: ["3", "5", "6", "9"],
    answer: "6",
  },
  {
    question: "Mujhe sabse zyada kaunsa season pasand hai?",
    choices: ["Summer", "Winter", "Rainy", "Spring"],
    answer: "Rainy",
  },
  {
    question: "Agar mujhe ek superpower milti toh main kya choose karti?",
    choices: ["Invisibility", "Flying", "Time travel", "Super strength"],
    answer: "Flying",
  },
  {
    question: "Main zyada introvert hoon ya extrovert?",
    choices: ["Introvert", "Extrovert", "Mix of both", "Depends on mood"],
    answer:"Depends on mood",
  },
  {
    question: "Mere best friend female kaun hai?",
    choices: ["shubu", "Jaanvi", "radhika", "palvi"],
    answer: "Jaanvi",
  },
  {
    question: "Mujhe apne friends ke birthdays yaad rehte hain ya nahi?",
    choices: ["Haan", "Nahi", "Kabhi kabhi", "Sirf close friends"],
    answer: "Haan",
  },
  {
    question: "Main apne dost se zyada calls pasand karti hoon ya chats?",
    choices: ["Calls", "Chats", "Both equal", "Depends on mood"],
    answer: "Calls",
  },
  {
    question: "Mujhe subah uthte hi sabse pehle kya karna pasand hai?",
    choices: ["Phone check karna", "Chai peena", "Music sunna", "Walk pe jana"],
    answer: "Chai peena",
  },
  {
    question: "Main tea lover hoon ya coffee lover?",
    choices: ["Tea", "Coffee", "Both", "None"],
    answer: "Tea",
  },
  {
    question: "Mere khane ka favourite time kaunsa hai?",
    choices: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    answer: "Snacks",
  },
  {
    question: "M konse bhgwan ko jyda manti hu?",
    choices: ["shiv ji", "kanha ji", "ram ji", "hanuman ji"],
    answer: "kanha ji",
  },
  {
    question: "Mera stress release ka tarika kya hai?",
    choices: ["Music", "Diary likhna", "Dance", "Cry karna"],
    answer: "Music",
  },
  {
    question: "Mujhe kaunsa subject bilkul pasand nahi hai?",
    choices: ["Maths", "English", "Science", "History"],
    answer: "Maths",
  },
  {
    question: "Mera favourite festival kaunsa hai?",
    choices: ["Holi", "Diwali", "Navratri", "Raksha Bandhan"],
    answer: "Holi",
  },
  {
    question: "Mujhe shopping karte waqt online pasand hai ya offline?",
    choices: ["Online", "Offline", "Both", "Mujhe shopping pasand hi nahi"],
    answer: "Both",
  },
  {
    question: "Mera favourite app kaunsa hai?",
    choices: ["Instagram", "Facebook", "WhatsApp", "Snapchat"],
    answer: "Whatsapp",
  },
  {
    question: "Mujhe sabse zyada photo khichwana pasand hai ya video banana?",
    choices: ["Photos", "Videos", "Both", "Kuch nahi"],
    answer: "Photos",
  },
];


  let currentQuestionIndex = 0;
  let score = 0;

  // Start Quiz
  startBtn.addEventListener("click", startQuiz);

  // Next Question
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  // Restart Quiz
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  //  Start Quiz Function
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  // Show Question
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

  // Select Answer
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

  // Show Result
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
