const PF = "https://elitmus-server.onrender.com/images/";
var container = document.getElementById("container");
function showimage() {
  const inputemail = document.getElementById("test-id").value;
  if (
    !inputemail.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    )
  ) {
    alert("Enter valid email address.");
    return false;
  }
  var arr;
  fetch("https://elitmus-server.onrender.com/api/search/" + inputemail, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          document.getElementById("name").innerHTML = res.username;
          document.getElementById("email").innerHTML = res.email;
          document.getElementById("testid").innerHTML = res.testid;
          const images = res.photo;
          for (var i = 0; i < images.length; i++) {
            // create the image element
            var minicontainer = document.createElement("div");
            var imageElement = document.createElement("img");
            var timeElement = document.createElement("p");
            timeElement.innerHTML = images[i].clicked_at;
            imageElement.src = PF + images[i].img_url + ".png";
            imageElement.className = "dashboard-image";
            timeElement.className = "click-time";
            minicontainer.className = "mincontainer";
            minicontainer.appendChild(imageElement);

            minicontainer.appendChild(timeElement);

            container.appendChild(minicontainer);
          }
          document
            .getElementById("main-container")
            .setAttribute("class", "main-container");
        });
      } else {
        alert("candidate not found");
      }
    })
    .catch((err) => err);
}

document.getElementById("dashboard-btn").addEventListener("click", showimage);
