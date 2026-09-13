const weddingDate = new Date("2026-03-07T18:00:00+05:30");
const countdown = document.querySelector("#countdown");
const music = document.querySelector("#wedding-music");
const musicButton = document.querySelector(".music-button");
const musicState = document.querySelector(".music-state");

function updateCountdown() {
  const diff = weddingDate.getTime() - Date.now();

  if (diff <= 0) {
    countdown.textContent = "00:00:00:00";
    return;
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  countdown.textContent = [days, hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function setMusicLabel() {
  musicState.textContent = music.paused ? "Play" : "Pause";
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
  } else {
    music.pause();
  }

  setMusicLabel();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
updateCountdown();
setInterval(updateCountdown, 1000);
