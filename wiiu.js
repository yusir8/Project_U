let menuMusic = document.getElementById("menuMusic");
let idleMusic = document.getElementById("idleMusic");
const cursor = document.getElementById("customCursor");

// popup warning sign
const modal = document.createElement("div");
modal.classList.add("modal");

const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");

const modalBody = document.createElement("div");
modalBody.classList.add("modal-body");

const h2 = document.createElement("h2");
h2.innerHTML = `Warning!`;

const span = document.createElement("span");
span.innerHTML = `Project U is still under development.<br />You may encounter bugs, missing features, visual issues or mistakes`;

const btnD = document.createElement("div");
btnD.classList.add("btn-d");

let btn = document.createElement("button");
btn.classList.add("btn");
btn.innerText = "OK";
btn.id = "start";

const small = document.createElement("small");
small.innerHTML = `If you'd like to help improve it, feedback and suggestions are always welcome.`;

document.body.appendChild(modal);
modal.appendChild(modalContent);
modalContent.appendChild(modalBody);
modalBody.appendChild(h2);
modalBody.appendChild(span);
modalBody.appendChild(btnD);
btnD.appendChild(btn);
modalBody.appendChild(small);

btn.addEventListener("click", () => {
  btn.disabled = true;
  modal.classList.remove("show");
  menuMusic.play();

  setTimeout(() => modal.remove(), 250);
});

setTimeout(() => {
  modal.classList.add("show");
}, 500);

// BG music idle & active
menuMusic.volume = 0.9;
idleMusic.volume = 0.9;

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

// Custom cursor
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

//hover sound
const soundtrigger = document.querySelectorAll(".blank, .spc, .btn");
const hoverSFX = document.getElementById("hover-sound");
const clickSFX = document.getElementById("click-sound");

soundtrigger.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    hoverSFX.currentTime = 0;
    hoverSFX.play();
  });

  el.addEventListener("click", () => {
    clickSFX.currentTime = 0;
    clickSFX.play();
  });

  el.addEventListener("mouseleave", () => {
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
