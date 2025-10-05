const studySection = document.getElementById("study-section");
const quizSection = document.getElementById("quiz-section");
const startQuizBtn = document.getElementById("start-quiz-btn");
const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const timerDisplay = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let questions = [];
let timer;
let timeLeft = 180; // 3 minutes

const allQuestions = [
  {
    q: "Where should you write your news articles?",
    a: ["Separate Google Docs", "The shared Google Doc", "Trello comments"],
    correct: 1,
  },
  {
    q: "What should you never do with the document history?",
    a: ["Review it", "Edit it carefully", "Erase it"],
    correct: 2,
  },
  {
    q: "What should you check regularly on Discord?",
    a: ["#announcements", "#general", "#off-topic"],
    correct: 0,
  },
  {
    q: "What happens if you leak private information?",
    a: ["Warning", "Termination", "Nothing"],
    correct: 1,
  },
  { q: "How many warnings lead to a kick?", a: ["1", "2", "3"], correct: 2 },
  {
    q: "Where do you claim your weekly news task?",
    a: ["Trello", "Google Docs", "Discord"],
    correct: 0,
  },
  {
    q: "Who manages job assignments?",
    a: ["Application Manager", "Trello Manager", "Veteran Journalist"],
    correct: 1,
  },
  {
    q: "What should you do if you can’t complete a task?",
    a: ["Ignore it", "Complain", "Tell another Journalist"],
    correct: 2,
  },
  { q: "Should you collaborate with others?", a: ["Yes", "No"], correct: 0 },
  {
    q: "What’s the correct way to sign off your article?",
    a: ["Your Discord name", "News by @username", "Anonymous"],
    correct: 1,
  },
  { q: "How many total warnings can you get?", a: ["2", "3", "4"], correct: 1 },
  {
    q: "Who should you contact if you find an error?",
    a: ["Manager", "Random member", "Yourself"],
    correct: 0,
  },
];

// Shuffle questions each time
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

startQuizBtn.addEventListener("click", () => {
  studySection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  questions = shuffle([...allQuestions]);
  startTimer();
  showQuestion();
});

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }

  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${q.q}</h3>
    <div class="answers">
      ${q.a
        .map(
          (opt, i) => `
        <button class="btn answer" data-index="${i}">${opt}</button>
      `
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll(".answer").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(btn));
  });
}

function handleAnswer(btn) {
  const selected = parseInt(btn.dataset.index);
  if (selected === questions[currentQuestion].correct) {
    score++;
    btn.style.background = "#4CAF50";
  } else {
    btn.style.background = "#e74c3c";
  }

  document.querySelectorAll(".answer").forEach((b) => (b.disabled = true));

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.classList.add("hidden");
  showQuestion();
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz(true);
    }
  }, 1000);
}

function endQuiz(timeExpired = false) {
  clearInterval(timer);
  quizContainer.innerHTML = "";
  nextBtn.classList.add("hidden");
  const failed = score < 9 || timeExpired; // must get at least 9/12

  result.classList.remove("hidden");
  result.innerHTML = failed
    ? `<h3>❌ You didn't pass. Try again!</h3><p>You got ${score}/12 correct.</p><button class="btn" onclick="location.reload()">Retry</button>`
    : `<h3>✅ Congratulations!</h3><p>You passed with ${score}/12 correct!</p>`;
}
