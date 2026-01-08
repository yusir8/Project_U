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
  // openModal({
  //   title: "Settings",
  //   closable: true,
  //   body: `
  //   <div class="settings-tab>
  //     <button class="tab" data-name="Sound">Sound</button>
  //     <button class="tab" data-name="Display">Display</button>
  //     <button class="tab active" data-name="System">System</button>
  //   </div>

  //   <div class="settings-content">
  //     <div class="col">
  //       <label>Volume:</label><br>
  //       <input type="range" id="volume-slider" min="0" max="100" value="80"><br>
  //       <small>Adjust the volume</small>
  //     </div>
  //   </div>
  //   `,
  // });
  openModal({
    title: "Settings",
    closable: true,
    body: `
    <span> Sorry! Settings page isn't finish! <br> (WIP) </span> 
    `,
  });
});

// const volumeSlider = document.getElementById("volume-slider");

// volumeSlider.addEventListener("input", () => {
//   menuMusic.volume = this.value;
// })

// notification
const notification = document.getElementById("notification");

// popup warning sign
const NOTICE_VERSION = "1"; // bump this whenever you change notice

const userNoticeVersion = localStorage.getItem("noticeVersion");

if (userNoticeVersion !== NOTICE_VERSION) {
  openModal({
    title: "Notice",
    closable: false,
    body: ` 
    <span class="introT">
    Welcome to Project U!
    </span>
    <span>
      Project U still under development.
    <br>
      You may encounter bugs, missing features, visual issues or mistakes.
    <br>
      Give some feedback or suggestions.
    <br>
    </span>

    <span class="final-word">
      Other than that enjoy!
    </span>

    <small class="">Once you click OK, you won't see this notice again unless it's updated.</small>
    <div class="btn-d">
      <button class="btn" id="start">OK</button>
    </div>

    `,
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
menuMusic.volume = 0.8;
idleMusic.volume = 0.8;

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
  // let ampm = Hours >= 12 ? "PM" : "AM";

  // Hours = Hours % 12;
  // Hours = Hours ? Hours : "12";

  Hours = Hours < 10 ? "0" + Hours : Hours;
  Minute = Minute < 10 ? "0" + Minute : Minute;

  time.textContent = `${Hours}:${Minute}`;
}

updatedDate();
setInterval(updatedDate, 1000);
