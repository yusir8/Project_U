let menuMusic = document.getElementById("menuMusic");
let idleMusic = document.getElementById("idleMusic");
const start = document.getElementById("start");
const cursor = document.getElementById("customCursor");

// BG music idle & active
menuMusic.volume = 0.9;
idleMusic.volume = 0.9;

start.addEventListener("click", () => {
  menuMusic.play();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState == "hidden") {
    idleMusic.currentTime = menuMusic.currentTime;
    idleMusic.play();
    menuMusic.pause();
  } else {
    menuMusic.currentTime = idleMusic.currentTime;
    menuMusic.play();
    idleMusic.pause();
  }
});

// Custom cursors
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

//hover sound
const soundtrigger = document.querySelectorAll(".blank, .spc");
const hoverSFX = document.getElementById("hover-sound");
const clickSFX = document.getElementById("click-sound");
soundtrigger.forEach((el) => {
  el.addEventListener("mouseover", () => {
    hoverSFX.currentTime = 0;
    hoverSFX.play();
  });

  el.addEventListener("click", () => {
    clickSFX.currentTime = 0;
    clickSFX.play();
  });

  el.addEventListener("mouseleave", () => {
    hoverSFX.pause();
    hoverSFX.currentTime = 0;
  });
});

// clock
const time = document.getElementById("time");

function updatedDate() {
  let Newdate = new Date();

  let Hours = Newdate.getHours();
  let Minute = Newdate.getMinutes();

  Hours = Hours < 10 ? "0" + Hours : Hours;
  Minute = Minute < 10 ? "0" + Minute : Minute;

  time.textContent = `${Hours}:${Minute}`;
}

updatedDate();
setInterval(updatedDate, 1000);

// popup warning sign
