//   Variables
const userUrl = window.location.href;
console.log(userUrl);
const qNo = document.getElementById('q-no');
const question = document.getElementById('question');
const menubtn = document.getElementById('menubtn');
const pos = document.getElementById('pos');
const back = document.getElementById('back');
const next = document.getElementById('next');
const body = document.querySelector('body');
const main = document.querySelector('.main');
const container = document.querySelector('.container');
const answer = document.querySelector('#full-answer');
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

let themeOpen = false;
let menuOpen = false;
const theme = document.getElementById('theme');
const dd1 = document.getElementsByClassName('dropdown');
const dd2 = document.getElementById('dropdown2');
function dd(close) {
  themeOpen = !(themeOpen) && close;
  console.log(themeOpen);
  if (themeOpen) {
    dd2.style.height = "90px";
    dd2.style.pointerEvents = "auto";
  }
  else {
    dd2.style.height = "0px";
    dd2.style.pointerEvents = "none";
  }
}

function mo(close) {
  // body...
  menuOpen = !(menuOpen) && close;
  console.log(menuOpen);
  if (menuOpen) {
    dd1[0].style.opacity = "1";
    dd1[0].style.pointerEvents = "auto"
  }
  else {
    dd1[0].style.opacity = "0";
    dd1[0].style.pointerEvents = "none";
  }
}

let a = -1;
let prea = 1;
let questionList = [
  {
    question: "What's your name?",
    answer: "",
  },
  {
    question: "Where did we meet first time?",
    answer: "",
  },
  {
    question: "What was your first impression about me?",
    answer: "",
  },
  {
    question: "Who started the conversation?",
    answer: "",
  },
  {
    question: "What's your current impression about me?",
    answer: "",
  },
  {
    question: "Who am I to you?",

    answer: "",
  },
  {
    question: "What do you like about me?",
    answer: "",
  },
  {
    question: "What do you dislike about me?",
    answer: "",
  },
  {
    question: "What have you always wanted to tell me?",
    answer: "",
  },
  {
    question: "What's my name saved as on your phone?",
    answer: "",
  },
]


questionList.forEach(() => {
  let div = document.createElement("div");
  div.classList = "pos-mark";
  pos.appendChild(div);
})

const markers = document.getElementsByClassName("pos-mark");

questionChanger(1);

function markerChanger(a, e) {
  // body...

  markers[a].classList.add("curr-pos");
  markers[prea].classList.remove("curr-pos");
}

function questionPicker(a) {
  // body...
  qNo.innerText = "Question #" + (a + 1);
  question.innerText = questionList[a].question;
  answer.value = questionList[a].answer;
}

function questionChanger(e) {
  // body...


  a += e;
  if (a == questionList.length) {
    main.classList.add('submit')
    return null;
  }
  else if (a < 0) {
    a = questionList.length - 1;

  }
  markerChanger(a, e);
  questionPicker(a);
  prea = a;


}

back.addEventListener('click', () => {
  questionChanger(-1)
})
next.addEventListener('click', () => {
  questionList[a].answer = answer.value;
  answer.value = ''
  questionChanger(1)
})
submit.addEventListener('click', () => {
  container.style.display = 'none'
  submit.style.display = 'none'

  let word = document.createElement('h2')
  word.innerText = "Answers sent successfully now it's your turn"
  main.appendChild(word)
  fetch(userUrl, {
    method: 'POST',
    body: JSON.stringify({
      questionList,
      timeStamp: Date.now()
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => {
      console.log(response);
      window.location.replace(`${window.location.origin}/users/register`)
    })
    .catch(err => console.log(err))


})
