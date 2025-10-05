// --- Hero Image ---
function setRandomHero() {
  const hero = document.getElementById("heroImage");

  const width = 1200;
  const height = 400;
  const randomId = Math.floor(Math.random() * 1000); // Random image ID
  hero.src = `https://picsum.photos/id/${randomId}/${width}/${height}`;
  hero.alt = `Random Image ID: ${randomId}`;
}

setInterval(setRandomHero, 10000); // Change image every 10 seconds
setRandomHero();

// --- Progress Tracker ---
let progress = JSON.parse(localStorage.getItem("lt2fgProgress")) || {
  writing: false,
  interviewing: false,
  ethics: false,
};

function updateProgress() {
  const total = Object.keys(progress).length;
  const done = Object.values(progress).filter(Boolean).length;
  const percent = Math.floor((done / total) * 100);

  document.getElementById("progressFill").style.width = percent + "%";
  document.getElementById("progressText").innerText = `${percent}% completed`;

  const badgeMap = {
    writing: "badgeWriting",
    interviewing: "badgeInterview",
    ethics: "badgeEthics",
  };
  for (let key in badgeMap) {
    document
      .getElementById(badgeMap[key])
      .classList.toggle("active", progress[key]);
  }

  localStorage.setItem("lt2fgProgress", JSON.stringify(progress));
}
updateProgress();

// --- Modules ---
function openModule(topic) {
  const content = document.getElementById("moduleContent");
  let html = "";

  switch (topic) {
    case "googleDocs":
      html = `<h3>📄 Google Docs Rules</h3>
      <ul>
        <li>Do the news in the Google Doc itself. (***)(1)</li>
        <li>No separate docs. (***)(2)</li>
        <li>Start with most important info. (***)(1)</li>
        <li>Check grammar; use Grammarly or ask a member. (***)(1)</li>
        <li>Never start a sentence with "Because". Capitalize "I". (***)(1)</li>
        <li>Include yourself at the end: "News by @x". (***)(1)</li>
        <li>Multiple people can collaborate. Do not erase history. (***)(2)</li>
        <li>Suggestions go in #suggestions Discord. (*)(1)</li>
      </ul>`;
      progress.writing = true;
      break;

    case "discord":
      html = `<h3>💬 Discord Guidelines</h3>
      <ul>
        <li>Check #announcements regularly.</li>
        <li>Do not share private channels outside the group.</li>
        <li>Use /birthday show-nearest in #bot-commands.</li>
        <li>Do not harass anyone; follow Roblox & Discord ToS.</li>
        <li>Update other journalists on your tasks via Trello Outline.</li>
        <li>Inform managers if away; three warnings = kicked.</li>
      </ul>`;
      progress.writing = true;
      break;

    case "trello":
      html = `<h3>📋 Trello Procedures</h3>
      <ul>
        <li>Claim a card for the Lumber News week.</li>
        <li>Comment on the card with date/time/timezone.</li>
        <li>Do not take someone else's job unless permitted.</li>
        <li>Log interviews there as well.</li>
        <li>Check your card for number of articles and interviews.</li>
      </ul>`;
      progress.writing = true;
      break;

    case "roles":
      html = `<h3>👥 Roles & Ranks</h3>
      <ul>
        <li>@Lumber News Manager - manages the team.</li>
        <li>@Assistant Manager - second in command.</li>
        <li>@Trello Manager - assigns jobs on Trello.</li>
        <li>@Application Manager - manages applications.</li>
        <li>@Veteran Journalist - highly experienced.</li>
        <li>@Senior Journalist - go-to for questions.</li>
        <li>@Experience Journalist - significant experience.</li>
        <li>@Journalist - active contributor.</li>
        <li>@Junior Journalist - new but proven.</li>
        <li>@Trainee Journalist - beginners learning basics.</li>
        <li>@Retired Lumber Journalist - retired but experienced.</li>
        <li>@Lumber Tycoon Two Lumber Journalist - general announcements.</li>
      </ul>`;
      progress.writing = true;
      break;

    case "warnings":
      html = `<h3>⚠️ Warnings System</h3>
      <p>Three-warning system applies if rules are broken. Notify managers ahead of time if unavailable. Personal matters can remain private.</p>`;
      break;

    case "interviews":
      html = `<h3>🎤 Interview Guidelines</h3>
      <ul>
        <li>How did you find out about Lumber Tycoon 2?</li>
        <li>What got you into being an artist/builder?</li>
        <li>What's your favorite memory of Lumber Tycoon 2?</li>
        <li>How long have you been playing Lumber Tycoon 2?</li>
        <li>What's the funniest moment?</li>
      </ul>
      <p>Log all Q&A in Google Docs. Do not interview bad Lumberjacks.</p>`;
      progress.interviewing = true;
      break;

    default:
      html = "<p>Select a module to view its contents.</p>";
  }

  content.innerHTML = html;
  updateProgress();
}

// --- Quiz ---
const quizQuestions = [
  {
    question: "Where should you write Lumber News articles?",
    options: [
      "Personal doc",
      "Group Google Doc",
      "Discord only",
      "Trello cards",
    ],
    answer: 1,
  },
  {
    question: "Which action is NOT allowed on Discord?",
    options: [
      "Check #announcements",
      "Use /birthday show-nearest",
      "Share private channels",
      "Update journalists on tasks",
    ],
    answer: 2,
  },
  {
    question: "Who can override manager decisions?",
    options: [
      "Assistant Manager",
      "Trainee Journalist",
      "Junior Journalist",
      "Veteran Journalist",
    ],
    answer: 0,
  },
  {
    question: "What should you do if you can’t complete a task?",
    options: [
      "Ignore it",
      "Let another journalist take over",
      "Delete task",
      "Complain",
    ],
    answer: 1,
  },
  {
    question: "Correct way to interview?",
    options: [
      "Yes/no only",
      "Ask open-ended and log answers",
      "Harass them",
      "Skip logging",
    ],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const quizArea = document.getElementById("quizArea");
  const quizResult = document.getElementById("quizResult");
  quizResult.innerHTML = "";

  if (currentQuestion >= quizQuestions.length) {
    quizArea.innerHTML = `<h3>Quiz Completed!</h3><p>You scored ${score} out of ${quizQuestions.length}</p>`;
    progress.ethics = true;
    updateProgress();
    return;
  }

  const q = quizQuestions[currentQuestion];
  let optionsHtml = "";
  q.options.forEach((opt, i) => {
    optionsHtml += `<button onclick="checkAnswer(${i})">${opt}</button>`;
  });

  quizArea.innerHTML = `<h3>Question ${currentQuestion + 1}</h3><p>${
    q.question
  }</p>${optionsHtml}`;
}

function checkAnswer(selected) {
  const q = quizQuestions[currentQuestion];
  const quizResult = document.getElementById("quizResult");

  if (selected === q.answer) {
    score++;
    quizResult.innerHTML = "<p style='color:green'>Correct ✅</p>";
  } else {
    quizResult.innerHTML = `<p style='color:red'>Wrong ❌ Correct answer: ${
      q.options[q.answer]
    }</p>`;
  }

  currentQuestion++;
  setTimeout(showQuestion, 1000);
}
