let themeClicked = false;
// const theme = document.getElementById('theme');
//const dd2 = document.getElementById('dropdown2');
theme.addEventListener(onclick, function a() {
  themeOpen = !(themeOpen);
  if (themeOpen) {
    dd2.height = "90px";
  }
})

if (localStorage.getItem("theme") === null) {
  //....
} else {
  body.classList.add(localStorage.getItem("theme"))

}

function themeSwitch(e) {
  if (e == 0) {
    localStorage.setItem("theme", "light");
    body.classList.add("light");
    body.classList.remove("dark");
  }
  else {
    localStorage.setItem("theme", "dark");
    body.classList.add("dark");
    body.classList.remove("light");
  }
}

