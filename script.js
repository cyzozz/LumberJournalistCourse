// Change hero background image randomly
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-banner");
  const randomImage = `https://picsum.photos/1600/600?random=${Math.floor(
    Math.random() * 1000
  )}`;
  hero.style.backgroundImage = `url('${randomImage}')`;
});

function scrollToModules() {
  document.getElementById("modules").scrollIntoView({ behavior: "smooth" });
}

// Simple content loader
const moduleData = {
  googleDocs: `
    <h3>Google Docs Rules</h3>
    <p>Do news in the group document. Keep spacing consistent and always start with the most important part of your article.</p>
    <ul>
      <li>Use Grammarly or ask a colleague to check grammar.</li>
      <li>Do not erase history or use separate docs.</li>
      <li>Include your name at the end (News by @username).</li>
    </ul>
  `,
  discord: `
    <h3>Discord Guidelines</h3>
    <p>Always check <strong>#announcements</strong> for updates. Never share private channels or confidential info outside the team.</p>
    <ul>
      <li>Use /birthday show-nearest for birthdays.</li>
      <li>Follow Roblox and Discord ToS.</li>
      <li>Update others about your progress regularly.</li>
    </ul>
  `,
  trello: `
    <h3>Trello Procedures</h3>
    <p>Use Trello to claim cards, track interviews, and report weekly progress.</p>
    <ul>
      <li>Comment when you take a task and include time and timezone.</li>
      <li>Do not take others’ cards without permission.</li>
      <li>Read and follow the Trello Card instructions carefully.</li>
    </ul>
  `,
  roles: `
    <h3>Roles & Responsibilities</h3>
    <p>Every rank has a purpose in Lumber News. Respect hierarchy and collaborate professionally.</p>
    <ul>
      <li><strong>Manager</strong> – Oversees all Journalist activity.</li>
      <li><strong>Assistant Manager</strong> – Handles coordination and issues.</li>
      <li><strong>Veteran Journalist</strong> – Trusted members with years of contribution.</li>
    </ul>
  `,
  interviews: `
    <h3>Interview Guidelines</h3>
    <p>Prepare questions, stay professional, and never interview banned players.</p>
    <ul>
      <li>Ask questions like “How did you discover LT2?” or “Favorite moment?”</li>
      <li>Log all responses in Google Docs.</li>
      <li>Keep tone respectful and neutral.</li>
    </ul>
  `,
};

function openModule(module) {
  const content = document.getElementById("moduleContent");
  content.innerHTML = moduleData[module] || "<p>Module not found.</p>";
  content.classList.add("active");
  content.scrollIntoView({ behavior: "smooth" });
}
