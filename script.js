
const surpriseBox = document.getElementById("surpriseBox");
const roseRain = document.getElementById("roseRain");

const compliments = [
  "You make ordinary days feel magical. Never forget that! 💗",
  "Your smile is more beautiful than a thousand roses. 🌹",
  "You are strong, lovely, and capable of amazing things. ✨",
  "The world is lucky to have someone as wonderful as you! 🦋",
  "Official reminder: you are absolutely amazing, sis! 👑",
  "If happiness had a face, it would look a little like yours. 😊"
];

const hugs = [
  "Sending you the biggest virtual hug ever! 🫂💖",
  "Imagine a thousand warm hugs coming your way! 🤗",
  "Whatever happens today, remember you're never short of love. 💕"
];

document.getElementById("complimentBtn").addEventListener("click", () => {
  const message =
    compliments[Math.floor(Math.random() * compliments.length)];

  surpriseBox.textContent = message;
  surpriseBox.animate(
    [{ transform: "scale(0.96)" }, { transform: "scale(1)" }],
    { duration: 300 }
  );
});

document.getElementById("hugBtn").addEventListener("click", () => {
  const message = hugs[Math.floor(Math.random() * hugs.length)];
  surpriseBox.textContent = message;
  makeHearts();
});

document.getElementById("roseBtn").addEventListener("click", () => {
  surpriseBox.textContent =
    "A little shower of roses, just for you! 🌹💗🌹";

  for (let i = 0; i < 24; i++) {
    const rose = document.createElement("span");
    rose.className = "rain-rose";
    rose.textContent = ["🌹", "🌸", "💗", "🌷"][
      Math.floor(Math.random() * 4)
    ];

    rose.style.left = Math.random() * 100 + "%";
    rose.style.animationDelay = Math.random() * 1.5 + "s";
    rose.style.animationDuration = 2.5 + Math.random() * 2 + "s";

    roseRain.appendChild(rose);
    rose.addEventListener("animationend", () => rose.remove());
  }
});

function makeHearts() {
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");
    heart.className = "rain-rose";
    heart.textContent = "💗";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 0.8 + "s";

    roseRain.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

document.getElementById("secretBtn").addEventListener("click", () => {
  const message = document.getElementById("secretMessage");
  message.hidden = !message.hidden;

  document.getElementById("secretBtn").textContent =
    message.hidden
      ? "Read my secret message 💌"
      : "Hide my secret message 💗";
});

// Gentle decorative falling petals
const petals = document.getElementById("petals");

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > 0.5 ? "🌸" : "💗";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.opacity = 0.2 + Math.random() * 0.35;
  petal.style.fontSize = 10 + Math.random() * 12 + "px";
  petal.style.animationDuration = 7 + Math.random() * 7 + "s";

  petals.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(createPetal, 1300);
}
// A special teddy surprise just for Nakshaa
const teddyBtn = document.getElementById("teddyBtn");

if (teddyBtn) {
  teddyBtn.addEventListener("click", () => {
    surpriseBox.innerHTML =
      "🧸💗 A big teddy hug for Nakshaa! 💗🧸<br>" +
      "एक गोड मिठी तुझ्यासाठी, Nakshaa! 🌹<br>" +
      "You are loved, you are special, and you deserve all the hugs!";

    makeHearts();
  });
}