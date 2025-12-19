let menuMusic = document.getElementById("menuMusic");
let idleMusic = document.getElementById("idleMusic");
const cursor = document.getElementById("customCursor");

// popup warning sign
const div = document.createElement("div");
div.classList.add("warning");
div.id = "exist";

const imgBG = document.createElement("img");
imgBG.src =
  "image/Gemini_Generated_Image_jlp9oljlp9oljlp9-removebg-preview.png";
imgBG.classList.add("warning-bg");

const h1 = document.createElement("h1");
h1.innerText = "Warning!";

const h4AFF = document.createElement("h4");
h4AFF.classList.add("aff");
h4AFF.innerText = "This site isn't affiliated with Nintendo!";

const h4 = document.createElement("h4");
h4.innerHTML = `This site is indev.<br>There are missing features, bugs and mistakes.`;

let btn = document.createElement("button");
btn.classList.add("OK-btn");
btn.innerText = "OK";
btn.id = "start";

btn.addEventListener("click", () => {
  div.classList.remove("show");

  menuMusic.play();

  setTimeout(() => {
    div.remove();
  }, 50);
});

div.appendChild(h1);
div.appendChild(h4AFF);
div.appendChild(h4);
div.appendChild(btn);
div.appendChild(imgBG);
document.body.appendChild(div);

setTimeout(() => {
  div.classList.add("show");
}, 50);

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
const soundtrigger = document.querySelectorAll(".blank, .spc, .OK-btn");
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
