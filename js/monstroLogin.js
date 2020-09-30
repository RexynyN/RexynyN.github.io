var monster = document.getElementById("monster");
var loginEmail = document.getElementById("loginEmail");
var signupEmail = document.getElementById("signupEmail");
var nickname = document.getElementById("signupNickname");

var follow = true;

var w = window.innerWidth / 2;

var h = (window.innerHeight * 20) / 100;

document.onmousemove = function (mouse) {
  if (follow) {
    if (mouse.clientX < w && mouse.clientY < h) {
      monster.src = "../img/monstro-login/idle/2.png";
    } else if (mouse.clientX < w && mouse.clientY > h) {
      monster.src = "../img/monstro-login/idle/3.png";
    } else if (mouse.clientX > w && mouse.clientY < h) {
      monster.src = "../img/monstro-login/idle/5.png";
    } else if (mouse.clientX > w && mouse.clientY > h) {
      monster.src = "../img/monstro-login/idle/4.png";
    }
  }
};

function eyeTracking(field) {
  num = field.value.length;
  switch (true) {
    case num >= 1 && num < 8:
      monster.src = "../img/monstro-login/read/1.png";
      break;
    case num >= 8 && num < 24:
      monster.src = "../img/monstro-login/read/2.png";
      break;
    case num >= 24:
      monster.src = "../img/monstro-login/read/3.png";
      break;
  }
}

loginEmail.oninput = function () {
  eyeTracking(loginEmail);
}

signupEmail.oninput = function () {
  eyeTracking(signupEmail);
}

nickname.oninput = function () {
  eyeTracking(nickname);
}

function cover() {
  follow = false;
  var cont = 1;
  const convering = setInterval(function () {
    monster.src = "../img/monstro-login/cover/" + cont + ".png";
    cont < 8 ? cont++ : clearInterval(convering);
  }, 60);
}

function uncover() {
  var cont = 7;
  const unconvering = setInterval(function () {
    monster.src = "../img/monstro-login/cover/" + cont + ".png";
    cont > 1 ? cont-- : clearInterval(unconvering), (follow = true);
  }, 60);
}
