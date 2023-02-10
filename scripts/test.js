document.getElementById("test-name").innerHTML = sessionStorage.getItem("name");

let video = document.querySelector("#video");

const videofeed = async () => {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
};

videofeed();

const cap = async () => {
  var canvas = document.getElementById("canvas");
  var video = document.getElementById("video");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas
    .getContext("2d")
    .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  const image = canvas.toDataURL("image/png");
  const index = Date.now();

  fetch("https://elitmus-server.onrender.com/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image,
      index,
    }),
  })
    .then((response) => console.log("image updated"))
    .catch((err) => alert(err));

  const email = sessionStorage.getItem("email");
  fetch("https://elitmus-server.onrender.com/api/addimage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      url: index,
    }),
  })
    .then((response) => console.log("image added to db"))
    .catch((err) => alert(err));
};
function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const hoursSpan = clock.querySelector(".hours");
  const minutesSpan = clock.querySelector(".minutes");
  const secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    const t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

    if (t.total < 0) {
      alert("times up");
      clearInterval(timeinterval);
      window.location.href = "studauth.html";
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date()) + 30 * 1000);
initializeClock("clockdiv", deadline);

var intervalId = setInterval(cap, 10 * 1000);
