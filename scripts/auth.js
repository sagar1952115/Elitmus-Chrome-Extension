const stud = document.getElementById("stud-auth-btn");

if (stud) {
  stud.addEventListener("click", validateStud);
}

const admin = document.getElementById("admin-auth-btn");

if (admin) {
  admin.addEventListener("click", validateAdmin);
}
function validateStud() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const testid = document.getElementById("testid").value;
  if (name !== "") {
    sessionStorage.setItem("name", name);
  } else {
    alert("Enter your name");
    return false;
  }
  if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    )
  ) {
    alert("Enter valid email address.");
    return false;
  } else {
    sessionStorage.setItem("email", email);
  }
  sessionStorage.setItem("testid", testid);
  fetch("https://elitmus-server.onrender.com/api/addcandidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name,
      email,
      testid,
    }),
  })
    .then((res) => {
      if (res.status === 400) alert("You have already attempted test");
      else if (res.status === 200) window.location.href = "test.html";
    })
    .catch((err) => alert(err));
}

function validateAdmin() {
  const adminid = document.getElementById("adminid").value;
  const pass = document.getElementById("password").value;

  if (adminid !== "1234567890" || pass !== "0987654321") {
    alert("wrong credentials");
  } else {
    window.location.href = "dashboard.html";
  }
}
