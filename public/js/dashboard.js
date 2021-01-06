// For the Link Section
let userLinkCont = document.querySelector('#userlink')
let copyLink = document.querySelector('#copyLink')
let userLink = userLinkCont.querySelector('a')
let userName = userLink.innerText
userLink.innerText = `${window.location.origin}/user/${encodeURIComponent(userName)}`
userLink.href = `${window.location.origin}/user/${encodeURIComponent(userName)}`

// To implement the copy function
copyLink.addEventListener('click', () => {
    let dummy = document.createElement('textarea')
    dummy.innerText = `Do you remember how we met? ${userLink.innerText}`
    document.body.appendChild(dummy)
    dummy.select()
    dummy.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(dummy)
    copyLink.innerText = "Copied!!"
    setTimeout(() => {
        copyLink.innerText = "Copy"
    }, 4000)
})

let skip = 0;
let limit = 5;
let loading = false;
let finished = false;
let messages = []
const loadingElement = document.querySelector('.loading');
const loadMoreElement = document.querySelector('#loadMore');
document.addEventListener('scroll', () => {
    const rect = loadMoreElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && !loading && !finished) {
        loadMore();
    }
});

function loadMore() {
    skip += limit;
    listMessages(false);
}

function listMessages(reset = true) {
    loading = true;
    if (reset) {
        console.log('ran');
        document.querySelector('.messages').innerHTML = '';
        skip = 0;
        finished = false;
    }
    for (let index = skip; index < skip + limit; index++) {
        if (index < messages.length) {
            createMessage(messages[index])
            loadMoreElement.style.visibility = 'visible';
        } else {
            loadMoreElement.style.visibility = 'hidden';
            finished = true;
            break;
        }
    }
    loadingElement.style.display = 'none';

    loading = false;

}

function createMessage(message) {

    let timeStamp = document.createElement('span')
    //         <span id="time-stamp">
    timeStamp.classList.add('time-stamp')
    timeStamp.innerText = makeTimeStamp(message.timeStamp)
    let openBtn = document.createElement('span')
    openBtn.classList.add('open-btn')
    openBtn.innerText = "Open"
    //         <span class="open-btn">Open</span>

    let messageCont = document.createElement('div')
    messageCont.classList.add('container')
    messageCont.classList.add('message')
    messageCont.classList.add('close-message')
    messageCont.appendChild(timeStamp)
    messageCont.appendChild(openBtn)
    let questions = message.questionList.map(question => {
        let questionLine = document.createElement('span')
        questionLine.classList.add('question')
        questionLine.innerHTML = `
            <span class="question">
                <p>
                    <b>Question:</b>
                    ${question.question}
                </p>

                <p>
                    <b>Answer:</b>
                    ${question.answer}
                </p>

            </span>
            `
        messageCont.appendChild(questionLine)


    })

    document.querySelector('.messages').appendChild(messageCont)
    setupMessage(messageCont)
}

function makeTimeStamp(target) {

    let time = Math.trunc((Date.now() - target) / 1000)
    let minutes = Math.trunc(time / 60)
    let hours = Math.trunc(time / 3600)
    let days = Math.trunc(time / 86400)

    if (days > 0) {

        if (days === 1) {
            return ('a day ago')
        } else {
            return (`${days} days ago`)
        }


    } else if (hours > 0) {
        if (hours === 1) {
            return ('An hour ago')
        } else {
            return (`${hours} hours ago`)
        }
    } else if (minutes > 0) {

        if (minutes === 1) {
            return ('A minute ago')
        } else if (minutes < 10) {
            return ('A few minutes ago')
        } else {
            return (`${minutes} minutes ago`)
        }

    } else {
        if (time === 1) {
            return ('A second ago')
        } else if (time < 10) {
            return ('A few seconds ago')
        } else {
            return (`${minutes} seconds ago`)
        }
    }
}


// Message behaviour

function closeAll() {
    let messages = document.querySelectorAll('.messages .message')
    messages.forEach(message => {
        message.classList.add("close-message")
        let openBtn = message.querySelector('.open-btn')
        openBtn.innerText = "Open"
    })
}

function setupMessage(message) {
    // To open and close messages
    let openBtn = message.querySelector('.open-btn')
    openBtn.addEventListener('click', () => {
        if (openBtn.innerText === "Open") {
            closeAll()
            message.classList.remove("close-message")
            openBtn.innerText = "Close"
        } else {
            message.classList.add("close-message")
            openBtn.innerText = "Open"
        }
    })
}

fetch(`/messages`)
    .then(response => response.json())
    .then(result => {
        messages = result.messages
        messages = messages.reverse()
        listMessages()
    })
    .catch(err => console.log(err))