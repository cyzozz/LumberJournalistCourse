const quizData = [
  {
    q: "What does a Lumber Journalist primarily do?",
    a: "Report group events and updates",
    options: [
      "Build bases",
      "Sell wood",
      "Report group events and updates",
      "Trade axes",
    ],
  },
  {
    q: "Who should you verify information with before publishing?",
    a: "A senior journalist or group leader",
    options: [
      "Random players",
      "Builders",
      "A senior journalist or group leader",
      "No one",
    ],
  },
  {
    q: "Which tone should journalists use?",
    a: "Neutral and professional",
    options: [
      "Sarcastic",
      "Neutral and professional",
      "Aggressive",
      "Emotional",
    ],
  },
  {
    q: "When should you post breaking news?",
    a: "After confirming accuracy",
    options: [
      "Immediately",
      "After confirming accuracy",
      "Whenever",
      "After others post it",
    ],
  },
  {
    q: "What’s important in a headline?",
    a: "Clarity and accuracy",
    options: ["Clickbait", "Clarity and accuracy", "Exaggeration", "Mystery"],
  },
  {
    q: "How should you handle a typo after posting?",
    a: "Correct it and note the edit",
    options: [
      "Ignore it",
      "Delete the post",
      "Correct it and note the edit",
      "Blame others",
    ],
  },
  {
    q: "What should every report include?",
    a: "Source and date",
    options: ["Memes", "Source and date", "Opinions", "Speculations"],
  },
  {
    q: "How often should you report group events?",
    a: "Whenever significant updates happen",
    options: [
      "Every day",
      "Whenever significant updates happen",
      "Once per week",
      "Only if told to",
    ],
  },
  {
    q: "What’s the role of objectivity?",
    a: "Preventing bias in articles",
    options: [
      "Showing emotion",
      "Preventing bias in articles",
      "Adding opinions",
      "Choosing sides",
    ],
  },
  {
    q: "What should a journalist do before posting a photo?",
    a: "Check it’s appropriate and relevant",
    options: [
      "Just post it",
      "Ask randoms",
      "Check it’s appropriate and relevant",
      "Ignore it",
    ],
  },
  {
    q: "Who represents the LT2FG group publicly?",
    a: "All journalists",
    options: ["Just the owner", "All journalists", "Builders", "Mods only"],
  },
  {
    q: "What happens if a journalist fails to meet standards?",
    a: "They may retake training or be suspended",
    options: [
      "Nothing",
      "Instant ban",
      "They may retake training or be suspended",
      "Lose money",
    ],
  },
];

let current = 0;
let score = 0;
let mistakes = 0;

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
  const q = quizData[current];
  quizContainer.innerHTML = `
    <h2>${current + 1}. ${q.q}</h2>
    ${q.options
      .map(
        (opt) =>
          `<div class='quiz-option' onclick='selectAnswer("${opt}")'>${opt}</div>`
      )
      .join("")}
  `;
}

function selectAnswer(selected) {
  const correct = quizData[current].a;
  if (selected === correct) {
    score++;
  } else {
    mistakes++;
  }

  current++;
  if (mistakes >= 3) {
    alert("❌ You failed the quiz. You can retry!");
    location.reload();
    return;
  }

  if (current < quizData.length) {
    loadQuestion();
  } else {
    quizContainer.innerHTML = `<h2>✅ Test Complete!</h2>
    <p>You got ${score} out of ${quizData.length} correct.</p>
    <a href="index.html" class="button">Return Home</a>`;
    nextBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", () => {
  if (current < quizData.length) loadQuestion();
});

loadQuestion();
