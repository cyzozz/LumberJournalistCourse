const quizData = [
  // (same questions as before)
  {
    q: "Where should you write your news articles?",
    a: "The shared Google Doc",
    options: [
      "Your own private Google Doc for drafts",
      "The shared Google Doc",
      "A Discord message in #lumber-news",
      "A personal notebook",
    ],
  },
  {
    q: "What should you never do with the Google Doc history?",
    a: "Erase previous history",
    options: [
      "Make minor edits without noting them",
      "Erase previous history",
      "Move sections to a new document",
      "Duplicate content in another doc",
    ],
  },
  {
    q: "Which channel should you check for updates and mentions?",
    a: "#announcements",
    options: [
      "#general for discussions",
      "#announcements",
      "#lumber-news for news only",
      "#vc_text for voice updates",
    ],
  },
  {
    q: "What happens if you share private channels info outside the group?",
    a: "You can be instantly terminated",
    options: [
      "You can be instantly terminated",
      "You may receive a warning first",
      "Nothing if it seems harmless",
      "You could get a note from a manager",
    ],
  },
  {
    q: "How many warnings lead to being kicked from Lumber News?",
    a: "3",
    options: ["1", "2", "3", "4"],
  },
  {
    q: "Who manages job assignments on Trello?",
    a: "Trello Manager",
    options: [
      "Assistant Manager",
      "Trello Manager",
      "Application Manager",
      "Veteran Journalist",
    ],
  },
  {
    q: "Which rule applies to multiple people collaborating in Google Docs?",
    a: "Do not exclude others",
    options: [
      "Do not exclude others",
      "Focus only on your section",
      "Edit only after approval",
      "Merge all content at the end",
    ],
  },
  {
    q: "How should you sign off your articles?",
    a: "News by @username",
    options: [
      "News by @username",
      "By the team",
      "Anonymous for safety",
      "Initials only",
    ],
  },
  {
    q: "Which Discord command shows upcoming birthdays?",
    a: "/birthday show-nearest",
    options: [
      "/birthday show-nearest",
      "/birthday list",
      "/next-birthday",
      "/birthday upcoming",
    ],
  },
  {
    q: "Which rank is given to new Lumber Journalists learning the basics?",
    a: "Trainee Journalist",
    options: [
      "Trainee Journalist",
      "Junior Journalist",
      "Experience Journalist",
      "Senior Journalist",
    ],
  },
  {
    q: "What should you do if you can’t complete a task?",
    a: "Have another Journalist take over",
    options: [
      "Have another Journalist take over",
      "Post an update and continue later",
      "Wait until someone notices",
      "Ask a manager to assign it randomly",
    ],
  },
  {
    q: "Who is allowed to change ranks, points, and answer values on Trello?",
    a: "Only Managers",
    options: [
      "Only Managers",
      "Any Journalist",
      "Veteran Journalists",
      "Assistant Managers and above",
    ],
  },
];

// shuffle questions
const questions = quizData.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;
let mistakes = 0;
const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  const q = questions[current];
  quizContainer.innerHTML = `
    <h2>${current + 1}. ${q.q}</h2>
    <div class="options">
      ${q.options
        .map(
          (opt) => `<div class='quiz-option' data-answer="${opt}">${opt}</div>`
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll(".quiz-option").forEach((option) => {
    option.addEventListener("click", () => selectAnswer(option));
  });
}

function selectAnswer(optionEl) {
  const selected = optionEl.getAttribute("data-answer");
  const correct = questions[current].a;

  // disable further clicks
  document.querySelectorAll(".quiz-option").forEach((opt) => {
    opt.style.pointerEvents = "none";
    if (opt.getAttribute("data-answer") === correct) {
      opt.style.background = "#b6e2a1"; // green
    } else if (opt === optionEl) {
      opt.style.background = "#f5a3a3"; // red
    }
  });

  if (selected === correct) score++;
  else mistakes++;

  current++;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (mistakes >= 3) {
    quizContainer.innerHTML = `
      <h2>❌ You failed the test.</h2>
      <p>You made 3 mistakes. Try again!</p>
      <a href="quiz.html" class="button">Retry</a>
    `;
    nextBtn.style.display = "none";
    return;
  }

  if (current < questions.length) {
    loadQuestion();
    nextBtn.disabled = true;
  } else {
    quizContainer.innerHTML = `
      <h2>✅ Test Complete!</h2>
      <p>You got ${score} out of ${questions.length} correct.</p>
      <a href="index.html" class="button">Return Home</a>
    `;
    nextBtn.style.display = "none";
  }
});

nextBtn.disabled = true;
loadQuestion();
