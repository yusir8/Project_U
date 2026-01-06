let menuMusic = document.getElementById("menuMusic");
let idleMusic = document.getElementById("idleMusic");
const cursor = document.getElementById("customCursor");

// Modal engine
const modal = document.getElementById("modal");
const modalHeader = document.getElementById("modalHeader");
const modalBody = document.getElementById("modalBody");

function openModal({ title = "", body = "", closable = true }) {
  modalHeader.innerHTML = `
    <span class="title">${title}</span>
    ${closable ? `<button class="close" id="closesound"></button>` : ""}
  `;

  modalBody.innerHTML = body;
  modal.classList.add("show");

  if (closable) {
    const closeBtn = document.getElementById("closesound");
    const cancelSFX = document.getElementById("cancel-sound");

    closeBtn.addEventListener("click", () => {
      cancelSFX.currentTime = 0;
      cancelSFX.play();
      closeModal();
    });
  }
}

function closeModal() {
  modal.classList.remove("show");
}

// Setting
let setting = document.getElementById("setting");

setting.addEventListener("click", () => {
  openModal({
    title: "Settings",
    closable: true,
    body: `
    <span>Sorry! Setting isn't implemented yet!</span>
    `,
  });
});

// popup warning sign
const NOTICE_VERSION = "2"; // bump this whenever you change notice

const userNoticeVersion = localStorage.getItem("noticeVersion");

if (userNoticeVersion !== NOTICE_VERSION) {
  openModal({
    title: "Notice",
    closable: false,
    body: ` <span>
    Welcome to Project U!
    <br>
    <br>
    Project U still under development
    <br>
    You may encounter bugs, missing features, visual issues or mistakes.
    <br>
    Other than that enjoy!
    
    </span>
        <small>
      Give feedback and suggestions! <br> It will help make future versions easier to use.
    </small>
    <div class="btn-d">
      <button class="btn" id="start">OK</button>
    </div>`,
  });

  setTimeout(() => {
    document.getElementById("start").onclick = () => {
      localStorage.setItem("noticeVersion", NOTICE_VERSION);
      closeModal();
      menuMusic.play();
    };
  }, 0);
} else {
  menuMusic.play();
}

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
